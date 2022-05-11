import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from "./Home";

import "./style.css";

function App() {
    return(
        <BrowserRouter >
            <Routes>
                <Route path='/' element={ < Home /> }/>
                <Route path='/products/:id'/>
                <Route path='/cart' />
                <Route path='/sign-up' />
                <Route path='/sign-in' />
            </Routes>
        </BrowserRouter>
    );
}

export default App;