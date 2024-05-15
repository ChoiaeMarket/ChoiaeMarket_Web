import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import useLoginUserStore from "../stores/login-user.store";
import { getSignInUserRequest } from "../apis";
import { GetSignInUserResponseDto } from "../apis/response/user";
import { ResponseDto } from "../apis/response";
import User from "../types/interface/user.interface";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const { setLoginUser, resetLoginUser } = useLoginUserStore();
  const [cookies, setCookie] = useCookies();

  // get sign in user response 처리함수
  const getSignInUserResponse = (
    responseBody: GetSignInUserResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "AF" || code === "NU" || code === "DBE") {
      resetLoginUser();
      return;
    }
    const loginUser: User = { ...(responseBody as GetSignInUserResponseDto) };
    setLoginUser(loginUser);
  };

  // accessToken cookie 값이 변경될 때 마다 실행할 함수
  useEffect(() => {
    if (!cookies.accessToken) {
      resetLoginUser();
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, [cookies.accessToken]);

  useEffect(() => {
    const token = cookies.accessToken;
    if (token) {
      // 토큰 유효성을 검사하는 로직 추가
      // 예를 들어, 토큰 만료 여부를 확인하는 API 호출
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [cookies]);

  if (isLogin === false) {
    return <Navigate to="/login" />;
  }
  return children;
}
