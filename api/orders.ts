export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') return new Response(null, { status: 200, headers });

  if (req.method === 'POST') {
    const body = await req.json();
    const { items, subtotal, tax, total, userId, customerName, customerEmail } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Order must contain at least one item' }), { status: 400, headers });
    }

    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
    const order = {
      orderId, customerName, customerEmail, userId, items,
      subtotal, tax, total,
      status: 'confirmed',
      paymentStatus: 'demo',
      createdAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify({ success: true, order }), { status: 201, headers });
  }

  if (req.method === 'GET') {
    return new Response(JSON.stringify({ orders: [], message: 'Use the Express server locally for order management' }), { status: 200, headers });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
}
