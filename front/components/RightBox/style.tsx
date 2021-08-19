import styled from "@emotion/styled";

export const Aside = styled.div<{zIndex:any}>`
  position: relative;
  float: right;
  border: 1px solid #999;
  margin-top: 4px;
  width: 300px;
  height: 900px;
  background-color: aliceblue;
  z-index:${(props) => props.zIndex};
`;

export const CancelBtn = styled.button`
  float: right;
`;