import { useNavigate } from "react-router-dom";
import { ProductListItem } from "types/interface";

interface Props {
  productListItem: ProductListItem;
}

export function ProductItem({ productListItem }: Props) {
  // properties
  const {
    productNumber,
    idol,
    type,
    name,
    image,
    priceAvg,
    soldCount,
    favoriteCount,
  } = productListItem;

  // function : 네이게이트 함수
  const navigator = useNavigate();

  // event handler : 게시물 아이템 클릭 이벤트 처리 함수
  const onClickHandler = () => {
    navigator(productNumber);
  };

  return (
    <div onClick={onClickHandler}>
      {productNumber}
      {idol}
      {type}
      {name}
      {image}
      {priceAvg}
      {soldCount}
      {favoriteCount}
    </div>
  );
}
