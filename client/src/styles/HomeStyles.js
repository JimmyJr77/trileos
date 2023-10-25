import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
    height: calc(100vh - 120px);  // Assuming header is 100px and footer is 20px
    padding: 2rem; 

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const TextContainer = styled.div`
    color: white; 

    h1 {
        font-size: 3rem; 
        text-align: center;
        color: yellow;
        
        span {
            color: white;
        }
    }
`;

export const Image = styled.img`
    width: auto;
    height: 65vh;
    margin-right: 2rem; 

    @media (max-width: 768px) {
        position: absolute;
        z-index: -1;
        opacity: 0.3;
        left: 50%;
        transform: translateX(-50%);
        margin-right: 0;
    }
`;

export const ShopNowButton = styled(Link)`
    display: inline-block;
    background-color: black;
    color: white;
    border: 2px solid yellow;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 25px;
    margin-top: 20px; 
    text-align: center;
    transition: background-color 0.3s, color 0.3s;

    &:hover, &:active {
        background-color: yellow;
        color: black;
    }
`;

export const ImageContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;

    ${ShopNowButton} {
        position: absolute;
        bottom: 20px; 
        left: 47%;
        transform: translateX(-50%);
    }
`;
