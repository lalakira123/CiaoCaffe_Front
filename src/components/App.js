import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from "./Home";
import SignUp from './SignUp';

import './../assets/css/reset.css';
import './../assets/css/style.css';

function App() {
    return(
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/product/:id'/>
                <Route path='/cart' />
                <Route path='/sign-up' element={<SignUp />}/>
                <Route path='/sign-in' />
            </Routes>
        </BrowserRouter>
    );
}

export default App;