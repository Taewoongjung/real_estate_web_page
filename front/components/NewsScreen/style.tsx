import styled from "@emotion/styled";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.4fr 0.8fr;
  grid-template-rows: 0.1fr 1.6fr 1.6fr 1.6fr 0.1fr;
  gap: 0px 17px;
  grid-template-areas: 
    ". . ."
    "left_top center right_top"
    "left center right"
    ". bottom ."
    ". . .";
  justify-content: center;
  align-content: center;
  justify-items: stretch;
  align-items: center;
  width: 100%;
  height: 95%;
`;

export const LeftTopNews = styled.div`
  grid-area: left_top;

`;
export const LeftNews = styled.div`
  grid-area: left;

`;
export const LeftBottomNews = styled.div`
  grid-area: left_bottom;

`;
export const BottomNews = styled.div`
  grid-area: bottom;

`;
export const RightBottomNews = styled.div`
  grid-area: ;

`;
export const RightNews = styled.div`
  grid-area: right;
  height: 300px;
  width: 300px;

`;

export const RightTopNews = styled.div`
  grid-area: right_top;
  height: 300px;
  width: 300px;
`;

export const MapScreenSpace = styled.div`
  height: 100%;
  width: 100%;
  grid-area: center;
`;

export const MapScreenInNews = styled.div`
  grid-area: center;
  width: 100%;
  height: 100%;
`;

export const SearchSpace = styled.div`
  grid-area: ;

`;