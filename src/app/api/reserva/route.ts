import { NextResponse } from 'next/server';
import { sendReservationNotification } from '@/lib/email';
import prisma from '@/lib/db';

interface ReservationRequest {
  name?: string;
  email?: string;
  phone?: string;
  productName?: string;
  quantity?: number;
  note?: string;
}

export async function POST(request: Request) {
  try {
    const data: ReservationRequest = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.productName || !data.quantity) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Email no válido' }, { status: 400 });
    }

    // Validate quantity range
    if (data.quantity < 1 || data.quantity > 20) {
      return NextResponse.json({ error: 'La cantidad debe estar entre 1 y 20' }, { status: 400 });
    }

    const reservation = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      productName: data.productName,
      quantity: data.quantity,
      note: data.note?.trim() || undefined,
    };

    // Persist the reservation (non-blocking: a DB hiccup must not lose the email).
    try {
      await prisma.reservation.create({ data: reservation });
    } catch (dbError) {
      console.error('Could not save reservation to the database:', dbError);
    }

    // Notify the team by email (the critical path).
    await sendReservationNotification(reservation);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing reservation:', error);
    return NextResponse.json({ error: 'No se pudo enviar la reserva' }, { status: 500 });
  }
}
