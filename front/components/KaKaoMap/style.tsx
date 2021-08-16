import styled from "@emotion/styled";

export const MapScreen = styled.div`
  grid-area: center;
  position: absolute;
  border: 1px solid #999;
  margin: 5px;
  padding: 10px;
  background-color: green;
  width: 100%;
  height: 900px;
`;

export const CenterDiv = styled.div`
  //z-index: 3;
  //cp
`;

export const MapTypeBtn = styled.button`
  z-index: 5;
`;

export const Aside = styled.div<{zIndex:any}>`
  position: relative;
  float: right;
  border: 1px solid #999;
  width: 300px;
  height: 900px;
  background-color: aliceblue;
  z-index:${(props) => props.zIndex};
`;

export const Bottom = styled.div`
  position: relative;
  float: bottom;
  border: 1px solid #999;
  width: 90%;
  height: 300px;
  background-color: aliceblue;
  z-index: 22;
`;

export const CenterAxis = styled.h3`
  font : italic 1.3em TmonMonsori bold;
`;

export const CancelBtn = styled.button`
  float: right;
`;