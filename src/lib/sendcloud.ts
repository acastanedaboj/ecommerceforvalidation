const SENDCLOUD_API_URL = 'https://panel.sendcloud.sc/api/v2';

export interface SendcloudParcelItem {
  description: string;
  quantity: number;
  weight: string; // kg, e.g. "0.250"
  value: string;  // EUR, e.g. "9.00"
  hs_code?: string;
  origin_country?: string;
}

export interface SendcloudParcelInput {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
  weightGrams: number;
  items?: SendcloudParcelItem[];
}

export interface SendcloudParcel {
  id: number;
  tracking_number: string;
  tracking_url: string;
  carrier: { code: string };
  status: { id: number; message: string };
}

export interface SendcloudWebhookPayload {
  action: string;
  timestamp: string;
  parcel: {
    id: number;
    order_number: string;
    tracking_number: string;
    tracking_url: string;
    carrier: { code: string };
    status: { id: number; message: string };
  };
}

// Sendcloud parcel status IDs relevant for order tracking
export const SENDCLOUD_STATUS = {
  ANNOUNCED: 11,      // Label created, waiting for pickup
  IN_TRANSIT: 12,     // En route to sorting center
  AT_SORTING: 13,     // At sorting center
  DELIVERED: 14,      // Delivered
  RETURNED: 15,       // Returned to sender
  CANCELLED: 92,      // Cancelled
} as const;

function getAuthHeader(): string {
  const publicKey = process.env.SENDCLOUD_PUBLIC_KEY;
  const secretKey = process.env.SENDCLOUD_SECRET_KEY;
  const credentials = Buffer.from(`${publicKey}:${secretKey}`).toString('base64');
  return `Basic ${credentials}`;
}

function parseAddress(fullAddress: string): { address: string; houseNumber: string } {
  // Extract house number from end of address, e.g. "Calle Mayor 15" → ("Calle Mayor", "15")
  const match = fullAddress.match(/^(.+?)\s+(\d+\S*)$/);
  if (match) {
    return { address: match[1], houseNumber: match[2] };
  }
  return { address: fullAddress, houseNumber: 'S/N' };
}

export async function createSendcloudParcel(
  input: SendcloudParcelInput
): Promise<SendcloudParcel | null> {
  const publicKey = process.env.SENDCLOUD_PUBLIC_KEY;
  const secretKey = process.env.SENDCLOUD_SECRET_KEY;

  if (!publicKey || !secretKey) {
    console.warn('Sendcloud credentials not configured, skipping parcel creation');
    return null;
  }

  const { address, houseNumber } = parseAddress(input.addressLine1);
  const weightKg = (input.weightGrams / 1000).toFixed(3);

  const payload = {
    parcel: {
      name: input.customerName,
      address,
      house_number: houseNumber,
      city: input.city,
      postal_code: input.postalCode,
      country: input.country || 'ES',
      email: input.customerEmail,
      ...(input.customerPhone ? { telephone: input.customerPhone } : {}),
      weight: weightKg,
      order_number: input.orderNumber,
      request_label: true,
      apply_shipping_rules: true,
      ...(input.items && input.items.length > 0 ? { parcel_items: input.items } : {}),
    },
  };

  const response = await fetch(`${SENDCLOUD_API_URL}/parcels`, {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Sendcloud API error ${response.status}: ${error}`);
  }

  const data = await response.json();
  return data.parcel as SendcloudParcel;
}
