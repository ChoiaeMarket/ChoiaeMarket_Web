import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    const token = cookies.accessToken;
    console.log(token);
    if (token) {
      // 토큰 유효성을 검사하는 로직 추가
      // 예를 들어, 토큰 만료 여부를 확인하는 API 호출
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [cookies]);

  if (isLogin === null) {
    return <div>Loading...</div>; // 로딩 중일 때 보여줄 컴포넌트
  }

  if (isLogin === false) {
    return <Navigate to="/login" />;
  }
  return children;
}
