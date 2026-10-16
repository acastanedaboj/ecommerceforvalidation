import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

const ADMIN_EMAILS = ['alvaro.castanneda@gmail.com', 'hola@poppy.es', 'pilar.orico@gmail.com'];

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !ADMIN_EMAILS.includes(session.user?.email || '')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: 'desc' },
    take: 500,
  });

  // Simple stats
  const total = reservations.length;
  const totalBags = reservations.reduce((sum, r) => sum + r.quantity, 0);

  const byProduct: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  for (const r of reservations) {
    byProduct[r.productName] = (byProduct[r.productName] || 0) + 1;
    byStatus[r.status] = (byStatus[r.status] || 0) + 1;
  }

  return NextResponse.json({
    reservations,
    stats: { total, totalBags, byProduct, byStatus },
  });
}
