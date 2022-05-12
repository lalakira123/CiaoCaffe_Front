import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import HeaderSignUp from './../assets/img/coffe-sign-up.png';

const POSTURL = 'https://ciao-caffe.herokuapp.com/signup';

function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [signUp, setSignUp] = useState({name:'', email:'', password:'', confirmPassword:''});

    function cadastrar(e){
        setLoading(true);
        e.preventDefault();
        const promise = axios.post(POSTURL, signUp);
        promise.then((response) => {
            setLoading(false);
            alert("Ciao! Contra criada com sucesso!");
            navigate("/sign-in");
        })
        promise.catch((e) => {
            alert("Erro ao criar a conta!")
            setLoading(false);
            console.log(e.message);
        })
    }

    function Button(){
        if(!loading){
            return(
                <button type='submit'>Cadastrar</button>
            )
        }
        if(loading){
            return(
                <button>
                    <div className='loading' />
                </button>        
            )
        }
    }

    return(
        <>  
            <Division>
                <Link to='/'>
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </Link>
            </Division>
            <Imagem src={HeaderSignUp}/>
            <Container>
                <CaixaBemVindo>
                    <p>Ciao!</p>
                    <p>Cadastre-se para realizar a sua primeira compra!</p>
                </CaixaBemVindo>
                <Form onSubmit={cadastrar}>
                    <Input 
                        placeholder='Nome'
                        onChange={(e) => setSignUp({...signUp, name: e.target.value})}
                        value={signUp.name}
                        type='text'
                        required
                        />
                    <Input 
                        placeholder='Email'
                        onChange={(e) => setSignUp({...signUp, email: e.target.value})}
                        value={signUp.email}
                        type='email'
                        required
                        />
                    <Input 
                        placeholder='Senha'
                        onChange={(e) => setSignUp({...signUp, password: e.target.value})}
                        value={signUp.password}
                        type='password'
                        required
                        />
                    <Input 
                        placeholder='Confirmar Senha'
                        onChange={(e) => setSignUp({...signUp, confirmPassword: e.target.value})}
                        value={signUp.confirmPassword}
                        type='password'
                        required
                        />
                    <Button></Button>
                    <Link to='/sign-in'>
                        <Login>Já possui uma conta?</Login>
                    </Link>
                </Form>
            </Container>
        </>
    );
}

export default SignUp;

const Division = styled.div`
    @media (max-width: 800px){
        width: 343px;
        position: absolute;
        top: 150px;
        left: 2px;
        z-index: 3;
        ion-icon{
            font-size: 40px;
            position: absolute;
            left: 10px;
            top: 10px;
            color: var(--buttonColor);
            background-color: var(--boxColor);
            border-radius: 100px;
        }
    }
`

const Imagem = styled.img`
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0px;
    width: 100%;
    height: 30%;
    @media (min-width: 800px){
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 127px);
    background-color: #1C161E;
    margin-top: 127px;
    border-radius: 61px 61px 0px 0px;
    z-index: 1;
    position: relative;
    @media (min-width: 800px){
        opacity: 85%;
    }
`

const CaixaBemVindo = styled.div`
    width: 260px;
    color: #FFFFFF;
    padding-top: 36px;
    font-size: 24px;
    line-height: 33.38px;
    margin-right: 40px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-left: 100px;
    button{
        margin-top: 33px;
        border: none;
        border-radius: 10px;
        background-color: #EFE3C8;
        width: 156px;
        height: 44px;
        color: #4A2B29;
        font-size: 20px;
        font-weight: 700;
        font-family: 'Ledger', serif;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loading {
        animation: is-rotating 1s infinite;
        width: 25px;
        height: 25px;
        border: 4px solid var(--buttonColor);
        border-top-color: var(--backGroundColor);
        border-radius: 50%;
        margin: 15px;
    }
    @keyframes is-rotating {
        to {
            transform: rotate(1turn);
        }
    }
`

const Input = styled.input`
    border: none;
    height: 40px;
    background-color: #1C161E;
    border-bottom: 2px solid #4A2B29;
    color: #FFFFFF;
    font-size: 20px;
    margin-bottom: 10px;
    &::placeholder {
        color: #FFFFFF;
        font-family: 'Ledger', serif;
    }
`

const Login = styled.p`
    font-size: 14px;
    margin-top: 24px;
    margin-left: 5px;
`