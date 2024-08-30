import { useEffect, useState } from "react";

// 커스텀 hook
// countPerPage : 한 페이지 섹션의 리스트 개수
// numberOfSection : 한 번에 보여줄 페이지 섹션의 개수
const usePagination = <T>(countPerPage: number, numberOfSection: number) => {
  // 전체 객체 리스트 상태
  const [totalList, setTotalList] = useState<T[]>([]); // 매개타입 T를 통해 이후에 타입형을 받아옴
  // 보여줄 객체 리스트 상태
  const [viewList, setViewList] = useState<T[]>([]);
  // 현재 페이지 번호 상태
  const [currentPage, setCurrentPage] = useState<number>(1); // 항상 초기 페이지는 1

  // 전체 페이지 번호 리스트 상태
  const [totalPageList, setTotalPageList] = useState<number[]>([1]);
  // 보여줄 페이지 번호 리스트 상태
  const [viewPageList, setViewPageList] = useState<number[]>([1]);
  // 현재 섹션 상태
  const [currentSection, setCurrentSection] = useState<number>(1);

  // 전체 섹션 상태
  const [totalSection, setTotalSection] = useState<number>(1);

  // 보여줄 객체 리스트 추출 함수
  const setView = () => {
    const FIRST_INDEX = countPerPage * (currentPage - 1);
    const LAST_INDEX =
      totalList.length > countPerPage * currentPage
        ? countPerPage * currentPage
        : totalList.length;
    const viewList = totalList.slice(FIRST_INDEX, LAST_INDEX);
    setViewList(viewList);
  };

  // 보여줄 페이지 리스트 추출 함수
  const setViewPage = () => {
    const FIRST_INDEX = numberOfSection * (currentSection - 1);
    const LAST_INDEX =
      totalPageList.length > numberOfSection * currentSection
        ? numberOfSection * currentSection
        : totalPageList.length;
    const viewPageList = totalPageList.slice(FIRST_INDEX, LAST_INDEX);
    setViewPageList(viewPageList);
  };

  // total list가 변경될 때마다 실행할 작업
  useEffect(() => {
    const totalPage = Math.ceil(totalList.length / countPerPage);
    const totalPageList: number[] = [];
    for (let page = 1; page <= totalPage; page++) totalPageList.push(page);
    setTotalPageList(totalPageList);

    const totalSection = Math.ceil(
      totalList.length / (countPerPage * numberOfSection)
    );
    setTotalSection(totalSection);

    setCurrentPage(1);
    setCurrentSection(1);

    setView();
    setViewPage();
  }, [totalList]);

  // current page가 변경될 때마다 실행할 작업
  useEffect(setView, [currentPage]);
  // current section가 변경될 때마다 실행할 작업
  useEffect(setViewPage, [currentPage]);

  return {
    currentPage,
    setCurrentPage,
    currentSection,
    setCurrentSection,
    viewList,
    viewPageList,
    totalSection,
    setTotalList,
  };
};

export default usePagination;
