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

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
    take: 200,
  });

  return NextResponse.json(orders);
}
