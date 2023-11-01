import React from 'react';
import { HomeContainer, TextContainer, ImageContainer, Image, ShopNowButton } from '../styles/HomeStyles';
import lionHeads from '../assets/images/3lions_heads_dark.png';


function Home() {
    return (
        <HomeContainer>
            <TextContainer>
                <h1>Trileos. <span>Stylish, comfortable clothes for dangerous kids.</span></h1>
                <ShopNowButton to="/apparel">Shop Now</ShopNowButton>
            </TextContainer>
            <ImageContainer>
                <Image src={lionHeads} alt="Three Lions Image" />
            </ImageContainer>
        </HomeContainer>
    );
}


export default Home; 