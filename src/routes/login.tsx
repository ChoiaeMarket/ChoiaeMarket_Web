import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import back from "../assets/icon/back.png";
import check from "../assets/icon/check.png";
import checkWhite from "../assets/icon/checkWhite.png";
import kakaoLogo from "../assets/icon/kakaoColor.png";
import naverLogo from "../assets/icon/naverColor.png";
import googleLogo from "../assets/icon/googleColor.png";
import {
  Back,
  Div,
  Error,
  Form,
  Input,
  SocialLogin,
  SocialLoginBox,
  Switcher as OriginalSwitcher,
  SwitcherLink,
  Title,
  Menu,
  Wrapper,
} from "../components/auth-components";
import { SignInRequestDto } from "../apis/request/auth";
import { SNS_SIGN_IN_URL, signInRequest } from "../apis";
import { SignInResponseDto } from "../apis/response/auth";
import { ResponseDto } from "../apis/response";
import { useCookies } from "react-cookie";

const Div2 = styled.div`
  display: flex;
  margin: 0 0 60px;
  width: 100%;
  justify-content: space-between;
`;

const CheckBox = styled.input`
  display: none;
`;

const Label = styled.label<{ isChecked: boolean }>`
  cursor: pointer;
  margin: 0 8px;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background-color: ${(props) => (props.isChecked ? "#f89e86" : "#252932")};
  display: inline-block;
  position: relative;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    background-image: url(${(props) => (props.isChecked ? checkWhite : check)});
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Span = styled.span`
  flex: 1;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
`;

const FindAccount = styled.a`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  text-decoration: none;
  color: #9ea3b2;
`;

const Switcher = styled(OriginalSwitcher)`
  margin: 178px 0 0;
`;

export default function Login() {
  const MAIN_PATH = () => "/";
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [cookies, setCookies] = useCookies();

  const goBack = () => {
    navigate(-1); // 뒤로 가는 동작을 수행
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // sign in response 처리 함수
  const signInResponse = (
    responseBody: SignInResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) {
      setError("네트워크 이상입니다.");
      return;
    }
    const { code } = responseBody;

    if (code === "DBE") setError("데이터베이스 오류입니다.");
    if (code === "SF" || code === "VF") setError("정보가 일치하지 않습니다");

    if (code !== "SU") {
      setLoading(false);
      return;
    }

    const { token, expirationTime } = responseBody as SignInResponseDto;
    const now = new Date().getTime();
    const expires = new Date(now + expirationTime * 1000);

    setCookies("accessToken", token, { expires, path: "MAIN_PATH()" });
    navigate(MAIN_PATH());
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return; // 미입력 방지
    try {
      setLoading(true);
      const requestBody: SignInRequestDto = { email, password };
      signInRequest(requestBody).then(signInResponse);
    } catch (e: any) {
      setError("정보가 일치하지 않습니다");
    }
    // setChecked(false); // 체크 초기화
  };

  const onSnsSignInButtonClickHandler = (type: "kakao" | "naver") => {
    window.location.href = SNS_SIGN_IN_URL(type);
  };

  return (
    <Wrapper>
      <Menu>
        <Back src={back} alt="뒤로가기" onClick={goBack} />
        <Title>로그인</Title>
      </Menu>
      <Form onSubmit={onSubmit}>
        <Div>이메일</Div>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="이메일을 입력해 주세요"
          type="email"
          required
          hasValue={email.length > 0}
        />
        <Div>비밀번호</Div>
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="비밀번호를 입력해 주세요"
          type="password"
          required
          hasValue={password.length > 0}
        />
        <Input type="submit" value="로그인" hasValue={false} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <CheckBox
        type="checkbox"
        id="checkbox"
        checked={isChecked}
        onChange={(e) => setChecked(e.target.checked)} // 체크박스가 변경될 때 상태 업데이트
      />
      <Div2>
        <Label htmlFor="checkbox" isChecked={isChecked}></Label>
        <Span>아이디 저장</Span>
        <FindAccount href="/">아이디/비밀번호 찾기</FindAccount>
      </Div2>
      <SocialLoginBox>
        <SocialLogin onClick={() => onSnsSignInButtonClickHandler("kakao")}>
          <img src={kakaoLogo} alt="kakao" />
        </SocialLogin>
        <SocialLogin onClick={() => onSnsSignInButtonClickHandler("naver")}>
          <img src={naverLogo} alt="naver" />
        </SocialLogin>
        <SocialLogin>
          <img src={googleLogo} alt="Google" />
        </SocialLogin>
      </SocialLoginBox>
      <Switcher>
        아직 회원이 아니신가요?
        <SwitcherLink to="/join">회원가입</SwitcherLink>
      </Switcher>
    </Wrapper>
  );
}
