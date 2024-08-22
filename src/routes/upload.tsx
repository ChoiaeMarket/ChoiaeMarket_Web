import styled from "styled-components";
import logo from "../assets/logo/logoWhite.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import idolList from "../components/idolList";
import { fileUploadRequest, postBoardRequest } from "../apis";
import { PostBoardRequestDto } from "../apis/request/board";
import { PostBoardResponseDto } from "../apis/response/board";
import { ResponseDto } from "../apis/response";

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

const ImageBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
`;

const ImageBox = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: ${(props) => (props.active ? "#252932" : "#181a20")};
  border-radius: 16px;
  color: #777c89;
  cursor: pointer;
`;

const Overlay = styled.div<{ onClick: () => void }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  color: #f89e86;
  font-size: 30px;
  cursor: pointer;
`;

const ImageBoxWithOverlay = styled(ImageBox)`
  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const CountWrapper = styled.span``;

const Count = styled.span`
  color: #f89e86;
`;

const H1 = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.025em;
  margin: 0 0 10px;
`;

const DropdownButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

const DropdownButton = styled.div<{ hasValue: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  border: 1px solid #252932;
  border-radius: 16px;
  padding: 19px;
  margin: 0 0 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: ${(props) =>
    props.hasValue === "아이돌" ||
    props.hasValue === "카테고리" ||
    props.hasValue === "상품명"
      ? "#777c89"
      : "#ffffff"};
  box-shadow: ${(props) =>
    props.hasValue === "아이돌" ||
    props.hasValue === "카테고리" ||
    props.hasValue === "상품명"
      ? "0 0 0 1px #252932"
      : "0 0 0 1px #9ea3b2"};
  background-color: #252932;
  outline: none;
  cursor: pointer;
`;

// isOpen 속성이 없는 HTMLDivElement에 대해 props 정의
interface DropdownContentProps {
  isOpen?: boolean;
}

const DropdownBackground = styled.div<DropdownContentProps>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  width: 390px;
  height: inherit;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DropdownContent = styled.div<DropdownContentProps>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  bottom: 0;
  width: 390px;
  border-radius: 12px 12px 0 0;
  background-color: #f9f9f9;
  z-index: 2;
`;

const Dropdown = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 68px;
  letter-spacing: -0.025em;
  color: black;
  border-bottom: 1px solid #dfdfdf;
  border-radius: 12px 12px 0 0;
  text-align: center;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const IdolBox = styled.div`
  width: 326px;
  height: 550px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0 19px;
  margin: 12px 32px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const IdolItem = styled.div`
  width: 50px;
  margin: 12px 0;
  text-align: center;
  cursor: pointer;
`;

const IdolLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const IdolName = styled.div`
  width: 50px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.025em;
  margin-top: 8px;
  color: black;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > div > input[type="submit"] {
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
  margin: 0 0 20px;
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

const TextArea = styled.textarea<{ hasValue: boolean }>`
  width: 100%;
  min-height: 150px;
  border: 1px solid #252932;
  border-radius: 16px;
  padding: 19px;
  margin: 0 0 20px;
  font-family: inherit;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: #ffffff;
  box-shadow: ${(props) =>
    props.hasValue ? "0 0 0 1px #9ea3b2" : "0 0 0 1px #252932"};
  background-color: #252932;
  outline: none;
  resize: none;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
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

const InputBox = styled.div``;

