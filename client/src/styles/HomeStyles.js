import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
    padding: 2rem; 

    @media (max-width: 768px) {
        flex-direction: column;
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
        transform: scale(1.05);   // This will slightly enlarge the button on hover/active for better UX feedback
    }
`;

export const TextContainer = styled.div`
    color: white; 
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 3rem; 
        text-align: center;
        color: yellow;
        
        span {
            color: white;
        }
    }

    ${ShopNowButton} {
    }
`;

export const ImageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
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