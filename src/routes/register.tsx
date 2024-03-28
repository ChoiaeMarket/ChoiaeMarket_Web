import { useState } from "react";
import styled from "styled-components";
import back from "../assets/icon/back.png";
import profile from "../assets/icon/profile.png";
import edit from "../assets/icon/edit.png";
import { useNavigate } from "react-router-dom";
import { Wrapper, Error, Back, Title } from "../components/auth-comonents";

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

const ProfileImage = styled.img.attrs({
  src: profile, // 이미지 소스 설정
  alt: "프로필 이미지", // 대체 텍스트 설정
})`
  width: 120px;
  height: 120px;
  border-radius: 50%;
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
    width: 159px;
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

const HomeButton = styled.a`
  width: 159px;
  height: 60px;
  margin: 12px 0 48px;
  border-radius: 16px;
  padding: 18px;
  font-weight: 600;
  font-size: 18px;
  line-height: 34px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  background-color: #252932;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #21242d;
  }
`;

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [gender, setGender] = useState("female");
  const [error, setError] = useState("");
  const goBack = () => {
    window.history.back(); // 뒤로 가는 동작을 수행
  };
  // EditIcon 클릭 시 이벤트 핸들러 추가
  const handleEditClick = () => {
    // 여기에 드라이브를 열어 이미지를 선택할 수 있는 이벤트 연결
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "nickname") {
      setNickname(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "tel") {
      setTel(value);
    } else if (name === "gender") {
      setGender(value);
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || tel === "") return; // 미입력 방지
    try {
      // props.abc.value; // 강제 에러 발생
      // 계정 생성
      // 유저 이름 생성
      // 메인 리디렉션
      navigate("/");
    } catch (e: any) {
      console.log("register: ", e.message);
      setError("다른 이메일을 입력해 주세요");
    }
    console.log("register: ", name, nickname, email, tel, gender);
  };
  return (
    <Wrapper>
      <TitleBox>
        <Back src={back} alt="뒤로가기" onClick={goBack} />
        <Title>프로필 설정</Title>
      </TitleBox>
      <ProfileBox>
        <ProfileImage />
        <EditIcon onClick={handleEditClick} />
      </ProfileBox>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="이름을 입력해 주세요"
          type="text"
          required
          hasValue={name.length > 0}
        />
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
          name="email"
          value={email}
          placeholder="이메일을 입력해 주세요"
          type="email"
          required
          hasValue={email.length > 0}
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
        <GenderBox>
          <input
            type="radio"
            name="gender"
            value="female"
            id="female"
            onChange={onChange}
            style={{ display: "none" }}
          />
          <Gender
            htmlFor="female"
            onClick={() => setGender("female")}
            isFemale
            isSelected={gender === "female"}
          >
            여성
          </Gender>
          <input
            type="radio"
            name="gender"
            value="male"
            id="male"
            onChange={onChange}
            style={{ display: "none" }}
          />
          <Gender
            htmlFor="male"
            onClick={() => setGender("male")}
            isMale
            isSelected={gender === "male"}
          >
            남성
          </Gender>
        </GenderBox>
        <InputBox>
          <HomeButton href="/">다음에</HomeButton>
          <Input type="submit" value="입력완료" hasValue={false} />
        </InputBox>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}
