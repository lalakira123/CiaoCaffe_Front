import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
    return(
        <BrowserRouter >
            <Routes>
                <Route path='/'/>
                <Route path='/products/:id'/>
                <Route path='/cart' />
                <Route path='/sign-up' />
                <Route path='/sign-in' />
            </Routes>
        </BrowserRouter>
    );
}

export default App;