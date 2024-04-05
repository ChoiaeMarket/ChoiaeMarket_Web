import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const TypeBox = styled.div`
  position: relative;
`;

const Type = styled.div`
  width: 390px;
  height: 32px;
  border-bottom: 1px solid #626877;
  margin-top: 32px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  gap: 30px; /* 각 TypeValue 사이의 간격 설정 */
  overflow-x: auto; /* 가로 스크롤 */
  white-space: nowrap; /* 자식 요소가 줄 바꿈되지 않도록 함 */
  scrollbar-width: none; /* Firefox에 대한 스크롤바 숨김 */
  -ms-overflow-style: none; /* IE 및 Edge에 대한 스크롤바 숨김 */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera에 대한 스크롤바 숨김 */
  }
`;

const TypeValue = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 29px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  cursor: pointer;
`;

const TypeButtonLeft = styled.div`
  width: 22px;
  height: 22px;
  background: none;
  padding: 0;
  position: absolute;
  top: 35px;
  left: 32px;
  border: none;
  cursor: pointer;
`;

const TypeButtonRight = styled.div`
  width: 22px;
  height: 22px;
  background: none;
  padding: 0;
  position: absolute;
  top: 35px;
  right: 32px;
  border: none;
  cursor: pointer;
`;

const DropdownButton = styled.div`
  background-color: #181a20;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: white;
  margin: 12px 0;
  margin-left: auto;
  padding: 0;
  border: none;
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
  font-size: 18px;
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

const ProductList = styled.ul`
  width: 390px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Products = styled.li`
  width: 190px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.2s;
  &:hover {
    background-color: #3b3f4a;
  }
`;

const ProductImg = styled.img`
  width: 190px;
  height: 190px;
`;

const ProductType = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: #777c89;
  margin: 8px 5px 0 5px;
`;

const ProductName = styled.div`
  width: 180px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  margin: 4px 5px 0 5px;
`;

