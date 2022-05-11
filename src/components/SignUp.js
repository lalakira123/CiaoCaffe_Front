import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HeaderSignUp from './../assets/img/coffe-sign-up.png';

function SignUp() {
    const [signUp, setSignUp] = useState({name:'', email:'', password:'', confirmPassword:''});

    return(
        <>
            <Imagem src={HeaderSignUp}/>
            <Container>
                <CaixaBemVindo>
                    <p>Ciao!</p>
                    <p>Cadastre-se para realizar a sua primeira compra!</p>
                </CaixaBemVindo>
                <Form>
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
                    <Button type='submit'>Cadastrar</Button>
                    <Link to='/sign-in'>
                        <Login>Já possui uma conta?</Login>
                    </Link>
                </Form>
            </Container>
        </>
    );
}

export default SignUp;

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

const Button = styled.button`
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
`

const Login = styled.p`
    font-size: 14px;
    margin-top: 24px;
    margin-left: 5px;
`