import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

import CardProduct from './CardProduct';
import FooterMobile from './FooterMobile';

import CartContext from './../contexts/CartContext';
import axios from 'axios';

const POSTURL = 'https://ciao-caffe.herokuapp.com/sales';
const PUTURL = 'https://ciao-caffe.herokuapp.com/products';

const token = localStorage.getItem("token");

function Cart() {
    
    const {cart, setCart} = useContext(CartContext);
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

    const navigate = useNavigate();

    useEffect(() => {
        if(sale.cep.length === 8){
            try{
                axios.get(`https://viacep.com.br/ws/${sale.cep}/json/`)
                .then(res => {
                    const {data} = res; 
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
        setSale({...sale, cart: cart, total: soma.toFixed(2)})
    }, [cart]) 

    function putProduct(e){
        e.preventDefault();
        if(cart.length !== 0){
            const promise = axios.put(PUTURL, {cart: sale.cart})
            promise.then(res => {
                const produtoDisponivel = res.data;
                console.log(res.data);
                if(produtoDisponivel !== 'Produto indispon??vel no estoque'){
                    postSales();
                } else {
                    alert('Quantidade de produtos indispon??vel!');
                }
            })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Ciao!',
                text: 'Carrinho vazio!'
              })
        }
    }

    function postSales() {
        axios.post(POSTURL, sale, {headers: {
            token
        }}).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Ciao!',
                text: 'Compra realizada com sucesso!'
            })
            navigate('/');
            setCart([]);
            localStorage.setItem('cart', JSON.stringify([]));
        })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'N??o foi poss??vel efetuar o pagamento!',
                  })
            })
    }

    return(
        <>
        <Conteiner>
            <Titulo>{validateToken? "Checkout" : "Carrinho"}</Titulo>
            <Division>
                <Space>
                    {cart.map((product) => {
                        const {image, name, type, price, realPrice, quantity, stored} = product;
                        return(
                            <CardProduct
                                key={name}
                                image={image}
                                name={name}
                                type={type}
                                price={price}
                                realPrice={realPrice}
                                quantity={quantity}
                                stored={stored}
                                />
                        );
                    })}
                </Space>
                <Detail>
                    <div className='total'>
                        <h1>Total</h1>
                        <h1>R${total}</h1>
                    </div>
                    <form onSubmit={putProduct}>
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
                            placeholder='N??mero'
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
                    {  !validateToken ? 
                        <Link to={"/sign-in"}>
                            <button>Fa??a o login!</button>
                        </Link>
                        :
                        <>
                            <button type='submit'>Pagar</button>
                            <Link to={'/'}>
                                <p>Adicionar mais itens</p>
                            </Link>
                        </>   
                    }
                    </form>
                </Detail>
            </Division>
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
    @media (max-width: 800px) {
        margin-bottom: 80px;
    }
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
        font-family: 'Ledger', serif;
        font-weight: 700;
        margin-bottom: 20px;
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

const Division = styled.div`
    @media (min-width: 800px){
        display: flex;
    }
`

const Detail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
`

const Space = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px){
        width: 375px;
        height: 400px;
        overflow-y: scroll;
        overflow-x: hidden;
        border-radius: 40px;
        border: 5px solid #171017;
        background-color: #171017;
    }   
`

const Titulo = styled.h1`
    font-size: 24px;
    margin-bottom: 36px;
`
