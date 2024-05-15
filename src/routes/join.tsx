import { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../assets/icon/back.png";
import kakaoLogo from "../assets/icon/kakao.png";
import naverLogo from "../assets/icon/naver.png";
import googleLogo from "../assets/icon/google.png";
import {
  Back,
  Div,
  Error,
  Form,
  Input,
  SocialLogin,
  SocialLoginBox,
  Switcher,
  SwitcherLink,
  Title,
  Menu,
  Wrapper,
} from "../components/auth-comonents";

export default function Join() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const goBack = () => {
    navigate(-1); // 뒤로 가는 동작을 수행
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return; // 미입력 방지
    try {
      // props.abc.value; // 강제 에러 발생
      // 계정 생성
      // 유저 이름 생성
      // 메인 리디렉션
      navigate("/register", { state: { name, email, password } });
    } catch (e: any) {
      console.log("join: ", e.message);
      setError("다른 이메일을 입력해 주세요");
    }
    console.log("join: ", name, email, password);
  };
  return (
    <Wrapper>
      <Menu>
        <Back src={back} alt="뒤로가기" onClick={goBack} />
        <Title>가입하기</Title>
      </Menu>
      <Form onSubmit={onSubmit}>
        <Div>이름</Div>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="이름을 입력해 주세요"
          type="text"
          required
          hasValue={name.length > 0}
        />
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
        <Input type="submit" value="회원가입" hasValue={false} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <SocialLoginBox>
        <SocialLogin>
          <img src={kakaoLogo} alt="Kakao" />
        </SocialLogin>
        <SocialLogin>
          <img src={naverLogo} alt="Naver" />
        </SocialLogin>
        <SocialLogin>
          <img src={googleLogo} alt="Google" />
        </SocialLogin>
      </SocialLoginBox>
      <Switcher>
        이미 계정이 있으신가요?
        <SwitcherLink to="/login">로그인</SwitcherLink>
      </Switcher>
    </Wrapper>
  );
}
