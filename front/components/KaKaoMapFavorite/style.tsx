import styled from "@emotion/styled";

export const MapScreen = styled.div`
  grid-area: center;
  position: absolute;
  border: 1px solid #999;
  margin: 5px;
  padding: 10px;
  background-color: green;
  width: 57%;
  height: 800px;
`;

export const Aside = styled.div`
  position: relative;
  float: right;
  border: 1px solid #999;
  margin-top: 4px;
  width: 41%;
  height: 800px;
  background-color: aliceblue;
  //background-color: #ECE9E6;
  padding: 5px;
`;

export const TableBox = styled.div`
  background-color: white;
  width: 100%;
  height:300px;
  margin: 10px;
  border-radius: 6px;
`;

export const Table = styled.table`
  width: 100%;
`;