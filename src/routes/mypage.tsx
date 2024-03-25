export default function Mypage() {
  const logOut = () => {
    // 로그아웃
    console.log("로그아웃");
  };
  return (
    <div>
      <h1>Mypage</h1>
      <button onClick={logOut}>로그아웃</button>
    </div>
  );
}
