import { getRelationListRequest, getSearchBoardListRequest } from "../apis";
import { ResponseDto } from "../apis/response";
import { GetSearchBoardListResponseDto } from "../apis/response/board";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BoardListItem } from "types/interface";
import Pagination from "../components/pagination";
import { usePagination } from "../hooks";
import { GetRelationListResponseDto } from "apis/response/search";
import { Error } from "../components/auth-comonents";

const Wrapper = styled.div`
  min-height: 99vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 326px;
  padding: 44px 0px 68px;
`;

const Menu = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Form = styled.form``;

const SearchInput = styled.input<{ hasValue: boolean }>`
  width: 250px;
  height: 56px;
  background-color: #252932;
  border: 0;
  border-radius: 16px;
  padding: 19px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
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

const SearchSubmit = styled.input`
  display: none;
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

const Relation = styled.div`
  width: 326px;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.025em;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RelationList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
`;

const RelationWord = styled.div`
  width: fit-content;
  border-radius: 5px;
  border: 1px solid #9ea3b2;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  cursor: pointer;
  padding: 5px 10px;
`;

const SearchWordWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.025em;
`;

const SearchCount = styled.div`
  color: #f89e86;
`;

const ProductNothing = styled.div`
  position: absolute;
  top: 50%;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
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

export function SearchWord() {
  const { idol, product } = useParams();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
  const location = useLocation();
  const [error, setError] = useState("");
  3;
  const [newSearchWord, setNewSearchWord] = useState("");

  const { searchWord } = useParams(); // searchWord path variable 상태
  const [preSearchWord, setPreSearchWord] = useState<string | null>(null); // 이전 검색어
  const [count, setCount] = useState<number>(0); // 검색 게시물 개수 상태
  const [relativeWordList, setRelativeWordList] = useState<String[]>([]); // 관련 검색어 리스트

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

  // get search board list response 처리 함수
  const getSearchBoardListResponse = (
    responseBody: GetSearchBoardListResponseDto | ResponseDto | null
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

    if (!searchWord) return;
    const { searchList } = responseBody as GetSearchBoardListResponseDto;
    setTotalList(searchList);
    setCount(searchList.length);
    setPreSearchWord(searchWord);
  };

  // get relation list response 처리 함수
  const getRelationListResponse = (
    responseBody: GetRelationListResponseDto | ResponseDto | null
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

    const { relativeWordList } = responseBody as GetRelationListResponseDto;
    setRelativeWordList(relativeWordList);
  };

  // searchWord 상태 변경 시 실행될 함수
  useEffect(() => {
    if (!searchWord) return;
    getSearchBoardListRequest(searchWord, preSearchWord).then(
      getSearchBoardListResponse
    );
    getRelationListRequest(searchWord).then(getRelationListResponse);
    setNewSearchWord(searchWord);
  }, [searchWord]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewSearchWord(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (newSearchWord === "" || newSearchWord === searchWord) return; // 검색어 미입력 방지
    try {
      navigate(`/search/${newSearchWord}`); // 검색 쿼리문 페이지
    } catch (e: any) {
      console.log("search: ", e.message);
      setError("검색 오류");
    }
    console.log("search: ", newSearchWord);
  };

  // 상품 클릭 시 상세 정보 페이지로 이동하는 함수
  const handleProductClick = (boardNumber: number) => {
    navigate(`/idol/${idol}/${product}/${boardNumber}`);
  };

  // 관련 검색어 클릭 시 관련 검색 페이지로 이동하는 함수
  const handleRelationWordClick = (searchWord: string) => {
    navigate(`/search/${searchWord}`);
  };

  // 이전 페이지 이동
  const handleBack = () => {
    navigate("/");
  };

  // 메인 페이지 이동
  const handleHome = () => {
    navigate("/");
  };

  // 검색 페이지 이동
  const handleSearch = () => {
    navigate("/search");
  };

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
        <Form onSubmit={onSubmit}>
          <SearchInput
            onChange={onChange}
            name="newSearchWord"
            value={newSearchWord}
            placeholder="검색어를 입력해 주세요"
            type="newSearchWord"
            required
            hasValue={newSearchWord.length > 0}
          />
          <SearchSubmit type="submit" value="검색" />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
      </Menu>
      {relativeWordList.length === 0 || count === 0 ? (
        <></>
      ) : (
        <Relation>
          연관 검색어
          <RelationList>
            {relativeWordList.map((word: any) => (
              <RelationWord
                onClick={() => handleRelationWordClick(word)} // 클릭 시 관련 검색 페이지로 이동
              >
                {word}
              </RelationWord>
            ))}
          </RelationList>
        </Relation>
      )}
      <SearchWordWrapper>
        검색결과&nbsp;
        <SearchCount>{count}</SearchCount>
      </SearchWordWrapper>
      {count === 0 ? (
        <ProductNothing>{"검색 결과가 없습니다."}</ProductNothing>
      ) : (
        <>
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
          <Pagination
            currentPage={currentPage}
            currentSection={currentSection}
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
            viewPageList={viewPageList}
            totalSection={totalSection}
            numberOfSection={numberOfSection}
          />
        </>
      )}
    </Wrapper>
  );
}
