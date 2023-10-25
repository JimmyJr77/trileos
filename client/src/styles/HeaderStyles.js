import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid white;
    height: 100px;
    padding: 0 20px;  // Added some padding

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const Logo = styled.img`
    width: auto;
    height: 140px;
    margin-top: 60px;
`;

export const Title = styled.h1`
    color: yellow;
    margin-left: 25px;  // To provide a gap between the logo and the title
    font-size: 2.5em;
`;

export const Nav = styled.ul`
    display: flex;
    margin-right: 20px;
    gap: 20px;
    list-style-type: none;

    li {
        cursor: pointer;
        color: white;
        font-weight: bold;
        font-size: 1.25em;
    }

    a {
        text-decoration: none;  // no underline for links
        color: inherit;  // inherit the white color

        &.active, &:hover, &:focus {
            color: yellow;
        }
    }
`;
