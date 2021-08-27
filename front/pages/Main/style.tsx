import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
`;

export const Wrap = styled.div`
  display: grid;
  //height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'header'
                       'center';
`;

export const Nav = styled.nav`
  grid-area: header;
  border: 1px solid #999;
  margin: 5px;
  padding: 10px;
  background-color: goldenrod;
  width: 600px;
  height: 70px
`;

export const MapScreen = styled.div`
  grid-area: center;
  position: absolute;
  border: 1px solid #999;
  margin: 5px;
  padding: 10px;
  background-color: green;
  width: 99%;
  height: 920px;
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