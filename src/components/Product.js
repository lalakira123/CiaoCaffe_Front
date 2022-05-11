import styled from 'styled-components';

function Product() {
    return(
        <Container>
            <Imagem>imagem</Imagem>
            <Details>
                <Type>Cappuccino</Type>
                <Name>Drizzled with caramel</Name>
                <Description>Tudo o que há de bom em um cappuccino com muito caramelo e coisas boas para compartilhar</Description>
            </Details>
            <Buy>
                <Price>
                    <p>Preço:</p>
                    <Number>R$100</Number>
                </Price>
                <Button>Comprar</Button>
            </Buy>
        </Container>
    );
}

export default Product;

const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 17px;
    color: #FFFFFF;
`

const Imagem = styled.div`
    width: 343px;
    height: 380px;
    background-color: #C4C4C4;
    border-radius: 40px;
    margin-bottom: 10px;
`

const Details = styled.div`
    width: 343px;
    font-size: 16px;
    line-height: 23px;
`

const Type = styled.p`
    font-size: 24px;
    margin-bottom: 13px;
`

const Name = styled.p`
    margin-bottom: 13px;
`

const Description = styled.p`
    margin-bottom: 13px;
`

const Buy = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    margin-top: 34px;
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