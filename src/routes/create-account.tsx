import { useState } from "react";
import styled from "styled-components";
import back from "../assets/icon/back.png";
import kakaoLogo from "../assets/icon/kakao.png";
import naverLogo from "../assets/icon/naver.png";
import googleLogo from "../assets/icon/google.png";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 326px;
  margin: 44px 0px 50px;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Back = styled.img`
  width: 28px;
  height: 28px;
  position: absolute;
  left: 0;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
  height: 100%;
  font-weight: 600;
  font-size: 20px;
  line-height: 56px;
  letter-spacing: -0.025em;
`;

const Form = styled.form`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  & > input[type="submit"] {
    margin: 12px 0 48px;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.025em;
    background-color: #f89e86;
    color: #ffffff;
    transition: background-color 0.2s;
    cursor: pointer;
    &:hover {
      background-color: #f9b19e;
      /* opacity: 0.8; */
    }
  }
`;

const Div = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
`;

const Input = styled.input`
  width: 100%;
  height: 60px;
  border-radius: 16px;
  padding: 19px;
  margin: 8px 0 20px;
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  background-color: #252932;
  &::placeholder {
    color: #777c89;
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

const SocialLoginBox = styled.div`
  display: flex;
  width: 264px;
  justify-content: space-between;
`;

const SocialLogin = styled.div`
  width: 80px;
  height: 60px;
  border-radius: 16px;
  border: solid 1px #35383f;
  background-color: #1f222a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #3b3f4a;
  }
  & img {
    width: 24px;
    height: 24px;
  }
`;

const LoginBox = styled.div`
  margin: 138px 0 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
`;

const Login = styled.a`
  padding-left: 12px;
  font-weight: 600;
  text-decoration: underline;
  color: #f89e86;
  cursor: pointer;
`;

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const goBack = () => {
    window.history.back(); // 뒤로 가는 동작을 수행
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
    // 계정 생성

    // 유저 이름 생성

    // 메인 리디렉션
    console.log(name, email, password);
  };
  return (
    <Wrapper>
      <TitleBox>
        <Back src={back} alt="뒤로가기" onClick={goBack} />
        <Title>가입하기</Title>
      </TitleBox>
      <Form onSubmit={onSubmit}>
        <Div>이름</Div>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="이름을 입력해 주세요"
          type="text"
          required
        />
        <Div>이메일</Div>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="이메일을 입력해 주세요"
          type="email"
          required
        />
        <Div>비밀번호</Div>
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="비밀번호를 입력해 주세요"
          type="password"
          required
        />
        <Input type="submit" value="회원가입" />
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
      <LoginBox>
        이미 계정이 있으신가요?
        <Login href="/login">로그인</Login>
      </LoginBox>
    </Wrapper>
  );
}
