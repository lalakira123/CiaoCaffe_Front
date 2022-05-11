import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import HeaderSignIn from './../assets/img/coffe-sign-in.svg';

function SignIn() {

    const [signIn, setSignIn] = useState({
        email:'', 
        password:''
    });
    const [loading, setLoading] = useState(false);

    function login(e){
        setLoading(true)
        e.preventDefault();
        const promise = axios.post('https://ciao-caffe.herokuapp.com/signin', signIn);
        promise.then((response) => {
            const {data} = response;
            setLoading(false);
            console.log(data); 
        })
        promise.catch((e) => {
            console.log(e.message);
            setLoading(false);
        })
    }

    function Button(){
        if(!loading){
            return(
                <button type='submit'>Entrar</button>
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
            <Imagem src={HeaderSignIn}/>
            <Container>
                <CaixaBemVindo>
                    <p>Ciao!<br/> Seja bem-vindo!
Para completar a compra será necessário fazer o login.</p>
                </CaixaBemVindo>
                <Form onSubmit={login}>
                    <Input 
                        placeholder='Email'
                        onChange={(e) => setSignIn({...signIn, email: e.target.value})}
                        value={signIn.email}
                        type='email'
                        required
                        />
                    <Input 
                        placeholder='Senha'
                        onChange={(e) => setSignIn({...signIn, password: e.target.value})}
                        value={signIn.password}
                        type='password'
                        required
                        />
                    <Button></Button>
                    <Link to='/sign-in'>
                        <Login>Primeira vez? Cadastre-se!</Login>
                    </Link>
                </Form>
            </Container>
        </>
    );
}

export default SignIn;

const Imagem = styled.img`
    z-index: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 25%;
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