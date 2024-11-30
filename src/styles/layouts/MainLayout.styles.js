import styled from "styled-components";
export const MainContainer = styled.div `
  position: relative;
  width: 100%;
  max-width: 768px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background.default};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;
export const ContentWrapper = styled.main `
  position: relative;
  width: 100%;
  height: calc(100vh - 120px); // 상단 헤더(60px)와 하단 네비게이션(60px) 고려
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md};
`;
export const Header = styled.header `
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 768px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  z-index: ${({ theme }) => theme.zIndex.header};
`;
export const HeaderTitle = styled.p `
  font-size: ${({ theme }) => theme.typography.md};
  font-weight: 700;
`;
export const HeaderSubTitle = styled.p `
  font-size: ${({ theme }) => theme.typography.sm};
  font-weight: 400;
`;
export const Navigation = styled.nav `
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 768px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.background.default};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
  z-index: ${({ theme }) => theme.zIndex.footer};
`;
export const NavItem = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.blue[500] : theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.typography.xs};
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.blue[500]};
  }
`;
export const SafeArea = styled.div `
  padding-top: 60px;
  padding-bottom: 60px;
`;
