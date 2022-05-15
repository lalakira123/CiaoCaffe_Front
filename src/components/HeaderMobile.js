import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <Container>
        <header>
            <div className="centralizer">
                <div className="logo">
                    <h1>ciao</h1>
                    <h1 className="caffe">Caffè</h1>
                </div>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
        display: none;
    }
`