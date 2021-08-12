import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  min-height: 300px;
  margin: 0 auto;
`;

export const Wrap = styled.div`
  color: #FFF;
  width: 900px;
`;

export const Nav = styled.nav`
  border: 1px solid #999;
  margin: 5px;
  padding: 10px;
  background-color: goldenrod;
  width: 600px;
  height: 70px
`;

export const MapScreen = styled.div`
  border: 1px solid #999;
  margin: 5px;
  padding: 10px;
  background-color: green;
  width: 1400px;
  height: 900px;
  float: left;
`;

export const Aside = styled.div`
  border: 1px solid #999;
  width: 300px;
  height: 900px;
  float: left;
`;

export const CenterAxis = styled.h3`
  font : italic 1.3em TmonMonsori bold;
`;

export const MarkerText = styled.div`
  padding:5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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