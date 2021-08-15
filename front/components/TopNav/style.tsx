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

export const Header = styled.header`
  height: 38px;
  background: #350d36;
  color: #ffffff;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);
  padding: 5px;
  text-align: center;
`;

export const ProfileModal = styled.div`
  display: flex;
  padding: 20px;
  & img {
    display: flex;
  }
  & > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  & #profile-name {
    font-weight: bold;
    display: inline-flex;
  }
  & #profile-active {
    font-size: 13px;
    display: inline-flex;
  }
`;

export const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 5px;
  right: 16px;
`;

export const RightMenu = styled.div`
  float: right;
`;