const ProductPrice = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  margin: 8px 5px 0 5px;
`;

export default function Idol() {
  const { idol } = useParams(); // useParams를 통해 현재 주소의 idol 값을 가져옴
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
  const scrollType = useRef<HTMLDivElement>(null); // 상품 타입 스크롤 이동 버튼
  const [currentScroll, setCurrentScroll] = useState(0); // 현재 스크롤 위치 저장
  const [selectedType, setSelectedType] = useState("전체"); // 선택된 상품 타입
  const [isOpen, setIsOpen] = useState(false); // 상품 정렬 드롭다운 메뉴 open 유무
  const [isSorted, setIsSorted] = useState(false); // 상품 정렬 완료 여부
  const [selectedSort, setSelectedSort] = useState("최신순"); // 선택된 상품 정렬
  const [products, setProducts] = useState<any>([
    // 초기 상품 목록
    {
      idol: "NCT",
      type: "MD",
      name: "OFFICIAL FANLIGHT",
      price: 30000,
      count: 150,
      likes: 78,
    },
    {
      idol: "NCT",
      type: "시즌그리팅",
      name: "2024 SEASON'S GREETINGS CLEAR PHOTO CARD",
      price: 4000,
      count: 15,
      likes: 10,
    },
    {
      idol: "NCT",
      type: "시즌그리팅",
      name: "2024 SEASON'S GREETINGS RANDOM TRADING CARD",
      price: 3000,
      count: 43,
      likes: 35,
    },
    {
      idol: "NCT",
      type: "MD",
      name: "Be There For Me - BALL CAP SET",
      price: 25000,
      count: 23,
      likes: 55,
    },
  ]);
  const [sortedProducts, setSortedProducts] = useState<any>([
    // 초기 상품 목록
    {
      idol: "NCT",
      type: "MD",
      name: "OFFICIAL FANLIGHT",
      price: 30000,
      count: 150,
      likes: 78,
    },
    {
      idol: "NCT",
      type: "시즌그리팅",
      name: "2024 SEASON'S GREETINGS CLEAR PHOTO CARD",
      price: 4000,
      count: 15,
      likes: 10,
    },
    {
      idol: "NCT",
      type: "시즌그리팅",
      name: "2024 SEASON'S GREETINGS RANDOM TRADING CARD",
      price: 3000,
      count: 43,
      likes: 35,
    },
    {
      idol: "NCT",
      type: "MD",
      name: "Be There For Me - BALL CAP SET",
      price: 25000,
      count: 23,
      likes: 55,
    },
  ]); // 정렬된 상품 목록

  // 상품 타입 종류
  const productsTypes = [
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

  // 페이지가 처음 로드될 때 상품 API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`your-api-url`);
        const data = await response.json();
        setProducts(data);
        setSortedProducts(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []); // 빈 배열을 전달하여 페이지가 처음 로드될 때 한 번만 호출되도록 함

  const handleSearch = () => {
    navigate("/search");
  };

  const handleHome = () => {
    navigate("/");
  };

  // scroll 값이 변경될 때마다 값을 업데이트하는 함수
  const handleScroll = () => {
    if (scrollType.current) {
      setCurrentScroll(scrollType.current.scrollLeft);
    }
  };

  useEffect(() => {
    // scroll 이벤트 리스너 등록
    if (scrollType.current) {
      scrollType.current.addEventListener("scroll", handleScroll);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      if (scrollType.current) {
        scrollType.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // 왼쪽 버튼 클릭 시 스크롤 이동
  const scrollLeft = () => {
    if (scrollType.current) {
      const scrollAmount = -124;
      scrollType.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth", // 부드럽게 스크롤 이동
      });
    }
  };

  // 오른쪽 버튼 클릭 시 스크롤 이동
  const scrollRight = () => {
    if (scrollType.current) {
      const scrollAmount = 124;
      scrollType.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth", // 부드럽게 스크롤 이동
      });
    }
  };

  // 상품 타입 메뉴 선택시 함수
  const handleClick = (type: string) => {
    console.log("type: ", type);
    setSelectedType(type); // 클릭한 아이템의 인덱스를 상태에 저장
  };

  // 상품 클릭 시 상세 정보 페이지로 이동하는 함수
  const handleProductClick = (productName: string) => {
    navigate(`/idol/${idol}/${productName}`); // 경로 변경
  };

  // 상품 타입 필터링
  const filteredProducts =
    selectedType === "전체"
      ? sortedProducts
      : sortedProducts.filter((item: any) => item.type === selectedType);

  // 상품 정렬 드롭다운 메뉴 open 유무 토글
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 상품 정렬 드론다운 하위 메뉴 선택시 함수
  const handleSortClick = (sort: string) => {
    console.log("sort: ", sort);
    setSelectedSort(sort); // 선택 값 저장
    setIsSorted(false); // 정렬 시작
    setIsOpen(false); // 드롭다운 닫기
  };

  // 상품 정렬
  if (isSorted === false) {
    if (selectedSort === "최신순") {
      setSortedProducts([...products]);
      setIsSorted(true); // 정렬 끝
    } else if (selectedSort === "저가순") {
      sortedProducts.sort((a: any, b: any) => a.price - b.price);
      setIsSorted(true); // 정렬 끝
    } else if (selectedSort === "찜 많은 순") {
      sortedProducts.sort((a: any, b: any) => b.likes - a.likes);
      setIsSorted(true); // 정렬 끝
    }
  }

  return (
    <Wrapper>
      <CoverImgBox
        style={{ backgroundImage: `url("/src/assets/idol/cover/${idol}.jpg")` }}
      >
        <CoverImg
          src={`/src/assets/idol/cover/${idol}.jpg`}
          alt={idol}
          onError={(e) => {
            (
              e.target as HTMLImageElement
            ).src = `/src/assets/idol/logo/default.png`; // 대체 이미지 설정
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
          <MenuItem onClick={handleHome} style={{ cursor: "pointer" }}>
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
        <Title>{idol}</Title>
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
      <TypeBox>
        <Type ref={scrollType}>
          {productsTypes.map((type) => (
            <TypeValue
              key={type}
              onClick={() => handleClick(type)} // 클릭 시 해당 타입의 인덱스를 상태에 저장
              style={{
                color: selectedType === type ? "#f89e86" : "#9ea3b2", // 선택된 타입에 따라 글자 색상 변경
                borderBottom:
                  selectedType === type ? "2px solid #f89e86" : "none", // 선택된 타입에 따라 밑줄 스타일 변경
              }}
            >
              {type}
            </TypeValue>
          ))}
        </Type>
        <TypeButtonLeft
          onClick={scrollLeft}
          style={{ display: currentScroll < 10 ? "none" : "block" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <circle cx="11" cy="11" r="10.5" fill="#181A20" stroke="white" />
            <path
              d="M13 16L8 11L13 6"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </TypeButtonLeft>
        <TypeButtonRight
          onClick={scrollRight}
          style={{ display: currentScroll > 240 ? "none" : "block" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <circle cx="11" cy="11" r="10.5" fill="#181A20" stroke="white" />
            <path
              d="M9 6L14 11L9 16"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </TypeButtonRight>
      </TypeBox>
      <DropdownButton onClick={toggleDropdown}>
        {selectedSort}
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
              stroke="white"
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
      <DropdownBackground isOpen={isOpen} />
      <DropdownContent isOpen={isOpen}>
        <Dropdown onClick={() => handleSortClick("최신순")}>최신순</Dropdown>
        <Dropdown onClick={() => handleSortClick("저가순")}>저가순</Dropdown>
        <Dropdown onClick={() => handleSortClick("찜 많은 순")}>
          찜 많은 순
        </Dropdown>
      </DropdownContent>
      <ProductList>
        {filteredProducts.map((item: any, index: number) => (
          <Products
            key={index}
            onClick={() => handleProductClick(item.name)} // 클릭 시 상세 정보 페이지로 이동
          >
            <ProductImg
              src={`/src/assets/idol/product/${idol}/${item.name}.png`}
              alt={item.name}
              onError={(e) => {
                (
                  e.target as HTMLImageElement
                ).src = `/src/assets/idol/logo/default.png`; // 대체 이미지 설정
              }}
            />
            <ProductType>{item.type}</ProductType>
            <ProductName>{item.name}</ProductName>
            <ProductPrice>\ {item.price.toLocaleString()}</ProductPrice>{" "}
            {/* 가격을 세 자리 단위로 끊어서 출력 */}
          </Products>
        ))}
      </ProductList>
    </Wrapper>
  );
}
