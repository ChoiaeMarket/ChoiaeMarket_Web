import { useState } from "react";
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

const RecentWord = styled.div`
  width: fit-content;
  border-radius: 5px;
  border: 1px solid #9ea3b2;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  padding: 5px 10px;
`;

export function Search() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [recentWord, setRecentWord] = useState<any>([
    "엔씨티",
    "응원봉",
    "SMCU",
    "SMCU 엔씨티",
    "lp",
  ]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setSearch(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (search === "") return; // 미입력 방지
    try {
      // props.abc.value; // 강제 에러 발생
      // navigate("/"); // 검색 쿼리문 페이지
    } catch (e: any) {
      console.log("search: ", e.message);
      setError("검색 오류");
    }
    console.log("search: ", search);
  };

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
        <Form onSubmit={onSubmit}>
          <SearchInput
            onChange={onChange}
            name="search"
            value={search}
            placeholder="검색어를 입력해 주세요"
            type="search"
            required
            hasValue={search.length > 0}
          />
          <SearchSubmit type="submit" value="검색" />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
      </Menu>
      <RecentSearches>
        최근 검색어
        {recentWord.map((word) => (
          <RecentWord>{word}</RecentWord>
        ))}
      </RecentSearches>
    </Wrapper>
  );
}
