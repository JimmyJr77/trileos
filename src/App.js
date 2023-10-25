import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from './components/Home';
import Footer from './components/Footer';
import GlobalStyles from './styles/GlobalStyles';
import Apparel from './components/Apparel';
import Cart from './components/Cart';
// import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <div>
              <GlobalStyles />
              <Routes>
                  <Route path="/" element={<Home />} index />
                  <Route path="/apparel" element={<Apparel />} />
                  <Route path="/cart" element={<Cart />} />
              </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
  


export default App;

