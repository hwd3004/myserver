import NavBar from "./NavBar";
import styled from "styled-components";

const LayoutSC = styled.div`
  width: 100vw;
  height: 100vw;
`;



const Container = styled.div`
  padding: 50px;
`;

const Layout = (props: any) => {
  return (
    <LayoutSC>
      <NavBar />
      <Container>{props.children}</Container>
    </LayoutSC>
  );
};

export default Layout;
