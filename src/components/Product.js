import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import CartContext from './../contexts/CartContext';

function Product() {
    const [infoProduct, setInfoProduct] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        const promise = axios.get(`https://ciao-caffe.herokuapp.com/products/${id}`);
        promise.then((response) => {
            const {data} = response;
            setInfoProduct(data);
            setLoading(false);
        })
        promise.catch((e) => {
            console.log(e.message);
        })
    },[]);

    const { cart, setCart } = useContext(CartContext);
    function toCart() {
        const produtoExiste = cart.find((product) => {
            return product.name === infoProduct.name
        });
        if(!produtoExiste){
            setCart([...cart, {
                image: infoProduct.image,
                name: infoProduct.name,
                type: infoProduct.type,
                price: infoProduct.price.$numberDecimal,
                realPrice: infoProduct.price.$numberDecimal,
                quantity: 1
            }]);
        }
        navigate('/cart');
    }

    const {name, type, image, price, description} = infoProduct;

    return !loading ?(
        <>
        <Container>
            <div>
                <Imagem src={image}/>
                <Link to='/'>
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </Link>
            </div>
            <Details>
                <Type>{type}</Type>
                <Name>{name}</Name>
                <Description>{description}</Description>
                <Buy>
                    <Price>
                        <p>Preço:</p>
                        <Number>R${price.$numberDecimal}</Number>
                    </Price>
                    <Button onClick={toCart}>Comprar</Button>
                </Buy>
            </Details>
        </Container>
        </>
    ) 
    : ( <>
        <Container>
            <main>
                <div className='loading' />
            </main>
        </Container>
        </>
        )
}

export default Product;

const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 17px;
    color: #FFFFFF;
    main{
        .loading {
                animation: is-rotating 1s infinite;
                width: 50px;
                height: 50px;
                border: 6px solid #1C161E;
                border-top-color: #ffffff;
                border-radius: 50%;
                margin: 15px;
                margin-top: 160px;
            }
        @keyframes is-rotating {
            to {
                transform: rotate(1turn);
            }
        }
    }
    div{
        width: 343px;
        position: relative;
        ion-icon{
            font-size: 50px;
            position: absolute;
            left: 10px;
            top: 10px;
            color: var(--buttonColor);
            background-color: var(--boxColor);
            border-radius: 100px;
        }
    }
    @media (min-width: 800px){
        margin-top: 150px;
        flex-direction: row;
    }
`

const Imagem = styled.img`
    width: 343px;
    height: 380px;
    background-color: #C4C4C4;
    border-radius: 40px;
    margin-bottom: 10px;
    object-fit: cover;
`

const Details = styled.div`
    width: 343px;
    font-size: 16px;
    line-height: 23px;
    @media (min-width: 800px){
        margin-left: 20px;
    }
`

const Type = styled.p`
    font-size: 24px;
    margin-bottom: 13px;
`

const Name = styled.p`
    margin-bottom: 13px;
`

const Description = styled.p`
    margin-bottom: 0px;
`

const Buy = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    margin-top: 15px;
    width: 343px;
`

const Price = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 28px;
`

const Number = styled.p`
    font-size: 24px;
    font-weight: 700;
`

const Button = styled.button`
    width: 218px;
    height: 47px;
    background-color: #EFE3C8;
    font-family:'Ledger', serif;
    font-size: 24px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    color: #4A2B29;
`