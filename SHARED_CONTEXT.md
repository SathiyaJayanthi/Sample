# PROJECT: FarmConnect — Shared Contract

All team members are building modules for the same platform. To integrate without conflicts, everyone MUST follow this shared contract exactly.

## TECH STACK (fixed — do not deviate)
- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT, role-based (farmer / consumer / admin)
- Maps: Leaflet + OpenStreetMap
- Payments: Razorpay (test mode)

## FOLDER STRUCTURE (fixed)

```text
farmconnect/

├── client/               # React frontend
│   └── src/
│       ├── modules/      # each teammate builds ONE folder here
│       │   ├── auth/
│       │   ├── farmer/
│       │   ├── consumer/
│       │   ├── admin/
│       │   └── payments/
│       ├── shared/       # shared components (Navbar, Button, etc.)
│       └── api/          # axios instance + API calls

├── server/               # Express backend
│   └── src/
│       ├── modules/      # mirrors frontend module split
│       │   ├── auth/
│       │   ├── farmer/
│       │   ├── consumer/
│       │   ├── admin/
│       │   └── payments/
│       └── models/       # shared Mongoose schemas — DO NOT duplicate
```

## SHARED DATABASE SCHEMA (fixed — all modules use these exact fields)

### User
```js
{ _id, name, email, passwordHash, role: "farmer"|"consumer"|"admin",
  phone, location: { lat, lng, address }, verified: Boolean, createdAt }
```

### Product
```js
{ _id, farmerId (ref User), name, category, price, quantity, unit,
  harvestDate, photoUrl, location, status: "active"|"sold_out", createdAt }
```

### Order
```js
{ _id, consumerId (ref User), items: [{ productId, qty, price }],
  totalAmount, status: "placed"|"confirmed"|"out_for_delivery"|"delivered"|"cancelled",
  paymentStatus: "pending"|"paid", createdAt }
```

### Review
```js
{ _id, orderId, consumerId, farmerId, rating (1-5), comment, createdAt }
```

## API CONVENTIONS
- All routes prefixed `/api/v1/<module>/...`
- Auth via `Authorization: Bearer <token>` header
- Standard response: `{ success: boolean, data: {}, error: string|null }`
- Each module exposes its own routes file — merged in `server/src/app.js`

## GIT WORKFLOW
- Branch naming: `module/<name>` e.g. `module/farmer`
- Never edit another module's folder directly — request via PR
- Shared files (`models/`, `shared/`) changes need a quick team heads-up

# MODULE: Farmer Product & Order Management

Read SHARED_CONTEXT.md first. Assumes auth module's verifyToken/requireRole and useAuth() hook exist (coordinate with auth teammate on interface if not ready — stub it).

## BACKEND TASKS
- Product model (match shared schema)
- POST /api/v1/farmer/products (create listing)
- PUT /api/v1/farmer/products/:id
- DELETE /api/v1/farmer/products/:id
- GET /api/v1/farmer/products (own listings)
- GET /api/v1/farmer/orders (orders containing their products)
- PATCH /api/v1/farmer/orders/:id/status

## FRONTEND TASKS
- Farmer dashboard layout
- Add/Edit product form (with photo upload)
- Product list/grid with edit/delete
- Incoming orders view with status update buttons
- Earnings summary widget (sum of delivered order amounts)

## DELIVERABLE FOR TEAM
Document your Product API endpoints clearly — consumer module will call GET /api/v1/products (public) to browse, so confirm that route name with them.
