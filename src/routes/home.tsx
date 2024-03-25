import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 326px;
  padding: 44px 0px 50px;
`;

export default function Home() {
  const logOut = () => {
    // 로그아웃
    console.log("로그아웃");
  };
  return (
    <Wrapper>
      <button onClick={logOut}>로그아웃</button>
    </Wrapper>
  );
}
