import { useState } from "react";
import styled from "styled-components";
import back from "../assets/icon/back.png";
import check from "../assets/icon/check.png";
import checkWhite from "../assets/icon/checkWhite.png";
import kakaoLogo from "../assets/icon/kakaoColor.png";
import naverLogo from "../assets/icon/naverColor.png";
import googleLogo from "../assets/icon/googleColor.png";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 326px;
  padding: 44px 0px 50px;
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
    box-shadow: 0 0 0 1px #252932;
    background-color: #f89e86;
    color: #ffffff;
    transition: background-color 0.2s;
    cursor: pointer;
    &:hover {
      background-color: #f9b19e;
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

const Input = styled.input<{ hasValue: boolean }>`
  width: 100%;
  height: 60px;
  border: 1px solid #252932;
  border-radius: 16px;
  padding: 19px;
  margin: 8px 0 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: #ffffff;
  box-shadow: ${(props) =>
    props.hasValue ? " 0 0 0 1px #9ea3b2" : " 0 0 0 1px #252932"};
  background-color: #252932;
  outline: none;
  &::placeholder {
    color: #777c89;
  }
  &:focus {
    box-shadow: 0 0 0 1px #f89e86;
    background-color: rgba(248, 158, 134, 0.1);
  }
  /* 자동완성이 될 때 배경색 변경 */
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #252932 inset, 0 0 0 1px #9ea3b2;
    -webkit-text-fill-color: #ffffff !important;
    caret-color: #ffffff !important;
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

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

const JoinBox = styled.div`
  margin: 178px 0 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
`;

const Join = styled.a`
  padding-left: 12px;
  font-weight: 600;
  text-decoration: underline;
  color: #f89e86;
  cursor: pointer;
`;

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setChecked] = useState(false);
  const goBack = () => {
    window.history.back(); // 뒤로 가는 동작을 수행
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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 계정 생성

    // 유저 이름 생성

    // 메인 리디렉션
    console.log(email, password, isChecked);

    // setChecked(false); // 체크 초기화
  };
  return (
    <Wrapper>
      <TitleBox>
        <Back src={back} alt="뒤로가기" onClick={goBack} />
        <Title>로그인</Title>
      </TitleBox>
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
      <JoinBox>
        아직 회원이 아니신가요?
        <Join href="/join">회원가입</Join>
      </JoinBox>
    </Wrapper>
  );
}