export default function Upload() {
  const MAIN_PATH = () => "/";
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [boardImageList, setBoardImageList] = useState<string[]>([]);
  const [imageCount, setImageCount] = useState(0);
  const [idol, setIdol] = useState("아이돌");
  const [type, setType] = useState("카테고리");
  const [name, setName] = useState("상품명");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [isOpenIdol, setIsOpenIdol] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);
  const [isOpenName, setIsOpenName] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // 사진 추가 이벤트
  const textAreaRef = useRef<HTMLTextAreaElement>(null); // 상세내용 칸 높이를 자동 조정
  const [cookies, setCookies] = useCookies();
  const accessToken = cookies.accessToken;

  const handleSearch = () => {
    navigate("/search");
  };

  // 상세내용 칸 높이를 자동 조정
  const handleResizeHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleResizeHeight();
  }, [content]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
      handleResizeHeight();
    } else if (name === "price") {
      setPrice(value);
    }
  };

  // idol 값이 변경될때 마다 name 값이 "상품명"으로 초기화
  useEffect(() => {
    setName("상품명");
  }, [idol]);

  // 사진 추가 이벤트
  const handleImageBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      if (imageCount >= 4) {
        alert("최대 4장까지 이미지를 선택할 수 있습니다.");
        return;
      }

      const selectedFile = event.target.files[0];
      const data = new FormData();
      data.append("file", selectedFile);

      const url = await fileUploadRequest(data);
      if (url) {
        setBoardImageList((prevUrls) => [...prevUrls, url]);
        setImageCount((prevCount) => prevCount + 1);
      }
      console.log(url);
    }
  };

  const handleDeleteImage = (index: number) => {
    setBoardImageList((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImageCount((prevCount) => prevCount - 1);
  };

  // post board response 처리 함수
  const postBoardResponse = (
    responseBody: PostBoardResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) {
      setError("네트워크 이상입니다.");
      return;
    }
    const { code } = responseBody;
    if (code === "DBE") {
      alert("데이터베이스 오류입니다.");
      console.log(code);
    }
    if (code === "AF" || code === "NU") {
      navigate(MAIN_PATH());
      console.log(code);
    }
    if (code === "VF") {
      alert("제목과 내용은 필수입니다.");
    }
    if (code !== "SU") {
      return;
    }

    navigate(`/idol/${idol}/${name}`); // 상품 페이지로 이동
  };

  // price를 Int로 변환
  const priceAsNumber = parseInt(price);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (
      isLoading ||
      idol === "아이돌" ||
      type === "카테고리" ||
      name === "상품명" ||
      title === "" ||
      content === "" ||
      price === ""
    )
      return; // 미입력 방지
    try {
      // props.abc.value; // 강제 에러 발생
      const requestBody: PostBoardRequestDto = {
        idol,
        type,
        name,
        boardImageList,
        title,
        content,
        price: priceAsNumber,
      };
      postBoardRequest(requestBody, accessToken).then(postBoardResponse);
      // 유저 이름 생성
      // 메인 리디렉션
      // navigate("/");
    } catch (e: any) {
      console.log("upload: ", e.message);
      setError("다른 값을 입력해 주세요");
    }
    console.log(
      "upload: ",
      idol,
      type,
      name,
      title,
      content,
      price,
      boardImageList
    );
  };

  // idol 드롭다운 메뉴 open 유무 토글
  const toggleDropdownIdol = () => {
    setIsOpenIdol(!isOpenIdol);
  };

  // type 드롭다운 메뉴 open 유무 토글
  const toggleDropdownType = () => {
    setIsOpenType(!isOpenType);
  };

  // name 드롭다운 메뉴 open 유무 토글
  const toggleDropdownName = () => {
    setIsOpenName(!isOpenName);
  };

  // idol 드론다운 하위 메뉴 선택시 함수
  const handleSortClickIdol = (sort: string) => {
    setIdol(sort); // 선택 값 저장
    setIsOpenIdol(false); // 드롭다운 닫기
  };

  // type 드론다운 하위 메뉴 선택시 함수
  const handleSortClickType = (sort: string) => {
    setType(sort); // 선택 값 저장
    setIsOpenType(false); // 드롭다운 닫기
  };

  // name 드론다운 하위 메뉴 선택시 함수
  const handleSortClickName = (sort: string) => {
    setName(sort); // 선택 값 저장
    setIsOpenName(false); // 드롭다운 닫기
  };

  return (
    <Wrapper>
      {" "}
      <Menu>
        <MenuItem>
          <Logo src={logo} alt="로고" />
          <Title>상품 등록</Title>
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
      <H1>상품 사진</H1>
      <ImageBoxWrapper>
        {[...Array(5)].map((_, index) => (
          <ImageBoxWithOverlay
            key={index}
            active={index < imageCount + 1}
            onClick={index === 0 ? handleImageBoxClick : undefined} // 0번째 인덱스에만 클릭 이벤트 추가
          >
            {index === 0 && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="1"
                    y="6"
                    width="22"
                    height="16"
                    rx="3"
                    stroke="#777C89"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="14"
                    r="4"
                    stroke="#777C89"
                    strokeWidth="2"
                  />
                  <path
                    d="M7 5C7 3.34315 8.34315 2 10 2L14 2C15.6569 2 17 3.34315 17 5V6L7 6V5Z"
                    stroke="#777C89"
                    strokeWidth="2"
                  />
                </svg>
                <CountWrapper>
                  <Count>{imageCount}</Count>
                  /4
                </CountWrapper>
              </>
            )}
            {index > 0 && index <= imageCount && boardImageList[index - 1] && (
              <>
                <img
                  src={boardImageList[index - 1]}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "16px",
                    objectFit: "cover",
                  }}
                />
                <Overlay onClick={() => handleDeleteImage(index - 1)}>
                  <DeleteButton>✕</DeleteButton>
                </Overlay>
              </>
            )}
          </ImageBoxWithOverlay>
        ))}
      </ImageBoxWrapper>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <H1>상품 분류</H1>
      <DropdownButtonWrapper>
        <DropdownButton onClick={toggleDropdownIdol} hasValue={idol}>
          {idol}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
          >
            <g clip-path="url(#clip0_18_387)">
              <path
                d="M14 3C12.4379 4.5621 11.5621 5.4379 10 7L6 3"
                stroke="#777c89"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_18_387">
                <rect
                  width="10"
                  height="20"
                  fill="white"
                  transform="translate(0 10) rotate(-90)"
                />
              </clipPath>
            </defs>
          </svg>
        </DropdownButton>
        <DropdownButton onClick={toggleDropdownType} hasValue={type}>
          {type}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
          >
            <g clip-path="url(#clip0_18_387)">
              <path
                d="M14 3C12.4379 4.5621 11.5621 5.4379 10 7L6 3"
                stroke="#777c89"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_18_387">
                <rect
                  width="10"
                  height="20"
                  fill="white"
                  transform="translate(0 10) rotate(-90)"
                />
              </clipPath>
            </defs>
          </svg>
        </DropdownButton>
      </DropdownButtonWrapper>
      <DropdownButton onClick={toggleDropdownName} hasValue={name}>
        {name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="10"
          viewBox="0 0 20 10"
          fill="none"
        >
          <g clip-path="url(#clip0_18_387)">
            <path
              d="M14 3C12.4379 4.5621 11.5621 5.4379 10 7L6 3"
              stroke="#777c89"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_18_387">
              <rect
                width="10"
                height="20"
                fill="white"
                transform="translate(0 10) rotate(-90)"
              />
            </clipPath>
          </defs>
        </svg>
      </DropdownButton>
      <DropdownBackground isOpen={isOpenIdol} />
      <DropdownContent isOpen={isOpenIdol}>
        <IdolBox>
          {idolList.map(({ src, name }) => (
            <IdolItem key={src} onClick={() => handleSortClickIdol(name)}>
              <IdolLogo
                src={`src/assets/idol/logo/${src}.png`}
                alt={name}
                onError={(e) => {
                  (
                    e.target as HTMLImageElement
                  ).src = `src/assets/idol/logo/default.png`; // 대체 이미지 설정
                }}
              />
              <IdolName>{name}</IdolName>
            </IdolItem>
          ))}
        </IdolBox>
      </DropdownContent>
      <DropdownBackground isOpen={isOpenType} />
      <DropdownContent isOpen={isOpenType}>
        <Dropdown onClick={() => handleSortClickType("앨범")}>앨범</Dropdown>
        <Dropdown onClick={() => handleSortClickType("콘서트")}>
          콘서트
        </Dropdown>
        <Dropdown onClick={() => handleSortClickType("MD")}>MD</Dropdown>
        <Dropdown onClick={() => handleSortClickType("콜라보")}>
          콜라보
        </Dropdown>
        <Dropdown onClick={() => handleSortClickType("포토북")}>
          포토북
        </Dropdown>
        <Dropdown onClick={() => handleSortClickType("시즌그리팅")}>
          시즌그리팅
        </Dropdown>
        <Dropdown onClick={() => handleSortClickType("팬클럽")}>
          팬클럽
        </Dropdown>
        <Dropdown onClick={() => handleSortClickType("기타")}>기타</Dropdown>
      </DropdownContent>
      <DropdownBackground isOpen={isOpenName} />
      <DropdownContent isOpen={isOpenName}>
        {type === "MD" && (
          <>
            <Dropdown onClick={() => handleSortClickName("OFFICIAL FANLIGHT")}>
              OFFICIAL FANLIGHT
            </Dropdown>
            <Dropdown
              onClick={() =>
                handleSortClickName("Be There For Me - BALL CAP SET")
              }
            >
              Be There For Me - BALL CAP SET
            </Dropdown>
          </>
        )}
        {type === "시즌그리팅" && (
          <>
            <Dropdown
              onClick={() =>
                handleSortClickName("2024 SEASON'S GREETINGS CLEAR PHOTO CARD")
              }
            >
              2024 SEASON'S GREETINGS CLEAR PHOTO CARD
            </Dropdown>
            <Dropdown
              onClick={() =>
                handleSortClickName(
                  "2024 SEASON'S GREETINGS RANDOM TRADING CARD"
                )
              }
            >
              2024 SEASON'S GREETINGS RANDOM TRADING CARD
            </Dropdown>
          </>
        )}
        <Dropdown onClick={() => handleSortClickName("추가하기")}>
          추가하기
        </Dropdown>
      </DropdownContent>
      <Form onSubmit={onSubmit}>
        <H1>상품 설명</H1>
        <Input
          onChange={onChange}
          name="title"
          value={title}
          placeholder="제목을 입력해 주세요"
          type="text"
          required
          hasValue={title.length > 0}
        />
        <TextArea
          ref={textAreaRef}
          onChange={onChange}
          name="content"
          value={content}
          placeholder="상세 설명을 입력해 주세요"
          required
          hasValue={content.length > 0}
        />
        <Input
          onChange={onChange}
          name="price"
          value={price}
          placeholder="희망가격을 입력해 주세요"
          type="number"
          min="0"
          required
          hasValue={price.length > 0}
        />
        <InputBox>
          <Input type="submit" value="등록하기" hasValue={false} />
        </InputBox>
      </Form>
    </Wrapper>
  );
}
