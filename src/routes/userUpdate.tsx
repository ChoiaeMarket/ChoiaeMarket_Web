import {
  PatchNicknameRequestDto,
  PatchProfileImageRequestDto,
} from "apis/request/user";
import { ResponseDto } from "apis/response";
import {
  GetSignInUserResponseDto,
  PatchNicknameResponseDto,
  PatchProfileImageResponseDto,
} from "apis/response/user";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  fileUploadRequest,
  getSignInUserRequest,
  patchNicknameRequest,
  patchProfileImageRequest,
} from "../apis";
import back from "../assets/icon/back.png";
import edit from "../assets/icon/edit.png";
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

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function UserUpdate() {
  const { userEmail } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>("");
  const [nickname, setNickname] = useState("");
  const [changedNickname, setChangedNickname] = useState("");
  const [tel, setTel] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null); // 사진 추가 이벤트
  const [error, setError] = useState("");
  const { loginUser, resetLoginUser } = useLoginUserStore();
  const [cookies, setCookie] = useCookies();

  // get sign in user response 처리함수
  const getSignInUserResponse = (
    responseBody: GetSignInUserResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) {
      return;
    }
    const { code } = responseBody;
    if (code === "NU") {
      alert("존재하지 않는 유저입니다.");
      console.log(code);
    }
    if (code === "AF") {
      alert("인증에 실패했습니다.");
      console.log(code);
    }
    if (code === "DBE") {
      alert("데이터베이스 오류입니다.");
      console.log(code);
    }
    if (code !== "SU") {
      navigate("/");
      return;
    }

    const { email, name, nickname, tel, profileImage } =
      responseBody as GetSignInUserResponseDto;
    setEmail(email);
    setName(name);
    setNickname(nickname);
    setChangedNickname(nickname);
    setTel(tel);
    setProfileImage(profileImage);
  };

  useEffect(() => {
    if (!userEmail) return;
    if (userEmail !== loginUser?.email) {
      navigate("/");
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, [userEmail]);

  const goBack = () => {
    window.history.back(); // 뒤로 가는 동작을 수행
  };

  // patch nickname response 처리 함수
  const patchNicknameResponse = (
    responseBody: PatchNicknameResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) {
      return;
    }
    if (changedNickname !== nickname) {
      const { code } = responseBody;
      if (code === "VF") {
        alert("닉네임은 필수입니다.");
        console.log(code);
      }
      if (code === "AF") {
        alert("인증에 실패했습니다.");
        console.log(code);
      }
      if (code === "DN") {
        alert("중복되는 닉네임입니다.");
        console.log(code);
      }
      if (code === "NU") {
        alert("존재하지 않는 유저입니다.");
        console.log(code);
      }
      if (code === "DBE") {
        alert("데이터베이스 오류입니다.");
        console.log(code);
      }
      if (code !== "SU") {
        return;
      }
    }
    navigate(`/user/${email}`);
  };

  // EditIcon 사진 추가 이벤트
  const handleImageBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // file upload response 처리 함수
  const fileUploadResponse = (profileImage: string | null) => {
    if (!profileImage) return;
    if (!cookies.accessToken) return;

    const requestBody: PatchProfileImageRequestDto = { profileImage };
    patchProfileImageRequest(requestBody, cookies.accessToken).then(
      patchProfileImageResponse
    );
  };

  // patch profile image response 처리 함수
  const patchProfileImageResponse = (
    responseBody: PatchProfileImageResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "AF") {
      alert("인증에 실패했습니다.");
      console.log(code);
    }
    if (code === "NU") {
      alert("존재하지 않는 유저입니다.");
      console.log(code);
    }
    if (code === "DBE") {
      alert("데이터베이스 오류입니다.");
      console.log(code);
    }
    if (code !== "SU") {
      return;
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
      setChangedNickname(value);
    } else if (name === "tel") {
      setTel(value);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || tel === "") return; // 미입력 방지
    if (!cookies.accessToken) return;
    // 사진 변경
    fileUploadResponse(profileImage);
    // 닉네임 변경
    const requestBody: PatchNicknameRequestDto = {
      nickname: changedNickname,
    };
    patchNicknameRequest(requestBody, cookies.accessToken).then(
      patchNicknameResponse
    );
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
          value={changedNickname}
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
