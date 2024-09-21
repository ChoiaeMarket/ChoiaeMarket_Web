import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import NavigationBar from "./components/navigation-bar";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Join from "./routes/join";
import LoadingScreen from "./components/loading-screen";
import Register from "./routes/register";
import ProtectedRoute from "./components/protected-route";
import Cart from "./routes/cart";
import Upload from "./routes/upload";
import Chat from "./routes/chat";
import Mypage from "./routes/mypage";
import Idol from "./routes/idol";
import Update from "./routes/update";
import { ProductItem } from "./components/product-item";
import { Board } from "./routes/board";
import { BoardItem } from "./components/board-item";
import { Detail } from "./routes/detail";
import { Search } from "./routes/search";
import { SearchWord } from "./routes/searchWord";
import { BoardListMock, ProductListMock } from "./mocks";

const Protect = (component: JSX.Element) => (
  <ProtectedRoute>
    {component}
    <NavigationBar />
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
        path: "upload",
        element: Protect(<Upload />),
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
        path: "search",
        element: Protect(<Search />),
      },
      {
        path: "search/:searchWord",
        element: Protect(<SearchWord />),
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
        // 임시 주소
        path: "idol/list", // idol별 메인페이지 product 리스트 아이템 동적 라우팅
        element: Protect(
          <div>
            {ProductListMock.map((productListItem) => (
              <ProductItem productListItem={productListItem} />
            ))}
          </div>
        ),
      },
      {
        path: "idol/:idol/:product", // idol별 상품페이지 동적 라우팅
        element: Protect(<Board />),
      },
      {
        // 임시 주소
        path: "idol/:idol/list", // idol별 상품페이지 board 리스트 아이템 동적 라우팅
        element: Protect(
          <div>
            {BoardListMock.map((boardListItem) => (
              <BoardItem boardListItem={boardListItem} />
            ))}
          </div>
        ),
      },
      {
        path: "idol/:idol/:product/:boardNumber", // idol별 상품 개별 판매페이지 동적 라우팅
        element: Protect(<Detail />),
      },
      {
        path: "idol/:idol/:product/:boardNumber/update", // idol별 상품 개별 판매페이지 동적 라우팅
        element: Protect(<Update />),
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
  // 404 페이지 라우팅 설정
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
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
