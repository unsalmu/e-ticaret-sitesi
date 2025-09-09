import { Switch, Route, BrowserRouter } from "react-router-dom"

import './App.css'
import Header from './Layout/Header'
import HomePage from './pages/HomePage'
import Footer from "./Layout/Footer"


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
      <Footer />
    </BrowserRouter>


  )
}

export default App
