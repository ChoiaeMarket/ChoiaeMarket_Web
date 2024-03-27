import styled from "styled-components";
import logo from "../assets/logo/logoWhite.png";
import idolList from "../components/idolList";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 326px;
  padding: 44px 0px 68px;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 34px;
  height: 34px;
`;

const Title = styled.h1`
  height: 100%;
  font-weight: 600;
  font-size: 20px;
  line-height: 56px;
  letter-spacing: 0;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.025em;
  margin-bottom: 10px;
`;

const H2 = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
`;

const IdolBox = styled.div`
  width: 326px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0 43px;
  margin: 12px 0;
`;

const IdolItem = styled.div`
  width: 80px;
  margin: 12px 0;
  text-align: center;
  cursor: pointer;
`;

const IdolLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const IdolName = styled.div`
  width: 80px;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.025em;
  margin-top: 8px;
`;

export default function Home() {
  const navigate = useNavigate();

  const handleIdol = (src: string) => {
    navigate(`/idol/${src}`);
  };

  return (
    <Wrapper>
      <Menu>
        <MenuItem>
          <Logo src={logo} alt="로고" />
          <Title>최애마켓</Title>
        </MenuItem>
        <MenuItem>
          <MenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 20L16.8033 15.8033M19 10.5C19 6.35786 15.6421 3 11.5 3C7.35786 3 4 6.35786 4 10.5C4 14.6421 7.35786 18 11.5 18C15.6421 18 19 14.6421 19 10.5Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </MenuItem>
          <MenuItem style={{ marginLeft: "12px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5.75 17.25V8.85714C5.75 5.49919 8.534 2.75 12 2.75C15.466 2.75 18.25 5.49919 18.25 8.85714V17.25H5.75Z"
                stroke="white"
                stroke-width="1.5"
              />
              <path
                d="M14 19C14 20.1067 13.1067 21 12 21C10.8933 21 10 20.1067 10 19H14Z"
                fill="white"
              />
              <rect
                x="2.5"
                y="16.5"
                width="19"
                height="1"
                rx="0.5"
                stroke="white"
              />
            </svg>
          </MenuItem>
        </MenuItem>
      </Menu>
      <H1>Celeb for You</H1>
      <H2>고객님이 좋아하는 아이돌을 선택하세요</H2>
      <H2>선택한 아이돌은 언제든 바꿀 수 있습니다.</H2>
      <IdolBox>
        {idolList.map(({ src, name }) => (
          <IdolItem key={src} onClick={() => handleIdol(src)}>
            <IdolLogo
              src={`src/assets/idol/logo/${src}.png`}
              alt={name}
              onError={(e) => {
                (
                  e.target as HTMLImageElement
                ).src = `src/assets/idol/logo/default.png`; // 대체 이미지 설정
              }}
            />
            <IdolName>{name}</IdolName>
          </IdolItem>
        ))}
      </IdolBox>
    </Wrapper>
  );
}
