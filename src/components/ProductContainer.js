import React, { useState } from "react";
import {
  ProductContainerStyled,
  ProductSelectionContainer,
  MainImageContainer,
  BoxContainer,
  SizeBox,
  ColorBox,
  ImageSpinner,
  SpinnerImage,
  SpinnerButton,
  QuantityBox,
  CartButton,
  ActionContainer
} from '../styles/ProductContainerStyles';

function ProductContainer({ product, addToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedProduct] = useState(product);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    const cartItem = {
      product: selectedProduct.name,
      quantity: selectedQuantity,
      size: selectedSize,
      color: selectedProduct.colors[selectedColorIndex],
    };
    addToCart(cartItem);
  };


  const nextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % selectedProduct.imageUrl.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + selectedProduct.imageUrl.length) % selectedProduct.imageUrl.length);
  };

  return (
    <ProductContainerStyled>
      <ProductSelectionContainer>
        <h2>{selectedProduct.name}</h2>
        <p>{selectedProduct.description}</p>
        
        <h4>Sizes</h4>
        <BoxContainer>
          {["6-8", "8-10", "10-12", "12-14"].map((size, index) => (
            <SizeBox
                key={index}
                selected={selectedSize === size}
                onClick={() => setSelectedSize(size)}
            >
                {size}
            </SizeBox>
          ))}
        </BoxContainer>
  
        
        <h4>Colors</h4>
        <BoxContainer>
          {selectedProduct.colors.map((color, index) => (
            <ColorBox
              key={index}
              color={color}
              selected={selectedColorIndex === index}
              onClick={() => setSelectedColorIndex(index)}
            />
          ))}
        </BoxContainer>
        <h4>Quantity:</h4>
        <ActionContainer>
          <QuantityBox 
            type="number" 
            min="1" 
            value={selectedQuantity} 
            onChange={(e) => setSelectedQuantity(Number(e.target.value))} 
          />
          <CartButton onClick={handleAddToCart}>Add to Cart</CartButton>
        </ActionContainer>
      </ProductSelectionContainer>
  
      <MainImageContainer>
        <ImageSpinner>
          <SpinnerButton onClick={prevImage}>❮</SpinnerButton>
          {selectedProduct.imageUrl.map((url, index) => (
              <SpinnerImage 
                  src={url} 
                  alt={selectedProduct.name} 
                  key={index} 
                  active={index === activeImageIndex}
              />
          ))}
          <SpinnerButton onClick={nextImage}>❯</SpinnerButton>
        </ImageSpinner>
      </MainImageContainer>
    </ProductContainerStyled>
  );
}

export default ProductContainer;
