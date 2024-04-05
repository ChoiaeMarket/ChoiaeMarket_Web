import { useLocation } from "react-router-dom";

export function SearchResult() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  return (
    <div>
      <h2>검색 결과 페이지</h2>
      <p>검색어: {searchQuery}</p>
      {/* 여기에 실제 검색 결과 표시 로직을 추가하세요 */}
    </div>
  );
}
