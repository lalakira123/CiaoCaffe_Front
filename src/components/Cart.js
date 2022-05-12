import styled from 'styled-components';
import { useContext } from 'react';

import CardProduct from './CardProduct';
import FooterMobile from './FooterMobile';

import CartContext from './../contexts/CartContext';

function Cart() {
    const {cart} = useContext(CartContext);

    return(
        <>
        <Conteiner>
            <Titulo>Carrinho</Titulo>
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
            </Space>
        </Conteiner>
        <FooterMobile />
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
        margin-top: 110px;
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
