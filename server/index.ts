import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ─── In-memory order store (replace with DB in production) ───────────────────
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  orderId: string;
  customerName?: string;
  customerEmail?: string;
  userId?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  paymentStatus: 'demo' | 'paid' | 'failed';
  location?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const orders = new Map<string, Order>();

// ─── Routes ──────────────────────────────────────────────────────────────────

// POST /api/orders — create a new order
app.post('/api/orders', (req, res) => {
  const { items, subtotal, tax, total, userId, customerName, customerEmail, location, notes } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item' });
  }

  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const now = new Date().toISOString();

  const order: Order = {
    orderId,
    customerName,
    customerEmail,
    userId,
    items,
    subtotal,
    tax,
    total,
    status: 'confirmed',
    paymentStatus: 'demo',
    location,
    notes,
    createdAt: now,
    updatedAt: now,
  };

  orders.set(orderId, order);
  console.log(`[ORDER] Created ${orderId} — ${items.length} items — $${total}`);

  return res.status(201).json({ success: true, order });
});

// GET /api/orders — list all orders (admin)
app.get('/api/orders', (_req, res) => {
  const list = Array.from(orders.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return res.json({ orders: list, total: list.length });
});

// GET /api/orders/:id — get single order
app.get('/api/orders/:id', (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  return res.json(order);
});

// PATCH /api/orders/:id/status — update order status
app.patch('/api/orders/:id/status', (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  const { status } = req.body;
  const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();
  orders.set(order.orderId, order);

  console.log(`[ORDER] ${order.orderId} status → ${status}`);
  return res.json({ success: true, order });
});

// DELETE /api/orders/:id — cancel/delete order
app.delete('/api/orders/:id', (req, res) => {
  if (!orders.has(req.params.id)) return res.status(404).json({ error: 'Order not found' });
  orders.delete(req.params.id);
  return res.json({ success: true });
});

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok', ordersInMemory: orders.size }));

app.listen(PORT, () => {
  console.log(`\n🍽️  Calcutta Chaat Order Server running on http://localhost:${PORT}`);
  console.log(`   POST /api/orders       — create order`);
  console.log(`   GET  /api/orders       — list all orders`);
  console.log(`   GET  /api/orders/:id   — get order`);
  console.log(`   PATCH /api/orders/:id/status — update status\n`);
});

export default app;
