import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import Layout from "./components/navigation-bar";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Join from "./routes/join";
import LoadingScreen from "./components/loading-screen";
import Register from "./routes/register";
import ProtectedRoute from "./components/protected-route";
import Cart from "./routes/cart";
import Chat from "./routes/chat";
import Mypage from "./routes/mypage";
import Idol from "./routes/idol";
import { Product } from "./routes/product";

const Protect = (component: JSX.Element) => (
  <ProtectedRoute>
    {component}
    <Layout />
  </ProtectedRoute>
);

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: Protect(<Home />),
      },
      {
        path: "cart",
        element: Protect(<Cart />),
      },
      {
        path: "chat",
        element: Protect(<Chat />),
      },
      {
        path: "mypage",
        element: Protect(<Mypage />),
      },
      {
        path: "profile",
        element: Protect(<Profile />),
      },
      {
        path: "idol/:idol", // idol별 메인페이지 동적 라우팅
        element: Protect(<Idol />),
      },
      {
        path: "idol/:idol/:product", // idol별 상품페이지 동적 라우팅
        element: Protect(<Product />),
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
    setTimeout(() => setLoading(false), 1000); // 로딩 기다리기
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
