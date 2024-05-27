export default interface SignUpRequestDto {
  email: string;
  password: string;
  name: string;
  nickname: string;
  tel: string;
  gender: string; // "0" or "1" 문자열로 받음
  agreedPersonal: boolean; // true or false로 받음
  profileImage: string;
}
