export default interface ProductListItem {
  productNumber: number;
  idol: string;
  type: string;
  name: string;
  image: string | null;
  priceAvg: number;
  soldCount: number;
  favoriteCount: number;
}
