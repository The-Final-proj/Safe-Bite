# SafeBite 🍽️🥜
---
SafeBite is a full-stack food allergy management platform that helps users discover safe food products based on their allergies and dietary preferences.

---
The platform allows users to:

Browse allergy-friendly food products
Filter products by allergens and dietary restrictions
Add products to cart and favorites
Manage dependent family members
Complete secure payments using Stripe
Suppliers can add/manage products

---
🚀 Tech Stack

*Frontend*

Next.js,React.js
Bootstrap 5,Context API,Axios

*Backend*

Node.js,Express.js,
MongoDB,Mongoose,JWT Authentication,
Stripe Payment Gateway,Multer (Image Upload)

---
✨ Features

👤 Authentication
Register / Login
JWT Authentication
Role-based Authorization
User / Supplier roles

🛒 Shopping Cart
Add to cart
Remove from cart
Update quantity
Cart total calculation

❤️ Favorites
Add/remove favorite products
Personalized saved products

🍔 Product System
Product details page
Categories
Allergy filtering
Dietary filtering
Search products

👨‍👩‍👧 Dependents Management
Users can create family members/dependents and assign allergies for safer shopping experiences.

💳 Stripe Payments
Stripe Checkout Session
Secure online payments
Payment success page
Webhook integration

🏪 Supplier Dashboard

Suppliers can:

Add products

Upload product images

Manage products

---
📸 Screenshots
---
🌍 Deployment

Frontend: Netlify

Backend: Render

Database: MongoDB Atlas


## 📁 Project Structure

``` bash
SafeBite/
│
├── backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── supplierController.js
│   │   ├── adminController.js
│   │   ├── dependentController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── reviewController.js
│   │   ├── favoriteController.js
│   │   └── uploadController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── authorizeRole.js
│   │   ├── upload.js
│   │   └── errorHandler.js
│   │
│   ├── models/
│   │   ├── db.js
│   │   ├── userSchema.js
│   │   ├── adminSchema.js
│   │   ├── dependentSchema.js
│   │   ├── productSchema.js
│   │   ├── cartSchema.js
│   │   ├── orderSchema.js
│   │   ├── reviewSchema.js
│   │   ├── favoriteSchema.js
│   │   └── paymentSchema.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── supplierRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── dependentRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── favoriteRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── api.js
│   │
│   ├── uploads/
│   ├── server.js
│   └── package.json

├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── context/
│   ├── public/
│   ├── next.config.js
│   └── package.json
```

