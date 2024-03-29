import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from "./scenes/home/Home";
import ItemDetails from './scenes/itemDetails/ItemDetails';
import Checkout from './scenes/checkout/Chekout';
import Confirmation from './scenes/checkout/Confirmation';
import Navbar from './scenes/global/Navbar';
import CartMenu from './scenes/global/CartMenu';
import Footer from './scenes/global/Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null;
}

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <CartMenu />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='item/:itemId' element={<ItemDetails />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='checkout/success' element={<Confirmation />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
