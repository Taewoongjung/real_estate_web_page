import styled from "@emotion/styled";

export const MapScreen = styled.div`
  grid-area: center;
  position: absolute;
  margin: 5px;
  padding: 10px;
  width: 100%;
  height: 88%;
`;

export const MapTypeBtn = styled.button`
  z-index: 5;
`;

export const Aside = styled.div<{zIndex:any}>`
  position: relative;
  float: right;
  border: 1px solid #999;
  margin-top: 4px;
  width: 300px;
  height: 88%;
  background-color: aliceblue;
  z-index:${(props) => props.zIndex};
`;

export const CenterAxis = styled.h3`
  font : italic 1.3em TmonMonsori bold;
`;

export const CancelBtn = styled.button`
  float: right;
`;

export const BottomBox = styled.div<{zIndex:any}>`
  position: relative;
  width: 82%;
  left: 7px;
  top: 603px;
  float: bottom;
  height: 300px;
  background-color: aliceblue;
  z-index: 22;
  padding: 10px;
  padding-top: 27px;
  z-index: ${(props) => props.zIndex};
`;

export const SearchLandSpace = styled.div`
  margin-right: 40%;
  width: 370px;
  float: right;
`;