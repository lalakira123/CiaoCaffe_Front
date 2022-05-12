import styled from 'styled-components';
import { Link } from 'react-router-dom';

function FooterMobile() {
    return(
        <Container>
            <footer>
                <div className='centralizer'>
                    <Link to='/' >
                        <ion-icon name="home-outline"></ion-icon>
                    </Link>
                    <Link to='/cart'>
                        <ion-icon name="cart-outline"></ion-icon>
                    </Link>
                    <Link to='/sign-in' >
                        <ion-icon name="person-outline"></ion-icon>
                    </Link>
                </div>
            </footer>
        </Container>
    );
}

export default FooterMobile;

const Container = styled.div`
    height: 100%;
    width: 100%;
    footer{
        width: 100%;
        height: 69px;
        position: fixed;
        bottom: 0px;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color:var(--footerColor);
        .centralizer{
            width: 305px;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            ion-icon{
                font-size: 25px;
                font-weight: 700;
                color: #EFE3C8;
            }
        }
    }
    @media (min-width: 800px){
        display: none;
    }
`