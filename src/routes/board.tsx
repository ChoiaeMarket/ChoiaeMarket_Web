import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BoardListItem } from "types/interface";
import { getBoardListRequest } from "../apis";
import { ResponseDto } from "../apis/response";
import { GetBoardListResponseDto } from "../apis/response/board";
import Pagination from "../components/pagination";
import { usePagination } from "../hooks";

const Wrapper = styled.div`
  height: 100%;
  min-height: 99vh;
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

const ProductNothing = styled.div`
  margin-top: 20px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
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

export default function Board() {
  const { idol, product } = useParams();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
  const [isOpen, setIsOpen] = useState(false); // 상품 정렬 드롭다운 메뉴 open 유무
  const [isSorted, setIsSorted] = useState(false); // 상품 정렬 완료 여부
  const [selectedSort, setSelectedSort] = useState("최신순"); // 선택된 상품 정렬
  const [averagePrice, setAveragePrice] = useState(0); // 평균가격
  const [productCount, setProductCount] = useState(0); // 등록개수

  const countPerPage = 5; // countPerPage : 한 페이지 섹션의 리스트 개수
  const numberOfSection = 5; // numberOfSection : 한 번에 보여줄 페이지 섹션의 개수
  const {
    // 페이지네이션 관련 상태
    currentPage,
    currentSection,
    viewList,
    viewPageList,
    totalSection,
    setCurrentPage,
    setCurrentSection,
    setTotalList,
  } = usePagination<BoardListItem>(countPerPage, numberOfSection);

  const [latestTotalList, setLatestTotalList] = useState<BoardListItem[]>([]); // 정렬 전 게시물 리스트 상태
  const [sortedTotalList, setSortedTotalList] = useState<BoardListItem[]>([]); // 정렬 후 게시물 리스트 상태

  // get latest board list response 처리 함수
  const getBoardListResopnse = (
    responseBody: GetBoardListResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) {
      return;
    }
    const { code } = responseBody;
    if (code === "DBE") {
      alert("데이터베이스 오류입니다.");
      console.log(code);
    }
    if (code !== "SU") {
      return;
    }
    const { productsList } = responseBody as GetBoardListResponseDto;
    setLatestTotalList(productsList);
    setSortedTotalList(productsList);
    setPrice(productsList);
    setProductCount(productsList.length);
  };

  // 첫 마운트시 실행될 함수
  useEffect(() => {
    getBoardListRequest().then(getBoardListResopnse);
  }, []);

  // 정렬 메뉴선택시 재 페이지네이션
  useEffect(() => {
    setTotalList(sortedTotalList);
  }, [sortedTotalList]);

  // 이전 페이지 이동
  const handleBack = () => {
    // 현재 URL에서 마지막 슬래시('/') 이후 제거
    const currentPath = window.location.pathname;
    const backPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
    navigate(backPath);
  };

  // 메인 페이지 이동
  const handleHome = () => {
    navigate("/");
  };

  // 검색 페이지 이동
  const handleSearch = () => {
    navigate("/search");
  };

  // 평균거래가격 함수
  const setPrice = (productsList: { price: number }[]) => {
    const price =
      productsList.reduce((sum, product) => sum + product.price, 0) /
      productsList.length;
    setAveragePrice(Math.floor(price));
  };

  // 상품 클릭 시 상세 정보 페이지로 이동하는 함수
  const handleProductClick = (boardNumber: number) => {
    navigate(`/idol/${idol}/${product}/${boardNumber}`);
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
      setSortedTotalList([
        ...latestTotalList.sort(
          (a: any, b: any) => b.boardNumber - a.boardNumber
        ),
      ]);
    } else if (selectedSort === "저가순") {
      setSortedTotalList([
        ...latestTotalList.sort((a: any, b: any) => a.price - b.price),
      ]);
    } else if (selectedSort === "찜 많은 순") {
      setSortedTotalList([
        ...latestTotalList.sort(
          (a: any, b: any) => b.favoriteCount - a.favoriteCount
        ),
      ]);
    }
    setIsSorted(true); // 정렬 끝
  }

  return (
    <Wrapper>
      <Menu>
        <MenuItem>
          <MenuItem
            onClick={handleBack}
            style={{ marginRight: "12px", cursor: "pointer" }}
          >
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
            <CoverContentTitle>평균상품가격</CoverContentTitle>
            <CoverContent>{averagePrice.toLocaleString()}원</CoverContent>
          </CoverContents>
          <CoverContents>
            <CoverContentTitle>상품등록</CoverContentTitle>
            <CoverContent>{productCount}건</CoverContent>
          </CoverContents>
        </CoverContentsBox>
      </CoverImgBox>
      {productCount === 0 ? (
        ""
      ) : (
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
      )}
      <DropdownBackground isOpen={isOpen} />
      <DropdownContent isOpen={isOpen}>
        <Dropdown onClick={() => handleSortClick("최신순")}>최신순</Dropdown>
        <Dropdown onClick={() => handleSortClick("저가순")}>저가순</Dropdown>
        <Dropdown onClick={() => handleSortClick("찜 많은 순")}>
          찜 많은 순
        </Dropdown>
      </DropdownContent>
      <ProductList>
        {viewList.map((item: any, index: number) => (
          <Products
            key={index}
            onClick={() => handleProductClick(item.boardNumber)} // 클릭 시 상세 정보 페이지로 이동
          >
            <ProductImg
              src={item.image || "/src/assets/idol/logo/default.png"}
              alt={item.name}
              onError={(e) => {
                (
                  e.target as HTMLImageElement
                ).src = `/src/assets/idol/logo/default.png`; // 대체 이미지 설정
              }}
            />
            <div>
              <ProductPrice>{item.price.toLocaleString()}원</ProductPrice>{" "}
              <ProductTitle>{item.title}</ProductTitle>
              <ProductBox>
                <ProductDate>
                  {getTimeDifferenceString(new Date(item.writeDatetime))}
                </ProductDate>
                <ProductInfos>
                  {item.chatCount !== 0 && ( // item.chatCount가 0이 아닌 경우에만 렌더링
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
                      {item.chatCount}
                    </ProductInfo>
                  )}
                  {item.favoriteCount !== 0 && ( // item.favoriteCount가 0이 아닌 경우에만 렌더링
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
                      {item.favoriteCount}
                    </ProductInfo>
                  )}
                </ProductInfos>
              </ProductBox>
            </div>
          </Products>
        ))}
      </ProductList>
      {productCount === 0 ? (
        <ProductNothing>{"관련 상품이 없습니다."}</ProductNothing>
      ) : productCount <= countPerPage ? (
        ""
      ) : (
        <Pagination
          currentPage={currentPage}
          currentSection={currentSection}
          setCurrentPage={setCurrentPage}
          setCurrentSection={setCurrentSection}
          viewPageList={viewPageList}
          totalSection={totalSection}
          numberOfSection={numberOfSection}
        />
      )}
    </Wrapper>
  );
}
