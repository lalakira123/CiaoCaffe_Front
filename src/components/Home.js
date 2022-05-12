import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import HeaderMobile from './HeaderMobile';

const URLGET = "https://ciao-caffe.herokuapp.com/products"

export default function Home(){

    const [loading, setLoading] = useState(true); 
    const [productsArray, setProductsArray] = useState([]);

    function getProducts(){
        let promise = axios.get(URLGET);
        promise.then(res => {
            setProductsArray(res.data);
            setLoading(false);
        }).catch(err => { 
            setLoading(false)
            console.log(err)
        })
    }

    useEffect(() => getProducts(), [])
    
    if(loading){
        return(
            <>
                <HeaderMobile />
                <Container>
                    <main>
                        <div className='loading' />
                    </main>
                    <footer></footer>
                </Container>
            </>
        )
    }
    if(!loading){
        return(
            <Container>
                <HeaderMobile /> 
                <main>
                    {productsArray.map(product => {
                        return(
                            <Link to={`/product/${product._id}`} key={product._id}>
                                <div className="product-box" >
                                    <img src={product.image} alt="product"/>
                                    <h2>{product.name}</h2>
                                    <div className="price-box">
                                        <p>R${product.price.$numberDecimal}</p>
                                        <div className="plus">+</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </main>
                <footer></footer>
            </Container>
        )
    }
}

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    main{
        padding: 145px 0 79px 0;
        display: flex;
        width: 375px;
        flex-wrap: wrap;
        justify-content: space-evenly;
        .product-box{
            width: 155px;
            height: 229px;
            border-radius: 10px;
            background-color: var(--boxColor);
            display: flex;
            align-items: center;
            flex-direction: column;
            position: relative;
            margin: 10px 0 0 0;
            img{
                position: absolute;
                top: 15px;
                width: 127px;
                height: 97px;
                border-radius: 10px;
                object-fit: cover;
            }
            h2{
                position: absolute;
                top: 115px;
                color: #ffffff;
                width: 127px;
                text-align: left;
                font-size: 17px;
                margin-top: 5px;
            }
            .price-box{
                width: 127px;
                height: 39px;
                border-radius: 10px;
                background-color: var(--priceTag);
                display: flex;
                position: absolute;
                align-items: center;
                bottom: 15px;
                z-index: 0;
                p{
                    padding-left: 15px;
                    color: #ffffff;
                    font-weight: 700;
                }
                .plus{
                    width: 41px;
                    height: 38px;
                    background-color: #ffffff;
                    position: absolute;
                    right: 0px;
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--buttonColor);
                    font-size: 25px;
                    font-weight: bolder;
                    color: #201520;
                }
            }
        }
        .loading {
                animation: is-rotating 1s infinite;
                width: 50px;
                height: 50px;
                border: 6px solid var(--backGroundColor);
                border-top-color: #ffffff;
                border-radius: 50%;
                margin: 15px;
                margin-top: 180px;
            }
        @keyframes is-rotating {
            to {
                transform: rotate(1turn);
            }
        }
    }
    footer{
        height: 69px;
        width: 100%;
        position: fixed;
        bottom: 0px;
        background-color:var(--footerColor);
    }
    @media (min-width: 700px){
        main{
            width: 50%;
        }
    }
`