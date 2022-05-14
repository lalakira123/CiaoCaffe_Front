import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import {Link} from "react-router-dom";

import CardProduct from './CardProduct';
import FooterMobile from './FooterMobile';

import CartContext from './../contexts/CartContext';
import axios from 'axios';

const POSTURL = 'https://ciao-caffe.herokuapp.com/sales';

const token = localStorage.getItem("token")

function Cart() {
    const {cart} = useContext(CartContext);
    const [validateToken, setValidateToken] = useState(false);
    const [total, setTotal] = useState(0);
    const [sale, setSale] = useState({
        cart,
        total,
        cep: '',
        street: '',
        number: '',
        neighbourhood: '',
        city: '',
        state: ''
    });

    useEffect(() => {
        if(sale.cep.length === 8){
            try{
                axios.get(`https://viacep.com.br/ws/${sale.cep}/json/`)
                .then(res => {
                    const {data} = res; 
                    console.log(data)
                    setSale({...sale,
                        street: data.logradouro,
                        neighbourhood: data.bairro,
                        city: data.localidade,
                        state: data.uf
                    })
                })
            }catch(err){
                alert(err)
            };
        }
    }, [sale.cep])
    

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

    function postSale(){
        axios.post(POSTURL, sale, {headers: {
            token
        }})
    }

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
                <>
                    <button onClick={() => postSale()}>Pagar</button>
                </>   
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
                <h4> Para onde deseja enviar?</h4> 
                    <form>
                        <input  
                            className='cep'
                            placeholder='CEP'
                            onChange={(e) => setSale({...sale, cep: e.target.value})}
                            value={sale.cep}
                            type='number'
                            required
                        ></input>
                        <input  
                            className='street'
                            placeholder='Logradouro'
                            onChange={(e) => setSale({...sale, street: e.target.value})}
                            value={sale.street}
                            type='text'
                            required
                        ></input>
                        <input  
                            className='adress-number'
                            placeholder='Número'
                            onChange={(e) => setSale({...sale, number: e.target.value})}
                            value={sale.number}
                            type='number'
                            required
                        ></input>
                        <input  
                            className='neighbourhood'
                            placeholder='Bairro'
                            onChange={(e) => setSale({...sale, neighbourhood: e.target.value})}
                            value={sale.neighbourhood}
                            type='text'
                            required
                        ></input>
                        <input  
                            className='city'
                            placeholder='Cidade'
                            onChange={(e) => setSale({...sale, city: e.target.value})}
                            value={sale.city}
                            type='text'
                            required
                        ></input>
                        <input  
                            className='state'
                            placeholder='Estado'
                            onChange={(e) => setSale({...sale, state: e.target.value})}
                            value={sale.state}
                            type='text'
                            required
                        ></input>
                    </form>
                <Button></Button>
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
    h4{
        font-size:  25px;
        border-bottom: 1px solid #4A2B29;
        text-align: center;
        width: 347px;
        height: 35px;
        margin-bottom: 10px;
    }
    form{
        width: 347px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        input{
            background-color: var(--boxColor);
            height: 20px;
            margin: 4px 4px 0 0;
            border: none;
            text-align: center;
            color: #FFFFFF;
        }
        .cep{
            width: 78px;
        }
        .adress-number{
            width: 60px;
        }
        .state{
            width: 78px;
        }.adress-number{
            width: 78px;
        }
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
