import { useEffect, useState } from "react";
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

const Menu = styled.div`
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  /* position: absolute; */
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

const CoverImgBox = styled.div`
  width: 390px;
  height: 390px;
  background-color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.025em;
  color: #181a20;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CoverTitle = styled.div`
  width: 326px;
  height: 95px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoverImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const CoverContentsBox = styled.div`
  height: 95px;
  display: flex;
`;

const CoverContents = styled.div`
  width: 195px;
  height: 95px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CoverContentTitle = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
`;

const CoverContent = styled.div``;

const DropdownButton = styled.button`
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
  display: flex;
  flex-wrap: wrap;
`;

const Products = styled.li`
  width: 390px;
  height: 140px;
  padding: 20px 32px;
  border-bottom: 1px solid #252932;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.2s;
  &:hover {
    background-color: #3b3f4a;
  }
`;

const ProductImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
`;

const ProductPrice = styled.div`
  width: 214px;
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 0;
  margin: 0 0 8px 12px;
`;

const ProductTitle = styled.div`
  width: 214px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  margin: 0 0 24px 12px;
  overflow: hidden; /* 텍스트가 넘칠 경우 생략 */
  white-space: nowrap; /* 텍스트가 한 줄을 넘어갈 때 줄 바꿈 방지 */
  text-overflow: ellipsis; /* 생략 부분에 ellipsis(...) 표시 */
`;

const ProductBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 0 12px;
`;

const ProductDate = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: #777c89;
`;

const ProductInfos = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ProductInfo = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  display: flex;
  align-items: center;
  gap: 1px;
`;

function getTimeDifferenceString(previousDate: any) {
  const currentDate = new Date();
  const diff = currentDate.getTime() - previousDate.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `${seconds}초 전`;
  }
}

