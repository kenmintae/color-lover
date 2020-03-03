import React from "react";
import styled from "styled-components";
import Header from "../Header"

type AppLayoutProps = {
  children: React.ReactNode
}

const LayoutWrapper = styled.main`
  min-height: 100vh;
  overflow: hidden;
  background-color: ${props => props.theme.palette.background.default};
`;

const Layout = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 0;
`;

const ContentWrapper = styled.div`
    flex: auto;
    min-height: 0;
    padding: 16px;
`;

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Layout>
        <Header />
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </Layout>
    </LayoutWrapper>
  )
}

export default AppLayout;