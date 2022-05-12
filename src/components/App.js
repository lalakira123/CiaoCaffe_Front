import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from 'react';

import Header from './Header';
import Home from "./Home";
import SignUp from './SignUp';
import Product from './Product';
import SignIn from "./SignIn";
import Cart from './Cart';

import CartContext from './../contexts/CartContext';

import './../assets/css/reset.css';
import './../assets/css/style.css';

function App() {
    const [cart, setCart] = useState([]);

    return(
        <CartContext.Provider value={{cart, setCart}}>
        <BrowserRouter >
            <Header/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/product/:id' element={<Product />} />  
                <Route path='/cart' element={<Cart />}/>
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/sign-in' element={<SignIn />}/>
            </Routes>
        </BrowserRouter>
        </CartContext.Provider>
    );
}

export default App;