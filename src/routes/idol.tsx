import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 326px;
  padding: 44px 0px 68px;
`;

const CoverImgBox = styled.div`
  width: 390px;
  height: 390px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    backdrop-filter: blur(10px);
  }
`;

const CoverImg = styled.img`
  width: inherit;
  height: inherit;
  object-fit: contain;
  position: relative;
`;

const CoverGradient = styled.div`
  width: inherit;
  height: inherit;
  position: absolute;
  top: 0;
  background: linear-gradient(
    to bottom,
    rgba(24, 26, 32, 0.3) 0%,
    rgba(0, 0, 0, 0) 20%
  );
`;

const Menu = styled.div`
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  position: absolute;
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

const Type = styled.div`
  width: 390px;
  height: 32px;
  border-bottom: 1px solid #626877;
  margin-top: 32px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  gap: 30px; /* 각 ProductItem 사이의 간격 설정 */
  overflow-x: auto; /* 가로 스크롤 */
  white-space: nowrap; /* 자식 요소가 줄 바꿈되지 않도록 함 */
  scrollbar-width: none; /* Firefox에 대한 스크롤바 숨김 */
  -ms-overflow-style: none; /* IE 및 Edge에 대한 스크롤바 숨김 */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera에 대한 스크롤바 숨김 */
  }
`;

const ProductItem = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 29px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  cursor: pointer;
`;

const ProductImg = styled.img``;
const ProductType = styled.div``;
const ProductName = styled.div``;
const ProductPrice = styled.div``;

export default function Idol() {
  const { src } = useParams<{ src: string }>(); // useParams를 통해 현재 주소의 src 값을 가져옴
  const [selectedType, setSelectedType] = useState("전체"); // 선택된 아이템의 인덱스를 추적
  const [product, setProduct] = useState<any>([
    {
      type: "MD",
      name: "OFFICIAL FANLIGHT",
      price: 30000,
    },
    {
      type: "시즌그리팅",
      name: "2024 SEASON'S GREETINGS CLEAR PHOTO CARD",
      price: 4000,
    },
    {
      type: "시즌그리팅",
      name: "2024 SEASON'S GREETINGS RANDOM TRADING CARD",
      price: 3000,
    },
    { type: "MD", name: "Be There For Me - BALL CAP SET", price: 25000 },
  ]);

  // 타입 클릭 이벤트
  const handleClick = (type: string) => {
    console.log("type: ", type);
    setSelectedType(type); // 클릭한 아이템의 인덱스를 상태에 저장
  };

  // 선택된 타입에 대한 API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`your-api-url/${selectedType}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData(); // 함수 호출
  }, [selectedType]); // 선택된 타입이 변경될 때마다 호출

  const productTypes = [
    "전체",
    "앨범",
    "콘서트",
    "MD",
    "콜라보",
    "포토북",
    "시즌그리팅",
    "팬클럽",
    "기타",
  ];

  return (
    <Wrapper>
      <CoverImgBox
        style={{ backgroundImage: `url("/src/assets/idol/cover/${src}.jpg")` }}
      >
        <CoverImg
          src={`/src/assets/idol/cover/${src}.jpg`}
          alt={src}
          onError={(e) => {
            (
              e.target as HTMLImageElement
            ).src = `src/assets/idol/logo/default.png`; // 대체 이미지 설정
          }}
        />
        <CoverGradient />
      </CoverImgBox>
      <Menu>
        <MenuItem>
          <MenuItem style={{ marginRight: "12px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 19L8 12L15 5"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </MenuItem>
          <MenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.48906 10.0001L12 3.99867L17.5109 10.0001H17.5096V20.0001H6.49033V10.0001H6.48906ZM4.65378 11.9987L3.2977 13.4755L2 12.0623L10.7025 2.58529C11.4191 1.8049 12.5809 1.8049 13.2975 2.58529L22 12.0623L20.7023 13.4755L19.3462 11.9986V20.0001C19.3462 21.1047 18.5239 22.0001 17.5096 22.0001H6.49033C5.47603 22.0001 4.65378 21.1047 4.65378 20.0001V11.9987Z"
                fill="white"
              />
            </svg>
          </MenuItem>
        </MenuItem>
        <Title>{src}</Title>
        <MenuItem>
          <MenuItem>
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
      <Type>
        {productTypes.map((type) => (
          <ProductItem
            key={type}
            onClick={() => handleClick(type)} // 클릭 시 해당 타입의 인덱스를 상태에 저장
            style={{
              color: selectedType === type ? "#f89e86" : "#9ea3b2", // 선택된 타입에 따라 글자 색상 변경
              borderBottom:
                selectedType === type ? "2px solid #f89e86" : "none", // 선택된 타입에 따라 밑줄 스타일 변경
            }}
          >
            {type}
          </ProductItem>
        ))}
      </Type>
      <div>
        <h2>{selectedType}에 대한 데이터</h2>
        <ul>
          {product.map((item: any, index: number) => (
            <li key={index}>
              <ProductImg></ProductImg>
              <ProductType>{item.type}</ProductType>
              <ProductName>{item.name}</ProductName>
              <ProductPrice>{item.price}</ProductPrice>
            </li> // 데이터에 'name' 속성이 있다고 가정
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}
