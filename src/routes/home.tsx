export default function Home() {
  const logOut = () => {
    // 로그아웃
    console.log("로그아웃");
  };
  return <button onClick={logOut}>로그아웃</button>;
}
