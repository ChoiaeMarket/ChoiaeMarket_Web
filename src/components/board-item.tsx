import { useNavigate } from "react-router-dom";
import { BoardListItem } from "types/interface";

interface Props {
  boardListItem: BoardListItem;
}

export function BoardItem({ boardListItem }: Props) {
  // properties
  const {
    boardNumber,
    idol,
    type,
    name,
    image,
    title,
    content,
    price,
    chatCount,
    favoriteCount,
    sold,
    writeDatetime,
    writerNickname,
    writerProfileImage,
  } = boardListItem;

  // function : 네이게이트 함수
  const navigate = useNavigate();

  // event handler : 게시물 아이템 클릭 이벤트 처리 함수
  const onClickHandler = () => {
    navigate(boardNumber);
  };

  return (
    <div onClick={onClickHandler}>
      {idol}
      {type}
      {name}
      {image}
      {title}
      {content}
      {price}
      {chatCount}
      {favoriteCount}
      {sold}
      {writeDatetime}
      {writerNickname}
      {writerProfileImage}
    </div>
  );
}
