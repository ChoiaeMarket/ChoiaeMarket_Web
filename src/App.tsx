import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Join from "./routes/join";
import LoadingScreen from "./components/loading-screen";
import Register from "./routes/register";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing:border-box;
  }
  body{
    background-color: #252932;
    color: white;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  max-width: 390px;
  border: 1px solid #35383f;
  background-color: #181a20;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    setTimeout(() => setLoading(false), 2000); // 로딩 기다리기
    // setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
