import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
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
  ActionContainer,
} from '../styles/ProductContainerStyles';

function ProductContainer({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (product.variations && product.variations.length > 0) {
      setSelectedVariant(product.variations[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
  if (!selectedVariant) {
    alert('Please select a size and color');
    return;
  }

  const cartItem = {
    productId: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    productImage: product.productImage,
    variantId: selectedVariant._id,
    size: selectedVariant.size,
    color: selectedVariant.color,
    quantity: selectedQuantity,

  };

  addToCart(cartItem);
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

  const handleVariantChange = (size, color) => {
    const variant = product.variations.find(
      (v) => v.size === size && v.color === color
    );
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  const uniqueSizes = [
    ...new Set(product.variations.map((item) => item.size)),
  ];
  const uniqueColors = [
    ...new Set(product.variations.map((item) => item.color)),
  ];

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
              selected={selectedVariant?.size === size}
              onClick={() =>
                handleVariantChange(size, selectedVariant?.color)
              }
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
              selected={selectedVariant?.color === color}
              onClick={() =>
                handleVariantChange(selectedVariant?.size, color)
              }
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
                src={
                  product.productImage
                    ? `/images/${product.productImage[index]}`
                    : 'default-image-url'
                }
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
 