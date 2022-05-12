import styled from 'styled-components';
import { useContext } from 'react';

import CardProduct from './CardProduct';

import CartContext from './../contexts/CartContext';

function Cart() {
    const {cart} = useContext(CartContext);

    return(
        <Conteiner>
            <Titulo>Carrinho</Titulo>
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
        </Conteiner>
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
`

const Titulo = styled.h1`
    font-size: 24px;
    margin-bottom: 36px;
`
