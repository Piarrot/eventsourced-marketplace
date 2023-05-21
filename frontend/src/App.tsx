import styled from "styled-components";
import { Home } from "./pages/home.tsx";
import "./styles.css";

const AppContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
});

function App() {
    return (
        <AppContainer>
            <Home />
        </AppContainer>
    );
}

export default App;
