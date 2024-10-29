import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { emailCertificationRequest } from "../apis";
import { EmailCertificationRequestDto } from "../apis/request/auth";
import { ResponseDto } from "../apis/response";
import { EmailCertificationResponseDto } from "../apis/response/auth";
import back from "../assets/icon/back.png";
import googleLogo from "../assets/icon/google.png";
import kakaoLogo from "../assets/icon/kakao.png";
import naverLogo from "../assets/icon/naver.png";
import {
  Back,
  Div,
  Error,
  Form,
  Input,
  Menu,
  SocialLogin,
  SocialLoginBox,
  Switcher,
  SwitcherLink,
  Title,
  Wrapper,
} from "../components/auth-components";
import { ResponseCode } from "../types/enum";

const DivBox = styled(Div)`
  margin-top: 24px;
`;

const EmailInput = styled(Input)``;

const EmailInputButton = styled(Input)``;

const EmailInputBox = styled.div``;

const Form2 = styled(Form)``;

export default function Join() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [certificationNumber, setCertificationNumber] = useState("");
  const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
  const [emailMessage, setEmailMessage] = useState<String>("");
  const [emailError, setEmailError] = useState<boolean>(true);
  const [error, setError] = useState("");
  const goBack = () => {
    navigate(-1); // 뒤로 가는 동작을 수행
  };

  const emailCertificationResponse = (
    responseBody: EmailCertificationResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;

    if (code === ResponseCode.VALIDATION_FALIED) alert("이메일을 입력하세요.");
    if (code === ResponseCode.MAIL_FAIL) alert("이메일 전송에 실패했습니다.");
    if (code === ResponseCode.DATABASE_ERROR) alert("데이터베이스 오류입니다.");
    if (code !== ResponseCode.SUCCESS) return;

    setEmailError(false);
    setEmailMessage("인증번호가 전송되었습니다.");
    console.log(emailMessage);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "certificationNumber") {
      setCertificationNumber(value);
    }
  };

  const onEmailButtonHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "") return; // 미입력 방지
    const checkedEmail = emailPattern.test(email);
    if (!checkedEmail) {
      console.log("6");
      setEmailError(true);
      setEmailMessage("이메일 형식이 아닙니다.");
      return;
    }
    const requestBody: EmailCertificationRequestDto = { email };
    emailCertificationRequest(requestBody).then(emailCertificationResponse);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || certificationNumber === "") return; // 미입력 방지
    try {
      navigate("/register", { state: { email } });
    } catch (e: any) {
      console.log("join: ", e.message);
      setError("다른 이메일을 입력해 주세요");
    }
    console.log("join: ", email, certificationNumber);
  };

  return (
    <Wrapper>
      <Menu>
        <Back src={back} alt="뒤로가기" onClick={goBack} />
        <Title>가입하기</Title>
      </Menu>
      <DivBox>SNS 회원가입</DivBox>
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
      <Form onSubmit={onEmailButtonHandler}>
        <Div>이메일</Div>
        <EmailInputBox>
          <EmailInput
            onChange={onChange}
            name="email"
            value={email}
            placeholder="이메일을 입력해주세요"
            type="email"
            required
            hasValue={email.length > 0}
          />
          <EmailInputButton
            type="submit"
            value="이메일 인증"
            hasValue={false}
          />
        </EmailInputBox>
      </Form>
      <Form2 onSubmit={onSubmit}>
        <Div>인증번호</Div>
        <Input
          onChange={onChange}
          name="certificationNumber"
          value={certificationNumber}
          placeholder="인증번호 4자리를 입력해주세요"
          type="certificationNumber"
          required
          hasValue={certificationNumber.length > 0}
        />
        <Input type="submit" value="인증 확인" hasValue={false} />
      </Form2>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        이미 계정이 있으신가요?
        <SwitcherLink to="/login">로그인</SwitcherLink>
      </Switcher>
    </Wrapper>
  );
}
