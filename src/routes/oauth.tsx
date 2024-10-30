import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export default function OAuth() {
  const { token, expirationTime } = useParams();
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    if (!token || !expirationTime) return;
  }, [token]);

  return <div>OAuth</div>;
}
