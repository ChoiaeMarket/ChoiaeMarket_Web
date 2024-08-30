import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const PaginationChangeLink = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  margin-left: -1px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const PaginationText = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  margin-left: -1px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  color: #777c89;
  border: 1px solid #777c89;
  cursor: pointer;
  &:hover {
    z-index: 0;
    color: #ffffff;
    background-color: #3b3f4a;
    border: 1px solid #ffffff;
  }
`;

const PaginationTextActive = styled.div`
  z-index: 0;
  display: flex;
  width: 40px;
  height: 40px;
  margin-left: -1px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background-color: #3b3f4a;
  border: 1px solid #ffffff;
  cursor: default;
`;

// 페이지네이션 컴포넌트 Properties
interface Props {
  currentPage: number;
  currentSection: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setCurrentSection: Dispatch<SetStateAction<number>>;
  viewPageList: number[];
  totalSection: number;
  numberOfSection: number;
}

// 페이지네이션 컴포넌트
export default function Pagination(props: Props) {
  // Properties
  const {
    currentPage,
    currentSection,
    viewPageList,
    totalSection,
    numberOfSection,
  } = props;
  const { setCurrentPage, setCurrentSection } = props;

  // 페이지 번호 클릭 이벤트 처리
  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  };

  // 이전 클릭 이벤트 처리
  const onPreviousClickHandler = () => {
    if (currentSection === 1) return;
    setCurrentPage((currentSection - 1) * numberOfSection); // 이전 섹션 마지막 페이지로 이동
    setCurrentSection(currentSection - 1);
  };

  // 다음 클릭 이벤트 처리
  const onNextClickHandler = () => {
    if (currentSection === totalSection) return;
    setCurrentPage(currentSection * numberOfSection + 1); // 다음 섹션 첫번째 페이지로 이동
    setCurrentSection(currentSection + 1);
  };

  // 페이지네이션 컴포넌트 렌더링
  return (
    <PaginationWrapper>
      <PaginationChangeLink onClick={onPreviousClickHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15 19L8 12L15 5"
            stroke="#9ea3b2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </PaginationChangeLink>
      {viewPageList.map((page) =>
        page === currentPage ? (
          <PaginationTextActive>{page}</PaginationTextActive>
        ) : (
          <PaginationText onClick={() => onPageClickHandler(page)}>
            {page}
          </PaginationText>
        )
      )}
      <PaginationChangeLink onClick={onNextClickHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          transform="rotate(180)"
        >
          <path
            d="M15 19L8 12L15 5"
            stroke="#9ea3b2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </PaginationChangeLink>
    </PaginationWrapper>
  );
}
