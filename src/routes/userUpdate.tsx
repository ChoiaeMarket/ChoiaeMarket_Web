import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fileUploadRequest } from "../apis";
import { ResponseDto } from "../apis/response";
import { SignUpResponseDto } from "../apis/response/auth";
import back from "../assets/icon/back.png";
import edit from "../assets/icon/edit.png";
import profile from "../assets/icon/profile.png";
import { Back, Error, Title, Wrapper } from "../components/auth-components";
import useLoginUserStore from "../stores/login-user.store";

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProfileBox = styled.div`
  margin-top: 40px;
  position: relative;
`;

const ProfileImage = styled.div<{ src: string | null }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

const EditIcon = styled.img.attrs({
  src: edit, // 이미지 소스 설정
  alt: "프로필 이미지 편집", // 대체 텍스트 설정
})`
  position: absolute;
  right: 6px;
  bottom: 6px;
  cursor: pointer;
`;

const Form = styled.form`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  & > div > input[type="submit"] {
    /* width: 159px; */
    margin: 8px 0 48px;
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

const InputConst = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid #252932;
  border-radius: 16px;
  padding: 19px;
  margin: 8px 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: #ffffff;
  background-color: #252932;
`;

const Input = styled.input<{ hasValue: boolean }>`
  width: 100%;
  height: 60px;
  border: 1px solid #252932;
  border-radius: 16px;
  padding: 19px;
  margin: 8px 0;
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

const GenderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Gender = styled.label<{
  isFemale?: boolean;
  isMale?: boolean;
  isSelected: boolean;
}>`
  width: 50%;
  height: 60px;
  border: 1px solid #252932;
  border-radius: ${(props) =>
    props.isFemale ? "16px 0 0 16px" : props.isMale ? "0 16px 16px 0" : "16px"};
  padding: 19px;
  margin: 8px 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: ${(props) => (props.isSelected ? "#ffffff" : "#777c89")};
  background-color: #252932;
  box-shadow: ${(props) =>
    props.isSelected ? "0 0 0 1px #9ea3b2 inset" : "none"};
  cursor: pointer;
  text-align: center;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function UserUpdate() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>("");
  const [nickname, setNickname] = useState("");
  const [tel, setTel] = useState("");
  const [isNicknameChange, setNicknameChange] = useState<boolean>(false); // 닉네임 변경 여부
  const [changeNickname, setChangeNickname] = useState<string>(""); // 변경 닉네임 상태
  const fileInputRef = useRef<HTMLInputElement>(null); // 사진 추가 이벤트
  const agreedPersonal = true;
  const [error, setError] = useState("");
  const { loginUser } = useLoginUserStore();

  useEffect(() => {
    setName(loginUser!.name);
    setEmail(loginUser!.email);
    setNickname(loginUser!.nickname);
    setProfileImage(loginUser!.profileImage);
    setTel(loginUser!.tel);
  }, []);

  const goBack = () => {
    window.history.back(); // 뒤로 가는 동작을 수행
  };

  // EditIcon 사진 추가 이벤트
  const handleImageBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // handleFileChange 함수에서 URL 생성 및 상태 업데이트
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const data = new FormData();
      data.append("file", selectedFile);

      const url = await fileUploadRequest(data);
      setProfileImage(url!);
      console.log(url);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    // if (name === "name") {
    //   setName(value);
    // } else if (name === "email") {
    //   setEmail(value);
    if (name === "nickname") {
      setNickname(value);
    } else if (name === "tel") {
      setTel(value);
    }
  };

  // sign up response 처리 함수
  const signUpResponse = (
    responseBody: SignUpResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) {
      setError("네트워크 이상입니다.");
      return;
    }
    const { code } = responseBody;
    if (code === "DBE") {
      setError("데이터베이스 오류입니다.");
      console.log(code);
    }
    if (code === "SF" || code === "VF") {
      setError("정보가 일치하지 않습니다");
      console.log(code);
    }
    if (code !== "SU") {
      setLoading(false);
      return;
    }

    navigate(`/user/${loginUser!.email}`);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || tel === "") return; // 미입력 방지
    console.log("update: ", nickname, tel, profileImage);
  };

  return (
    <Wrapper>
      <TitleBox>
        <Back src={back} alt="뒤로가기" onClick={goBack} />
        <Title>프로필 수정</Title>
      </TitleBox>
      <ProfileBox>
        <ProfileImage src={profileImage} />
        <EditIcon onClick={handleImageBoxClick} />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </ProfileBox>
      <Form onSubmit={onSubmit}>
        <InputConst>{name}</InputConst>
        <InputConst>{email}</InputConst>
        <Input
          onChange={onChange}
          name="nickname"
          value={nickname}
          placeholder="프로필명을 입력해 주세요"
          type="text"
          required
          hasValue={nickname.length > 0}
        />
        <Input
          onChange={onChange}
          name="tel"
          value={tel}
          placeholder="전화번호를 입력해 주세요"
          type="tel"
          required
          hasValue={tel.length > 0}
        />
        <InputBox>
          <Input type="submit" value="저장하기" hasValue={false} />
        </InputBox>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}
