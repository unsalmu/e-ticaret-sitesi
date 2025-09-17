import { Switch, Route, BrowserRouter } from "react-router-dom"

import './App.css'
import Header from './Layout/Header'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Footer from "./Layout/Footer"
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/product/:id" component={ProductDetailsPage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/product" component={ProductDetailsPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/team" component={TeamPage} />
      </Switch>
      <Footer />
    </BrowserRouter>


  )
}

export default App
