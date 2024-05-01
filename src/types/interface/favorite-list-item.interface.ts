export default interface FavoriteListItem {
  boardNumber: number;
  idol: string;
  type: string;
  name: string;
  image: string | null;
  title: string;
  content: string;
  price: number;
  chatCount: number;
  favoriteCount: number;
  sold: boolean;
  writeDatetime: string;
  writerNickname: string;
  writerProfileImage: string | null;
}
