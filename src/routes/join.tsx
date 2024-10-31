import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  SNS_SIGN_IN_URL,
  checkCertificationRequest,
  emailCertificationRequest,
  emailCheckRequest,
} from "../apis";
import {
  CheckCertificationRequestDto,
  EmailCertificationRequestDto,
} from "../apis/request/auth";
import { ResponseDto } from "../apis/response";
import {
  CheckCertificationResponseDto,
  EmailCertificationResponseDto,
  EmailCheckResponseDto,
} from "../apis/response/auth";
import back from "../assets/icon/back.png";
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

const DivBox = styled(Div)`
  margin-top: 24px;
`;

const EmailInput = styled(Input)`
  ${({ disabled }) =>
    disabled &&
    `
    cursor: default;
  `}
`;

const EmailInputButton = styled(Input)``;

const FormCertification = styled(Form)`
  margin-top: 0;
`;

export default function Join() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [certificationNumber, setCertificationNumber] = useState("");
  const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
  const [emailMessage, setEmailMessage] = useState<String>("");
  const [emailError, setEmailError] = useState<boolean>(true);

  const goBack = () => {
    navigate(-1); // 뒤로 가는 동작을 수행
  };

  const emailCheckResponse = (
    responseBody: EmailCheckResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;

    if (code === "DE") setEmailMessage("중복된 이메일입니다.");
    if (code !== "SU") return;

    setEmailMessage("인증번호 전송중...");
    const requestBody: EmailCertificationRequestDto = { email };
    emailCertificationRequest(requestBody).then(emailCertificationResponse);
  };

  const emailCertificationResponse = (
    responseBody: EmailCertificationResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;

    if (code === "VF") setEmailMessage("이메일을 입력하세요.");
    if (code === "MF") setEmailMessage("이메일 전송에 실패했습니다.");
    if (code === "DBE") setEmailMessage("데이터베이스 오류입니다.");
    if (code !== "SU") return;

    setEmailError(false);
    setEmailMessage("인증번호가 전송되었습니다.");
  };

  const checkCertificationResponse = (
    responseBody: CheckCertificationResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;

    if (code === "VF") setEmailMessage("이메일, 인증번호를 모두 입력하세요.");
    if (code === "CF") setEmailMessage("인증번호가 일치하지 않습니다.");
    if (code === "DBE") setEmailMessage("데이터베이스 오류입니다.");
    if (code !== "SU") return;

    navigate("/register", { state: { email } });
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
    setEmailMessage("");
    if (email === "") return; // 미입력 방지
    const checkedEmail = emailPattern.test(email);
    if (!checkedEmail) {
      setEmailError(true);
      setEmailMessage("이메일 형식이 아닙니다.");
      return;
    }
    emailCheckRequest(email).then(emailCheckResponse);
  };

  const onCertificationButtonHandler = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setEmailMessage("");
    if (email === "" || certificationNumber === "") return; // 미입력 방지

    setEmailMessage("인증번호 확인중...");
    const requestBody: CheckCertificationRequestDto = {
      email,
      certificationNumber,
    };
    checkCertificationRequest(requestBody).then(checkCertificationResponse);
  };

  const onSnsSignInButtonClickHandler = (type: "kakao" | "naver") => {
    window.location.href = SNS_SIGN_IN_URL(type);
  };

  return (
    <Wrapper>
      <Menu>
        <Back src={back} alt="뒤로가기" onClick={goBack} />
        <Title>가입하기</Title>
      </Menu>
      <DivBox>SNS 회원가입</DivBox>
      <SocialLoginBox>
        <SocialLogin onClick={() => onSnsSignInButtonClickHandler("kakao")}>
          <img src={kakaoLogo} alt="kakao" />
        </SocialLogin>
        <SocialLogin onClick={() => onSnsSignInButtonClickHandler("naver")}>
          <img src={naverLogo} alt="naver" />
        </SocialLogin>
      </SocialLoginBox>
      <Form onSubmit={onEmailButtonHandler}>
        <Div>이메일</Div>
        <EmailInput
          onChange={onChange}
          name="email"
          value={email}
          placeholder="이메일을 입력해주세요"
          type="email"
          required
          hasValue={email.length > 0}
          disabled={!emailError} // emailError가 false일 때 입력 불가
        />
        {emailError ? (
          <EmailInputButton
            type="submit"
            value="이메일 인증"
            hasValue={false}
            disabled={!emailError}
          />
        ) : null}
      </Form>
      {emailError ? null : (
        <FormCertification onSubmit={onCertificationButtonHandler}>
          <Div>인증번호</Div>
          <Input
            onChange={onChange}
            name="certificationNumber"
            value={certificationNumber}
            placeholder="인증번호 4자리를 입력해주세요"
            type="text"
            required
            maxLength={4}
            hasValue={certificationNumber.length > 0}
          />
          <Input type="submit" value="인증 확인" hasValue={false} />
        </FormCertification>
      )}
      {emailMessage !== "" ? <Error>{emailMessage}</Error> : null}
      <Switcher>
        이미 계정이 있으신가요?
        <SwitcherLink to="/login">로그인</SwitcherLink>
      </Switcher>
    </Wrapper>
  );
}
