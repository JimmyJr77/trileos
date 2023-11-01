import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid white;
    height: 100px;
    padding: 0 20px;

    @media (max-width: 800px) {
        flex-direction: column;
        justify-content: left;
    }
`;

export const Logo = styled.img`
    width: auto;
    height: 140px;
    position: absolute;    
    top: 5px;  
    left: 10px;
    z-index: 1000; 

    @media (max-width: 800px) {
        height: 85px;
    }
`;


export const Title = styled.h1`
    color: yellow;
    margin-left: 135px;
    font-size: 2.5em;

    @media (max-width: 800px) {
        margin-left: 65px;
    }
`;

export const Nav = styled.ul`
    display: flex;
    margin-right: 20px;
    gap: 20px;
    list-style-type: none;

    @media (max-width: 800px) {
        margin-top: -20px;
    }

    li {
        cursor: pointer;
        color: white;
        font-weight: bold;
        font-size: 1.25em;
    }

    a {
        text-decoration: none;
        color: inherit;

        &.active, &:hover, &:focus {
            color: yellow;
        }
    }
`;

export const CartCount = styled.span`
  background-color: yellow;
  color: black;
  border-radius: 50%;
  padding: 0.25em 0.5em;
  margin-left: 0.5em;
  font-weight: bold;
`; 