export function Product() {
  const { idol, product } = useParams();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
  const [isOpen, setIsOpen] = useState(false); // 상품 정렬 드롭다운 메뉴 open 유무
  const [isSorted, setIsSorted] = useState(false); // 상품 정렬 완료 여부
  const [selectedSort, setSelectedSort] = useState("최신순"); // 선택된 상품 정렬
  const [products, setProducts] = useState<any>([
    // 초기 상품 목록
    {
      idol: "NCT",
      type: "MD",
      name: "OFFICIAL FANLIGHT",
      title: "시즈니 필수템 판매중",
      content: "필요하시면 채팅주세요!",
      id: "엔시티즌",
      date: "2024-04-03T19:15:50",
      price: 30000,
      chats: 0,
      likes: 2,
      order: 5,
      sold: false,
    },
    {
      idol: "NCT",
      type: "MD",
      name: "OFFICIAL FANLIGHT",
      title: "응원봉 판매",
      content: "응원봉 싸게 팝니당. 편하게 채팅해주세요.",
      id: "시즈니",
      date: "2024-04-03T10:15:50",
      price: 28000,
      chats: 1,
      likes: 4,
      order: 4,
      sold: false,
    },
    {
      idol: "NCT",
      type: "MD",
      name: "OFFICIAL FANLIGHT",
      title: "NCT 응원봉",
      content: "채팅 부탁드려요.",
      id: "NNNCCT",
      date: "2024-04-03T04:35:50",
      price: 28000,
      chats: 1,
      likes: 7,
      order: 3,
      sold: false,
    },
    {
      idol: "NCT",
      type: "MD",
      name: "OFFICIAL FANLIGHT",
      title: "엔시티(nct) 응원봉 판매합니다~",
      content: "하자 없습니다. 네고가능",
      id: "오리조아",
      date: "2024-04-01T04:35:50",
      price: 31000,
      chats: 0,
      likes: 1,
      order: 2,
      sold: false,
    },
    {
      idol: "NCT",
      type: "MD",
      name: "OFFICIAL FANLIGHT",
      title: "엔시티 응원봉 택포",
      content:
        "딱 한 번 썼어요! 하자 전혀 없구요 배터리, 상자, 더스트백 다 포함해서 수요일에 배송 보내드려요~",
      id: "홍튜브",
      date: "2024-03-29T12:28:50",
      price: 29000,
      chats: 2,
      likes: 13,
      order: 1,
      sold: false,
    },
  ]);
  const [sortedProducts, setSortedProducts] = useState<any>([
    // 초기 상품 목록
    {
      idol: "NCT",
      type: "MD",
      name: "OFFICIAL FANLIGHT",
      title: "시즈니 필수템 판매중",
      content: "필요하시면 채팅주세요!",
      id: "엔시티즌",
      date: "2024-04-03T19:15:50",
      price: 30000,
      chats: 0,
      likes: 2,
      order: 5,
      sold: false,
    },
    {
      idol: "NCT",
      type: "MD",
      name: "OFFICIAL FANLIGHT",
      title: "응원봉 판매",
      content: "응원봉 싸게 팝니당. 편하게 채팅해주세요.",
      id: "시즈니",
      date: "2024-04-03T10:15:50",
      price: 28000,
      chats: 1,
      likes: 4,
      order: 4,
      sold: false,
    },
    {
      idol: "NCT",
      type: "MD",
      name: "OFFICIAL FANLIGHT",
      title: "NCT 응원봉",
      content: "채팅 부탁드려요.",
      id: "NNNCCT",
      date: "2024-04-03T04:35:50",
      price: 28000,
      chats: 1,
      likes: 7,
      order: 3,
      sold: false,
    },
    {
      idol: "NCT",
      type: "MD",
      name: "OFFICIAL FANLIGHT",
      title: "엔시티(nct) 응원봉 판매합니다~",
      content: "하자 없습니다. 네고가능",
      id: "오리조아",
      date: "2024-04-01T04:35:50",
      price: 31000,
      chats: 0,
      likes: 1,
      order: 2,
      sold: false,
    },
    {
      idol: "NCT",
      type: "MD",
      name: "OFFICIAL FANLIGHT",
      title: "엔시티 응원봉 택포",
      content:
        "딱 한 번 썼어요! 하자 전혀 없구요 배터리, 상자, 더스트백 다 포함해서 수요일에 배송 보내드려요~",
      id: "홍튜브",
      date: "2024-03-29T12:28:50",
      price: 29000,
      chats: 2,
      likes: 13,
      order: 1,
      sold: false,
    },
  ]); // 정렬된 상품 목록

  const handleSearch = () => {
    navigate("/search");
  };

  const averagePrice = // 평균거래가격
    products.reduce((total: any, product: any) => total + product.price, 0) /
    products.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`your-api-url`);
        const data = await response.json();
        setProducts(data.filter((product: any) => !product.sold)); // sold가 false인 제품만 필터링
        setSortedProducts(data.filter((product: any) => !product.sold)); // sold가 false인 제품만 필터링
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []); // 빈 배열을 전달하여 페이지가 처음 로드될 때 한 번만 호출되도록 함

  // 상품 클릭 시 상세 정보 페이지로 이동하는 함수
  const handleProductClick = (order: number) => {
    const selectedProduct = sortedProducts.find(
      (product: any) => product.order === order
    );
    if (selectedProduct) {
      navigate(`/idol/${idol}/${product}/${order}`, {
        state: { detail: selectedProduct }, // navigate 함수의 옵션으로 state를 사용하여 데이터 전달
      });
    }
  };

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
      <CoverImgBox>
        <CoverTitle>{product}</CoverTitle>
        <CoverImg
          src={`/src/assets/idol/product/${idol}/${product}.png`}
          alt={product}
          onError={(e) => {
            (
              e.target as HTMLImageElement
            ).src = `/src/assets/idol/logo/default.png`; // 대체 이미지 설정
          }}
        />
        <CoverContentsBox>
          <CoverContents>
            <CoverContentTitle>평균거래가격</CoverContentTitle>
            <CoverContent>{averagePrice.toLocaleString()}원</CoverContent>
          </CoverContents>
          <CoverContents>
            <CoverContentTitle>거래내역</CoverContentTitle>
            <CoverContent>150건</CoverContent>
          </CoverContents>
        </CoverContentsBox>
      </CoverImgBox>
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
        {sortedProducts
          .filter((product: any) => !product.sold) // sold가 false인 제품만 필터링
          .map((item: any, index: number) => (
            <Products
              key={index}
              onClick={() => handleProductClick(item.order)} // 클릭 시 상세 정보 페이지로 이동
            >
              <ProductImg
                src={`/src/assets/idol/product/${idol}/${item.name}/${item.order}.png`}
                alt={item.name}
                onError={(e) => {
                  (
                    e.target as HTMLImageElement
                  ).src = `/src/assets/idol/logo/default.png`; // 대체 이미지 설정
                }}
              />{" "}
              <div>
                <ProductPrice>{item.price.toLocaleString()}원</ProductPrice>{" "}
                {/* 가격을 세 자리 단위로 끊어서 출력 */}
                <ProductTitle>{item.title}</ProductTitle>
                <ProductBox>
                  <ProductDate>
                    {getTimeDifferenceString(new Date(item.date))}
                  </ProductDate>
                  <ProductInfos>
                    {item.chats !== 0 && ( // item.chats가 0이 아닌 경우에만 렌더링
                      <ProductInfo>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M9.00002 14.2445H8.76817C7.93639 14.2063 7.12101 13.9675 6.38726 13.5443C6.38678 13.5441 6.3863 13.5438 6.38581 13.5435L6.19234 13.4307L5.92239 13.2733L5.62054 13.3541L4.28986 13.7105L4.64626 12.3809L4.72724 12.0788L4.56959 11.8087L4.45575 11.6136C4.45565 11.6135 4.45554 11.6133 4.45544 11.6131C3.99308 10.8172 3.75002 9.91155 3.75002 8.99727C3.75002 6.1024 6.103 3.75 9.00002 3.75C11.897 3.75 14.25 6.1024 14.25 8.99727C14.25 11.8921 11.897 14.2445 9.00002 14.2445Z"
                            stroke="#9EA3B2"
                            stroke-width="1.5"
                          />
                        </svg>
                        {item.chats}
                      </ProductInfo>
                    )}
                    {item.likes !== 0 && ( // item.likes가 0이 아닌 경우에만 렌더링
                      <ProductInfo>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M9.00001 14.4001L3.72458 9.33643C2.35847 8.02445 2.35847 5.89606 3.72458 4.58408C5.09068 3.2721 7.30894 3.2721 8.67505 4.58408L9.00001 4.8954L9.32495 4.58408C10.6911 3.2721 12.9093 3.2721 14.2754 4.58408C15.6415 5.89606 15.6415 8.02445 14.2754 9.33643L9.00001 14.4001Z"
                            stroke="#9EA3B2"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linejoin="round"
                          />
                        </svg>
                        {item.likes}
                      </ProductInfo>
                    )}
                  </ProductInfos>
                </ProductBox>
              </div>
            </Products>
          ))}
      </ProductList>
    </Wrapper>
  );
}
