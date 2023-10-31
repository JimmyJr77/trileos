import styled from 'styled-components';

export const PopupContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 100px;
  background-color: lightgrey;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(-20px)')};
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

export const PopupMessage = styled.p`
  margin: 0;
  font-size: 1em;
  color: black;
`;

export const PopupCloseButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 1.2em;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  margin-left: 20px;
`;

 