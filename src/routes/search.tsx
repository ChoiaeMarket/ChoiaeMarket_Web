import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SEARCH_HISTORY_KEY = "searchHistory"; // 로컬 스토리지를 사용하여 검색 정보 저장

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
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const Error = styled.span`
  top: 100px;
  font-weight: 600;
  color: tomato;
  position: absolute;
`;

const RecentSearches = styled.div`
  width: 326px;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.025em;
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RecentWordBox = styled.div`
  width: fit-content;
  border-radius: 5px;
  border: 1px solid #9ea3b2;
  display: flex;
  align-items: center;
`;

const RecentWord = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  cursor: pointer;
  padding: 5px 5px 5px 10px;
`;

const DeleteWord = styled.div`
  cursor: pointer;
  padding: 10px 10px 10px 0;
  display: flex;
`;

export function Search() {
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]); // 검색 기록을 초기화

  // 이전 페이지 이동
  const handleBack = () => {
    navigate(-1);
  };

  // 메인 페이지 이동
  const handleHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveHistory = (updatedHistory: string[]) => {
    // 배열을 뒤집어서 중복된 값이 있을 때 가장 나중에 추가된 값을 유지
    const uniqueHistory = updatedHistory
      .reverse()
      .filter((value, index, self) => self.indexOf(value) === index)
      .reverse();

    // 검색 결과 저장
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(uniqueHistory));
    setHistory(uniqueHistory);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setSearchWord(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (searchWord === "") return; // 검색어 미입력 방지
    try {
      // props.abc.value; // 강제 에러 발생
      const updatedHistory = [...history, searchWord]; // 검색 기록 업데이트
      saveHistory(updatedHistory);
      navigate(`/searchResult?q=${searchWord}`); // 검색 쿼리문 페이지
    } catch (e: any) {
      console.log("search: ", e.message);
      setError("검색 오류");
    }
    console.log("search: ", searchWord);
  };

  const handleRecentWord = (searchedWord: string) => {
    const updatedHistory = [...history, searchedWord]; // 검색 기록 업데이트
    saveHistory(updatedHistory);
    navigate(`/searchResult?q=${searchedWord}`);
  };

  const deleteSearch = (wordToDelete: string) => {
    const updatedHistory = history.filter(
      (searchedWord) => searchedWord !== wordToDelete
    );
    saveHistory(updatedHistory);
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
            name="searchWord"
            value={searchWord}
            placeholder="검색어를 입력해 주세요"
            type="searchWord"
            required
            hasValue={searchWord.length > 0}
          />
          <SearchSubmit type="submit" value="검색" />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
      </Menu>
      <RecentSearches>
        최근 검색어
        {history
          .slice()
          .reverse()
          .map((searchedWord: any) => (
            <RecentWordBox>
              <RecentWord
                key={searchedWord}
                onClick={() => handleRecentWord(searchedWord)}
              >
                {searchedWord}
              </RecentWord>
              <DeleteWord onClick={() => deleteSearch(searchedWord)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3.00001 10.5001L10.5 3.00001M3.00001 10.5001L10.5 3.00001"
                    stroke="#9EA3B2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M2.9999 3.00001L10.5 10.5M2.9999 3.00001L10.5 10.5"
                    stroke="#9EA3B2"
                    stroke-linecap="round"
                  />
                </svg>
              </DeleteWord>
            </RecentWordBox>
          ))}
      </RecentSearches>
    </Wrapper>
  );
}
