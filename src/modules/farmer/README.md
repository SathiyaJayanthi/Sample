# Farmer module API contract

## Product endpoints
- POST /api/v1/farmer/products — create a farmer listing
- PUT /api/v1/farmer/products/:id — update an existing listing
- DELETE /api/v1/farmer/products/:id — remove a listing
- GET /api/v1/farmer/products — fetch the current farmer's listings

## Order endpoints
- GET /api/v1/farmer/orders — fetch orders that include the farmer's products
- PATCH /api/v1/farmer/orders/:id/status — update the fulfillment status

## Integration note
- The public browsing route for consumers should remain GET /api/v1/products so the consumer module can call it directly.
- All responses should follow the shared envelope: { success, data, error }.
