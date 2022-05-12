import styled from 'styled-components';

function Footer() {
    return(
        <Container>
            <footer>
                <div className='centralizer'>
                    <p>© 2022 CIAO CAFFÈ</p>
                </div>
            </footer>
        </Container>
    );
}

export default Footer;

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
            justify-content: center;
            align-items: center;
            p{
                color: var(--buttonColor)
            }
        }
    }
    @media (max-width: 800px){
        display: none;
    }
`