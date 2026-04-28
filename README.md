SafeBite/
│
├── backend/
│   │
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
│   │   ├── favoritesController.js
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
│   │   ├── supplierSchema.js
│   │   ├── adminSchema.js
│   │   ├── dependentSchema.js
│   │   ├── productSchema.js
│   │   ├── categorySchema.js
│   │   ├── cartSchema.js
│   │   ├── orderSchema.js
│   │   ├── reviewSchema.js
│   │   ├── favoritesSchema.js
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
│   │   ├── favoritesRoutes.js
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
│   │   │   ├── layout.js
│   │   │   ├── page.js
│   │   │   ├── globals.css
│   │   │   │
│   │   │   ├── login/
│   │   │   │   └── page.jsx
│   │   │   │
│   │   │   ├── register/
│   │   │   │   └── page.jsx
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── page.jsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.jsx
│   │   │   │
│   │   │   ├── cart/
│   │   │   │   └── page.jsx
│   │   │   │
│   │   │   ├── favorites/
│   │   │   │   └── page.jsx
│   │   │   │
│   │   │   ├── orders/
│   │   │   │   └── page.jsx
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   └── page.jsx
│   │   │   │
│   │   │   ├── dependents/
│   │   │   │   ├── page.jsx
│   │   │   │   ├── add-member/
│   │   │   │   │   └── page.jsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.jsx
│   │   │   │
│   │   │   ├── supplier/
│   │   │   │   ├── page.jsx
│   │   │   │   ├── products/
│   │   │   │   │   └── page.jsx
│   │   │   │   └── create-product/
│   │   │   │       └── page.jsx
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── page.jsx
│   │   │   │   ├── users/
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── suppliers/
│   │   │   │   │   └── page.jsx
│   │   │   │   └── products/
│   │   │   │       └── page.jsx
│   │   │   │
│   │   │   └── dashboard/
│   │   │       └── page.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── DependentCard.jsx
│   │   │   ├── DependentSelector.jsx
│   │   │   ├── AllergyBadge.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterSidebar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── FavoriteButton.jsx
│   │   │   └── Pagination.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   ├── DependentContext.jsx
│   │   │   └── FavoritesContext.jsx
│   │   │
│   │   ├── lib/
│   │   │   └── axios.js
│   │
│   ├── public/
│   │   ├── images/
│   │   └── logo.png
│   │
│   ├── .env.local
│   ├── next.config.js
│   └── package.json
│
├── README.md
└── .gitignore