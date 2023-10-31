import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { ProductContainerStyled, ProductSelectionContainer, MainImageContainer, BoxContainer, SizeBox, ColorBox, ImageSpinner, SpinnerImage, SpinnerButton, QuantityBox, CartButton, ActionContainer } from '../styles/ProductContainerStyles';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../utils/mutations';

function ProductContainer({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { addToCart } = useCart();

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

  const [addToCartMutation, { error }] = useMutation(CREATE_ORDER);

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color');
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      description: product.description,
      color: selectedColor,
      size: selectedSize,
      quantity: selectedQuantity,
      price: product.price,
      productImage: product.productImage, // Add productImage if available
    };

    try {
      const { data } = await addToCartMutation({
        variables: {
          orderData: {
            products: [
              {
                _id: cartItem.productId,
                name: cartItem.name,
                description: cartItem.description,
                price: cartItem.price,
                productImage: cartItem.productImage,
                variations: [
                  {
                    size: cartItem.size,
                    color: cartItem.color,
                    stockCount: cartItem.quantity,
                  },
                ],
              },
            ],
          },
        },
      });

      if (data.createOrder) {
        console.log('Item added to cart:', data.createOrder);
        addToCart(cartItem);
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const nextImage = () => {
    setActiveImageIndex(
      (prevIndex) => (prevIndex + 1) % product.productImage.length
    );
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.productImage.length) % product.productImage.length
    );
  };

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
          {product.productImage &&
            product.productImage.map((url, index) => (
              <SpinnerImage
                $active={index === activeImageIndex}
                src={product.productImage ? `/images/${product.productImage[index]}` : 'default-image-url'}
                alt={product.name}
                key={index}
              />
            ))}
          <SpinnerButton onClick={nextImage}>❯</SpinnerButton>
        </ImageSpinner>
      </MainImageContainer>
    </ProductContainerStyled>
  );
}

export default ProductContainer;
