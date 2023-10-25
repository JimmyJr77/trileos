import styled from "styled-components";

export const ProductContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
  padding: 20px;
`;

export const ProductSelectionContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

export const MainImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  justify-content: flex-start;
  margin-top: 70px;
`;

export const BoxContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

export const SizeBox = styled.div`
    font-size: 10px;
    width: 35px;
    height: 15px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => (props.selected ? "lightgrey" : "white")};  // <-- Added this line
    cursor: pointer;  // <-- Added for better UX
`;

export const ColorBox = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color};
  margin: 5px;
  cursor: pointer;
  border: .5px solid grey;
  box-shadow: ${props => (props.selected ? "0 0 2px 2px black" : "none")};
`;


export const Image = styled.img`
  width: 70%;
  height: auto;
`;

export const CartButton = styled.button`
  background-color: #28a745; 
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
    background-color: #218838;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px; // Give some space between the image and action buttons
  margin-bottom: 20px; // Extra space to separate from other elements, if any, below
`;

export const QuantityBox = styled.input.attrs(props => ({
  type: "number",
  min: "1"
}))`
  width: 60px;
  padding: 5px;
  margin-right: 10px;
  font-size: 14px;
`;

export const ImageSpinner = styled.div`
  position: relative;
  width: 200px; // Define a fixed width for square
  height: 200px; // Define a fixed height for square
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px; // Adjusted space for a closer action button
`;

export const SpinnerButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  position: absolute; // Keep them above the image
  bottom: 10%;  // Position them near the bottom
  transform: translateY(50%);  // Adjust for better positioning

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  // This style targets the previous (left) button 
  &:first-child {
    left: 10px;
    z-index: 2;  // To ensure it's above the image
  }

  // This style targets the next (right) button 
  &:last-child {
    right: 10px;
    z-index: 2;  // To ensure it's above the image
  }
`;


export const SpinnerImage = styled.img`
  max-width: 100%; 
  max-height: 100%; 
  object-fit: contain;
  display: ${props => (props.active ? 'block' : 'none')};
  transition: opacity 0.5s;
`;
