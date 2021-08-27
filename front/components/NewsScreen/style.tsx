import styled from "@emotion/styled";

export const FullContainer = styled.div`
  height: 800px;
  width:100%;
`;

export const Container = styled.div`
  display: grid;
  position: absolute;
  grid-template-columns: 0.8fr 1.4fr 0.8fr;
  grid-template-rows: 0.1fr 1.6fr 1.6fr 1.6fr 0.1fr;
  gap: 0px 17px;
  grid-template-areas: 
    ". . ."
    "left_top center right_top"
    "left center right"
    "left_bottom bottom right_bottom"
    ". . .";
  justify-content: center;
  align-content: center;
  justify-items: stretch;
  align-items: center;
  width: 100%;
  height: 900px;
`;

export const Boxes = styled.div`
  position: relative;
  height: 250px;
  width: 400px;
`;

export const LeftTopNews = styled.div`
  grid-area: left_top;
  height: 300px;
  width: 450px;
`;
export const LeftNews = styled.div`
  grid-area: left;
  height: 300px;
  width: 450px;
`;
export const LeftBottomNews = styled.div`
  grid-area: left_bottom;
  height: 300px;
  width: 450px;
`;
export const BottomNews = styled.div`
  grid-area: bottom;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 300px 300px 300px;
  grid-template-rows: 300px;
  gap: 0px 0px;
  grid-template-areas: 
    ". . .";
  align-content: center;
  justify-items: center;
  align-items: center;
  width: 900px;
  height: 300px;
`;

export const RightBottomNews = styled.div`
  grid-area: right_bottom;
  height: 300px;
  width: 450px;
`;
export const RightNews = styled.div`
  grid-area: right;
  height: 300px;
  width: 450px;

`;

export const RightTopNews = styled.div`
  grid-area: right_top;
  height: 300px;
  width: 450px;
`;

export const MapScreenSpace = styled.div`
  height: 100%;
  width: 100%;
  grid-area: center;
`;

export const MapScreenInNews = styled.div`
  grid-area: center;
  width: 100%;
  height: 90%;
`;

export const SearchSpace = styled.div`
  margin-top: 10px;
  margin-left: 25%;
`;