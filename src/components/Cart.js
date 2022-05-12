import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import {Link} from "react-router-dom";

import CardProduct from './CardProduct';

import CartContext from './../contexts/CartContext';

const token = localStorage.getItem("token")

function Cart() {
    const {cart} = useContext(CartContext);
    const [validateToken, setValidateToken] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if(token){
            setValidateToken(true);
        } else{
            setValidateToken(false);
        }
    }, [])

    useEffect( () =>{
        let soma = 0
        for(let i = 0; i < cart.length; i++){
            soma += Number(cart[i].realPrice)
        }
        setTotal(soma.toFixed(2));
    }, [cart]) 

    function Button(){
        if(!validateToken){
            return(
                <Link to={"/sign-in"}>
                    <button>Faça o login!</button>
                </Link>
            )
        }
        if(validateToken){
            return(
                <button>Pagar</button>
            )
        }
    };

    return(
        <>
        <Conteiner>
            <Titulo>{validateToken? "Checkout" : "Carrinho"}</Titulo>
            <Space>
                {cart.map((product) => {
                    const {image, name, type, price, realPrice, quantity} = product;
                    return(
                        <CardProduct
                            key={name}
                            image={image}
                            name={name}
                            type={type}
                            price={price}
                            realPrice={realPrice}
                            quantity={quantity}
                            />
                    );
                })}
                <div className='total'>
                    <h1>Total</h1>
                    <h1>R${total}</h1>
                </div>
                <Button></Button>
            </Space>
        </Conteiner>
        </>
    );
}

export default Cart;

const Conteiner = styled.main`
    padding: 42px 12px 20px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    @media (min-width: 800px){
        margin-top: 100px;
    }
    .total{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 351px;
        height: 98px;
        padding: 9px;
        margin-bottom: 10px;
        border-top: 2px dashed var(--boxColor);
        border-bottom: 2px dashed var(--boxColor);
        h1{
            font-size: 25px;
        }
    }
    button{
        margin-top: 20px;
        width: 298px;
        height: 47px;
        background-color: var(--buttonColor);
        border: none;
        border-radius: 10px;
        color: var(--boxColor);
        font-size: 24px;
    }
`

const Space = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px){
        width: 375px;
        height: 450px;
        overflow-y: scroll;
        overflow-x: hidden;
        border-radius: 10px;
        border: 5px solid #171017;
        background-color: #171017;
    }   
`

const Titulo = styled.h1`
    font-size: 24px;
    margin-bottom: 36px;
`
