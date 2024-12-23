import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { BoardItem } from "./components/board-item";
import LoadingScreen from "./components/loading-screen";
import NavigationBar from "./components/navigation-bar";
import { ProductItem } from "./components/product-item";
import ProtectedRoute from "./components/protected-route";
import { BoardListMock, ProductListMock } from "./mocks";
import Board from "./routes/board";
import BoardUpdate from "./routes/boardUpdate";
import Cart from "./routes/cart";
import Chat from "./routes/chat";
import ChatRoom from "./routes/chatRoom";
import Detail from "./routes/detail";
import Home from "./routes/home";
import Idol from "./routes/idol";
import Join from "./routes/join";
import Login from "./routes/login";
import OAuth from "./routes/oauth";
import Register from "./routes/register";
import Search from "./routes/search";
import SearchWord from "./routes/searchWord";
import Upload from "./routes/upload";
import UserPage from "./routes/userPage";
import UserUpdate from "./routes/userUpdate";

const Protect = (component: JSX.Element, hideNav?: boolean) => (
  <ProtectedRoute>
    {component}
    {!hideNav && <NavigationBar />}
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
        path: "chat/:roomId",
        element: Protect(<ChatRoom />, true),
      },
      {
        path: "user/:userEmail",
        element: Protect(<UserPage />),
      },
      {
        path: "user/:userEmail/update",
        element: Protect(<UserUpdate />),
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
        path: "board/:boardNumber", // idol별 상품 개별 판매페이지 동적 라우팅
        element: Protect(<Detail />),
      },
      {
        path: "board/:boardNumber/update", // idol별 상품 개별 판매페이지 동적 라우팅
        element: Protect(<BoardUpdate />),
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
  {
    path: "/auth/oauth-response/:token/:expirationTime",
    element: <OAuth />,
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
