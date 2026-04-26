project-name/
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   └── adminController.js
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
│   │   ├── productSchema.js
│   │   ├── orderSchema.js
│   │   ├── categorySchema.js
│   │   ├── cartSchema.js
│   │   └── reviewSchema.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── adminRoutes.js
│   │   └── uploadRoutes.js
│   │
│   ├── uploads/
│   │   └── images/
│   │
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── app/
│   │   │   ├── page.jsx
│   │   │   ├── login/
│   │   │   │   └── page.jsx
│   │   │   ├── register/
│   │   │   │   └── page.jsx
│   │   │   ├── products/
│   │   │   │   ├── page.jsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.jsx
│   │   │   ├── cart/
│   │   │   │   └── page.jsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.jsx
│   │   │   ├── admin/
│   │   │   │   ├── page.jsx
│   │   │   │   ├── create-product/
│   │   │   │   │   └── page.jsx
│   │   │   │   └── edit-product/
│   │   │   │       └── page.jsx
│   │   │   └── profile/
│   │   │       └── page.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── lib/
│   │   │   └── axios.js
│   │   
│   │
│   ├── public/
│   │   ├── images/
│   │   └── logo.png
│   │
│   ├── .env.local
│   ├── next.config.js
│   ├── package.json
│
└── README.md