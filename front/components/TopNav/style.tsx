import styled from "@emotion/styled";

export const Nav = styled.nav`
  border: 1px solid #999;
  margin: 5px;
  padding: 10px;
  width: 1000px;
  height: 70px;
  border-color: white;
`;

export const Toggle = styled.li<{ collapse: boolean }>`
    ${({ collapse }) =>
    collapse &&
    ` 
    & li ul {
      transform: none;
    }
  `};
`;