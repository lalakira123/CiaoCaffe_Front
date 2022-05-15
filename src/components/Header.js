import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from 'axios';

const URLSIGNOUT = "https://ciao-caffe.herokuapp.com/signout";

let token = localStorage.getItem("token");

function Header(){

    const [validateToken, setValidateToken] = useState(false);

    useEffect(() => {
        if(token){
            setValidateToken(true);
        } else{
            setValidateToken(false);
        }
    }, [validateToken])

    function signOut(){
        let promise = axios.delete(URLSIGNOUT, {headers: {token}});
        promise.then(res => {
            localStorage.clear();
            setValidateToken(false)
            alert(res.data)
            window.location.reload()
        }).catch(err => console.log(err))
    }

    return(
        <Container>
        <header>
            <div className="centralizer">
                <div className="logo">
                    <h1>ciao</h1>
                    <h1 className="caffe">Caffè</h1>
                </div>
                <nav className="navegation">
                    <Link to='/' >
                        <ion-icon name="home-outline"></ion-icon>
                    </Link>
                    <Link to='/cart'>
                        <ion-icon name="cart-outline"></ion-icon>
                    </Link>
                    {validateToken?
                        <ion-icon onClick={() => signOut()} name="log-out-outline"></ion-icon>
                        :
                        <Link to='/sign-in' >
                            <ion-icon name="person-outline"></ion-icon>
                        </Link>
                    }  
                </nav>
                <div className="circle">
                    <ion-icon name="cafe"></ion-icon>
                </div>
            </div>
        </header>
        </Container>
    );
}

export default Header;

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: none;
    header{
    height: 145px;
    width: 100%;
    position: fixed;
    top: 0px;
    background-color: var(--backGroundColor);
    z-index: 2;
    display: flex;
    justify-content: center;
        .centralizer{
            width: 375px;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        h1{
            color: #676367;
            line-height: 35px;
            font-size: 40px;
        } 
        .caffe{
            color: #EFE3C8;
            margin-left: 10px;
        }
        .circle{
            width: 55px;
            height: 54px;
            border-radius: 100px;
            background-color: #E38B38;
        }
        .navegation{
            display: none;
        }
    .circle{
        display: flex;
        justify-content: center;
        align-items: center;
        ion-icon{
            color: black;
            font-size: 30px;
        }
    }    
}

    @media (min-width: 800px){
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        header{
            .centralizer{
                width: 60%;
            }
            .navegation{
                display: flex;
                justify-content: space-between;
                width: 200px;
                margin-right: 20px;
                background-color: #171017;
                border-radius: 100px;
                padding: 10px 40px;
                ion-icon{
                    color: #EFE3C8;
                    font-size: 25px;
                }
            }
        }
    }
`