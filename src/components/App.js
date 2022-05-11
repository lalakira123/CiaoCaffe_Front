import {BrowserRouter, Routes, Route} from 'react-router-dom';

import SignUp from './SignUp';
import Product from './Product';

import './../assets/css/reset.css';
import './../assets/css/style.css';

function App() {
    return(
        <BrowserRouter >
            <Routes>
                <Route path='/'/>
                <Route path='/product' element={<Product />}/>
                <Route path='/cart' />
                <Route path='/sign-up' element={<SignUp />}/>
                <Route path='/sign-in' />
            </Routes>
        </BrowserRouter>
    );
}

export default App;