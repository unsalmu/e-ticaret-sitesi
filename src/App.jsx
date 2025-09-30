import { Switch, Route, BrowserRouter } from "react-router-dom"

import './App.css'
import Header from './Layout/Header'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'
import Footer from "./Layout/Footer"
import ProtectedRoute from './components/ProtectedRoute'
import CreateOrderPage from './pages/CreateOrderPage'
import CreateOrderPaymentPage from './pages/CreateOrderPaymentPage'
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import PricingPage from './pages/PricingPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import AboutUsPage from './pages/AboutUsPage'


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/cart" component={CartPage} />
        <ProtectedRoute exact path="/order" component={CreateOrderPage} />
        <ProtectedRoute exact path="/order/payment" component={CreateOrderPaymentPage} />
        <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" component={ProductDetailsPage} />
        <Route path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
        <Route path="/product/:id" component={ProductDetailsPage} />
        <Route exact path="/product" component={ProductDetailsPage} />
        <Route exact path="/about" component={AboutUsPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/team" component={TeamPage} />
        <Route exact path="/pricing" component={PricingPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
      <Footer />
    </BrowserRouter>


  )
}

export default App
