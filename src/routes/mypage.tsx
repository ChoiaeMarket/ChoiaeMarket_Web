import styled from "styled-components";
import logo from "../assets/logo/logoWhite.png";
import { useNavigate } from "react-router-dom";
import useLoginUserStore from "../stores/login-user.store";
import { useCookies } from "react-cookie";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 326px;
  padding: 44px 0px 68px;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 34px;
  height: 34px;
`;

const Title = styled.h1`
  height: 100%;
  font-weight: 600;
  font-size: 20px;
  line-height: 56px;
  letter-spacing: 0;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export default function Mypage() {
  const navigate = useNavigate();
  const { loginUser } = useLoginUserStore();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const { setLoginUser, resetLoginUser } = useLoginUserStore();

  const handleSearch = () => {
    navigate("/search");
  };

  const logOut = () => {
    // 로그아웃
    removeCookie("accessToken"); // 쿠키에서 accessToken 삭제
    resetLoginUser(); // 상태 초기화
    console.log("로그아웃");
  };

  return (
    <Wrapper>
      {" "}
      <Menu>
        <MenuItem>
          <Logo src={logo} alt="로고" />
          <Title>설정</Title>
        </MenuItem>
        <MenuItem>
          <MenuItem onClick={handleSearch} style={{ cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 20L16.8033 15.8033M19 10.5C19 6.35786 15.6421 3 11.5 3C7.35786 3 4 6.35786 4 10.5C4 14.6421 7.35786 18 11.5 18C15.6421 18 19 14.6421 19 10.5Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </MenuItem>
          <MenuItem style={{ marginLeft: "12px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5.75 17.25V8.85714C5.75 5.49919 8.534 2.75 12 2.75C15.466 2.75 18.25 5.49919 18.25 8.85714V17.25H5.75Z"
                stroke="white"
                stroke-width="1.5"
              />
              <path
                d="M14 19C14 20.1067 13.1067 21 12 21C10.8933 21 10 20.1067 10 19H14Z"
                fill="white"
              />
              <rect
                x="2.5"
                y="16.5"
                width="19"
                height="1"
                rx="0.5"
                stroke="white"
              />
            </svg>
          </MenuItem>
        </MenuItem>
      </Menu>
      <h1>이메일 : {loginUser ? loginUser.email : "error"}</h1>
      <h1>아이디 : {loginUser ? loginUser.nickname : "error"}</h1>
      <h1>
        프로필사진 :{" "}
        {loginUser ? (
          <ProfileImage src={loginUser.profileImage!} alt="프로필 이미지" />
        ) : (
          "error"
        )}
      </h1>
      <button onClick={logOut}>로그아웃</button>
    </Wrapper>
  );
}
