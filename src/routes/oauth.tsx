import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

export default function OAuth() {
  const MAIN_PATH = () => "/";
  const navigate = useNavigate();
  const { token, expirationTime } = useParams();
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    if (!token || !expirationTime) return;

    const now = new Date().getTime();
    const expires = new Date(now + Number(expirationTime) * 1000);

    setCookies("accessToken", token, { expires, path: "MAIN_PATH()" });
    navigate(MAIN_PATH());
  }, [token]);

  return <></>;
}
