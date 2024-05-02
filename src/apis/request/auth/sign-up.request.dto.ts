export default interface SignUpRequestDto {
  email: string;
  password: string;
  name: string;
  nickname: string;
  tel: string;
  gender: string;
  agreedPersonal: boolean;
}
