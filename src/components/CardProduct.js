import {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';

import CartContext from './../contexts/CartContext';

function CardProduct(props) {
    const {image, name, type, price, quantity} = props;
    const [newQuantity, setNewQuantity] = useState(parseInt(quantity));
    const [realPrice, setRealPrice] = useState(price);
    
    const {cart, setCart} = useContext(CartContext);

    function deleteProduct() {
        if(window.confirm(`Gostaria de retirar ${name} do seu carrinho?`)) {
            const newCart = cart.filter((product) => {
                return product.name !== name;
            })
            setCart([...newCart]);
        }
    }

    useEffect(() => {
        const newCart = cart.map((product) => {
            if(product.name === name){
                return {
                    image,
                    name,
                    type,
                    price,
                    realPrice,
                    quantity: newQuantity
                }
            } else{
                return product;
            }
        }) 

        setCart([...newCart]);
    },[realPrice])

    function quantityChangePlus() {
        setNewQuantity(newQuantity + 1);
        setRealPrice((parseFloat(realPrice) + parseFloat(price)).toFixed(2));
    }

    function quantityChangeMinus() {
        if(newQuantity > 1){
            setNewQuantity(newQuantity - 1);
            setRealPrice((parseFloat(realPrice).toFixed(2) - parseFloat(price)).toFixed(2));
        }
    }

    return(
        <Card>
            <Image src={image} />
            <DetailsProduct>
                <Type>{type}</Type>
                <Name>{name}</Name>
                <Price>R${realPrice}</Price>
            </DetailsProduct>
            <Quantity>
                <Controller onClick={quantityChangeMinus}>-</Controller>
                <p>{newQuantity}</p>
                <Controller onClick={quantityChangePlus}>+</Controller>
            </Quantity>
            <ion-icon name="trash-outline" onClick={deleteProduct}></ion-icon>
        </Card>
    );
}

export default CardProduct;

const Card = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 351px;
    height: 98px;
    border-radius: 20px;
    background-color: #362C36;
    padding: 9px;
    margin-bottom: 10px;
    position: relative;
    ion-icon{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 15px;
        color: red;
    }
`

const Image = styled.img`
    width: 80px;
    height: 80px;
    background-color: #C4C4C4;
    border-radius: 20px;
    object-fit: cover;
`

const DetailsProduct = styled.div`
    display: flex;
    flex-direction: column;
    width: 170px;
    line-height: 25px;
`

const Type =  styled.p`
    font-size: 15px;
`

const Name = styled.p`
    font-size: 13px;
`

const Price = styled.p`
    font-size: 20px;
    font-weight: 700;
`

const Quantity = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    height: 30px;
    width: 72px;
    background-color: var(--priceTag);
    font-size: 24px;
`

const Controller = styled.div`
    width: 24px;
    height: 30px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--buttonColor);
    color: #000000;
    font-weight: 700;
`