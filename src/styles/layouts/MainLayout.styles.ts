import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  position: relative;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const SafeArea = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: env(safe-area-inset-bottom);
  position: relative;
`;
