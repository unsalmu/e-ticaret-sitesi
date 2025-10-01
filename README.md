# E-Ticaret Sitesi (E-Commerce Website)

A modern, full-featured e-commerce website built with React 19 and Redux, offering a complete shopping experience with user authentication, product browsing, cart management, and order processing.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_v4-06B6D4?logo=tailwindcss&logoColor=white)

## 🚀 Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse products with advanced filtering and sorting
- **Category Navigation**: Dynamic category-based navigation with gender-specific filtering
- **Product Search**: Real-time search functionality
- **Product Details**: Comprehensive product information with image galleries
- **Shopping Cart**: Full cart management with quantity updates and item removal
- **Wishlist**: Save favorite products for later

### 🔐 User Authentication
- **User Registration**: Secure account creation with validation
- **Login System**: JWT-based authentication with persistent sessions
- **Profile Management**: User profile with Gravatar integration
- **Protected Routes**: Secure access to user-specific features

### 📦 Order Management
- **Address Management**: Add, edit, and delete shipping/billing addresses
- **Payment Processing**: Credit card management and secure payment flow
- **Order Creation**: Complete checkout process with order confirmation
- **Order History**: View previous orders with detailed information
- **Order Tracking**: Order status and delivery information

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach with full tablet/desktop support
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Interactive Elements**: Smooth animations and transitions
- **Loading States**: User-friendly loading indicators throughout the app
- **Error Handling**: Comprehensive error messages and recovery options

### 🏗️ Technical Features
- **State Management**: Redux with Redux Thunk for async operations
- **API Integration**: RESTful API communication with Axios
- **Route Management**: React Router v5 with protected routes
- **Form Validation**: Client-side validation with user feedback
- **Local Storage**: Persistent authentication and cart state
- **Hot Module Replacement**: Fast development with Vite HMR

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Redux + Redux Thunk** - State management with async actions
- **React Router v5** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Modern icon library
- **Embla Carousel** - Touch-friendly carousel component

### Development Tools
- **ESLint** - Code linting with flat config format
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-ticaret-sitesi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
src/
├── App.jsx                 # Main app component with routing
├── main.jsx                # React entry point
├── Layout/
│   ├── Header.jsx          # Navigation header with dropdown menus
│   └── Footer.jsx          # Site footer
├── pages/
│   ├── HomePage.jsx        # Landing page
│   ├── ShopPage.jsx        # Product listing with filters
│   ├── ProductDetailsPage.jsx # Individual product view
│   ├── CartPage.jsx        # Shopping cart management
│   ├── CreateOrderPage.jsx # Address selection for orders
│   ├── CreateOrderPaymentPage.jsx # Payment processing
│   ├── PreviousOrdersPage.jsx # Order history
│   ├── LoginPage.jsx       # User authentication
│   ├── SignUpPage.jsx      # User registration
│   ├── ContactPage.jsx     # Contact information
│   ├── TeamPage.jsx        # Team information
│   ├── PricingPage.jsx     # Pricing plans
│   └── AboutUsPage.jsx     # About page
├── components/
│   ├── HeroCarousel.jsx    # Homepage hero section
│   ├── ProductCard.jsx     # Product display component
│   ├── ProductGrid.jsx     # Product listing grid
│   ├── ShoppingCartDropdown.jsx # Cart dropdown menu
│   ├── OrderSuccessModal.jsx # Order confirmation modal
│   ├── ProtectedRoute.jsx  # Route protection component
│   └── [Other components...] # Various UI components
├── store/
│   ├── actions/
│   │   ├── productActions.js # Product-related actions
│   │   ├── cartActions.js    # Cart and order actions
│   │   └── clientActions.js  # User and auth actions
│   ├── reducers/
│   │   ├── productReducer.js # Product state management
│   │   ├── cartReducer.js    # Cart state management
│   │   └── clientReducer.js  # User state management
│   └── store.js            # Redux store configuration
├── lib/
│   ├── api.js              # Axios configuration
│   ├── cities.js           # Turkish cities data
│   └── md5.js              # MD5 hashing utility
└── assets/                 # Static assets (images, etc.)
```

## 🔗 API Integration

The application integrates with a RESTful API for:

### Authentication Endpoints
- `POST /login` - User authentication
- `POST /signup` - User registration
- `GET /verify` - Token verification

### Product Endpoints
- `GET /products` - Get products with pagination and filters
- `GET /products/:id` - Get single product details
- `GET /categories` - Get product categories

### User Management Endpoints
- `GET /user/address` - Get user addresses
- `POST /user/address` - Create new address
- `PUT /user/address` - Update address
- `DELETE /user/address/:id` - Delete address
- `GET /user/card` - Get user credit cards
- `POST /user/card` - Add new credit card
- `PUT /user/card` - Update credit card
- `DELETE /user/card/:id` - Delete credit card

### Order Endpoints
- `POST /order` - Create new order
- `GET /order` - Get user's order history

## 🎯 Key Features Implementation

### Dynamic Category Navigation
- Real-time category fetching from API
- Gender-based filtering (Men/Women)
- SEO-friendly URLs with category slugs

### Advanced Shopping Cart
- Persistent cart state across sessions
- Real-time cart updates with Redux
- Checkout flow with address and payment selection

### Secure Payment Processing
- Credit card validation and storage
- CCV verification for enhanced security
- Order confirmation and tracking

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes

### State Management
- Centralized Redux store
- Async action handling with Redux Thunk
- Optimistic UI updates

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=your_api_base_url
```

### Tailwind CSS
Tailwind CSS v4 is configured via the Vite plugin in `vite.config.js`:
```javascript
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [
    react(),
    tailwindcss()
  ]
}
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

The `dist` folder will contain the production-ready files.

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Vite** for the lightning-fast build tool

## 📞 Support

If you have any questions or need help with the project, please open an issue on GitHub.

---

**Built with ❤️ using React 19, Redux, and Tailwind CSS**
