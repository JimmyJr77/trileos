import styled from 'styled-components';

export const CartContainer = styled.div`
    padding: 10px 60px;
    background-color: white;
    color: black;
`;

export const CartTitle = styled.h1`
    margin-top: 60px;
`;

export const CartContainerStyled = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid darkgrey;
    padding: 20px;

    @media (max-width: 900px) {
      flex-direction: column-reverse;
      align-items: center;
    }
`;


export const CartItemsContainer = styled.div`
flex: 1;
padding: 20px;

@media (max-width: 900px) {
  width: 100%;
}
`;

export const SubTotalsContainer = styled.div`

`;

export const Subtotal = styled.p`

`;

export const Tax = styled.p`

`;

export const Shipping = styled.p`

`;

export const Total = styled.p`

`;

export const CheckoutButton = styled.button`
  background-color: #218838;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #28a745;
  }
`;

export const CheckoutDetailsBox = styled.div`
  background-color: lightgrey;
  border: 1px solid black;
  padding: 20px;
  text-align: left;
`;

export const CheckoutTitle = styled.h2`
  color: black;
  padding: 10px;
  margin-top: 0;
`;

export const CheckoutContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgrey;
  padding: 20px;
  border: 1px solid black;
  text-align: center;
`; 