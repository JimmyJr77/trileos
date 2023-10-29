import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../utils/mutations";
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
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [createOrder, { error }] = useMutation(CREATE_ORDER);

  useEffect(() => {
    if (product.variations && product.variations.length > 0) {
      const uniqueSizes = [...new Set(product.variations.map(item => item.size))];
      const uniqueColors = [...new Set(product.variations.map(item => item.color))];
      setSelectedSize(uniqueSizes[0]);
      setSelectedColor(uniqueColors[0]);
    }
  }, [product]);

  const uniqueSizes = [...new Set(product.variations.map(item => item.size))];
  const uniqueColors = [...new Set(product.variations.map(item => item.color))];

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color');
      return;
    }
    const cartItem = {
      product: product._id,
      quantity: selectedQuantity,
      size: selectedSize,
      color: selectedColor,
    };

    try {
      const { data } = await createOrder({
        variables: { orderData: { products: [cartItem] } },
      });

      if (data.createOrder) {
        console.log('Order created:', data.createOrder);
        addToCart(cartItem);
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const nextImage = () => {
    setActiveImageIndex(
      (prevIndex) => (prevIndex + 1) % product.imageUrl.length
    );
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.imageUrl.length) % product.imageUrl.length
    );
  };

  if (error) {
    console.error("Error creating order:", error);
  }

  return (
    <ProductContainerStyled>
      <ProductSelectionContainer>
        <h2>{product.name}</h2>
        <p>{product.description}</p>

        <h4>Sizes</h4>
        <BoxContainer>
          {uniqueSizes.map((size, index) => (
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
          {uniqueColors.map((color, index) => (
            <ColorBox
              key={index}
              color={color}
              selected={selectedColor === color}
              onClick={() => setSelectedColor(color)}
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
          {product.imageUrl &&
            product.imageUrl.map((url, index) => (
              <SpinnerImage
                src={url}
                alt={product.name}
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
