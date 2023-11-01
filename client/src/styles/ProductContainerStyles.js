import styled from "styled-components";

export const ProductContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
  padding: 20px;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const ProductSelectionContainer = styled.div`
  flex: 1;
  padding: 20px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const MainImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  justify-content: flex-start;
  margin-top: 70px;

  @media (max-width: 900px) {
    margin-top: 20px;
  }
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const SizeBox = styled.div`
  font-size: 12px;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.selected ? "black" : "white")};
  color: ${props => (props.selected ? "white" : "black")};
  cursor: pointer;
`;

export const ColorBox = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color};
  cursor: pointer;
  border: 1px solid grey;
  box-shadow: ${props => (props.selected ? "0 0 2px 2px black" : "none")};
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
  margin-top: 10px;
  margin-bottom: 20px;
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
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const SpinnerButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  position: absolute;
  bottom: 10%;
  transform: translateY(50%);
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
  &:first-child {
    left: 10px;
    z-index: 2;
  }
  &:last-child {
    right: 10px;
    z-index: 2;
  }
`;

export const SpinnerImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: ${props => props.$active ? 'block' : 'none'};
  transition: opacity 0.5s;
`;

 