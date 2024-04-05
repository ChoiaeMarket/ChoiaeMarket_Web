import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 326px;
  padding: 44px 0px 68px;
`;

const Menu = styled.div`
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
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

const CoverImg = styled.img`
  width: 390px;
  height: 390px;
  object-fit: cover;
`;

const Contents = styled.div`
  width: inherit;
  margin-bottom: 36px;
`;

const ContentTypeDate = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  display: flex;
  gap: 5px;
  margin-top: 20px;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const ContentPrice = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.025em;
`;

const ContentTitle = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.025em;
`;

const ContentChatLikes = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ContentChatLike = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  display: flex;
  align-items: center;
  gap: 1px;
`;

const Content = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  margin-bottom: 42px;
`;

const Seller = styled.div`
  display: flex;
`;

const Sellerimg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const SellerIdRating = styled.div`
  margin: 5px 0 5px 10px;
`;

const SellerId = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  margin-bottom: 2px;
`;

const SellerRating = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LikeChatBox = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
`;

const LikeButton = styled.button`
  width: 60px;
  height: 60px;
  padding: 0;
  border: 0;
  border-radius: 16px;
  background-color: #252932;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #21242d;
  }
`;

const ChatButton = styled.button`
  width: 258px;
  height: 60px;
  padding: 0;
  border: 0;
  border-radius: 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 34px;
  letter-spacing: -0.025em;
  background-color: #f89e86;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f9b19e;
  }
`;

function getTimeDifferenceString(previousDate: any) {
  const currentDate = new Date();
  const diff = currentDate.getTime() - previousDate.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `${seconds}초 전`;
  }
}

export function Detail() {
  const { idol, product, order } = useParams();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
  const location = useLocation();
  const detail = location.state && location.state.detail; // 전달된 상태 받기
  const [liked, setLiked] = useState(false); // 좋아요 버튼 활성 상태

  // 이전 페이지 이동
  const handleBack = () => {
    navigate(-1);
  };

  // 메인 페이지 이동
  const handleHome = () => {
    navigate("/");
  };

  // 좋아요 버튼 클릭을 처리하는 함수
  const handleLikeClick = () => {
    setLiked(!liked); // liked 상태 토글

    // liked 상태에 따라 새로운 API 요청 보내기
    try {
      // const response = await axios.get("your/api/endpoint", {
      //   params: {
      //     like: !liked, // 좋아요 상태 전달
      //   },
      // });
      // API로부터 받은 데이터 처리
      // console.log(response.data);
    } catch (error) {
      // 오류 처리
      console.error("Error fetching liked products:", error);
    }
  };

  return (
    <Wrapper>
      <Menu>
        <MenuItem>
          <MenuItem
            onClick={handleBack}
            style={{ marginRight: "12px", cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 19L8 12L15 5"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </MenuItem>
          <MenuItem onClick={handleHome} style={{ cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.48906 10.0001L12 3.99867L17.5109 10.0001H17.5096V20.0001H6.49033V10.0001H6.48906ZM4.65378 11.9987L3.2977 13.4755L2 12.0623L10.7025 2.58529C11.4191 1.8049 12.5809 1.8049 13.2975 2.58529L22 12.0623L20.7023 13.4755L19.3462 11.9986V20.0001C19.3462 21.1047 18.5239 22.0001 17.5096 22.0001H6.49033C5.47603 22.0001 4.65378 21.1047 4.65378 20.0001V11.9987Z"
                fill="white"
              />
            </svg>
          </MenuItem>
        </MenuItem>
        <Title>{idol}</Title>
        <MenuItem>
          <MenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_19_805)">
                <path
                  d="M18.6857 8.40019C20.3899 8.40019 21.7714 7.01867 21.7714 5.31447C21.7714 3.61028 20.3899 2.22876 18.6857 2.22876C16.9815 2.22876 15.6 3.61028 15.6 5.31447C15.6 7.01867 16.9815 8.40019 18.6857 8.40019Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
                <path
                  d="M18.6857 21.7715C20.3899 21.7715 21.7714 20.39 21.7714 18.6858C21.7714 16.9816 20.3899 15.6001 18.6857 15.6001C16.9815 15.6001 15.6 16.9816 15.6 18.6858C15.6 20.39 16.9815 21.7715 18.6857 21.7715Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
                <path
                  d="M8.04514 10.632L15.9291 6.69263"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
                <path
                  d="M15.924 17.3022L8.07599 13.3782"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
                <path
                  d="M5.31429 15.086C7.01848 15.086 8.40001 13.7045 8.40001 12.0003C8.40001 10.2961 7.01848 8.91455 5.31429 8.91455C3.6101 8.91455 2.22858 10.2961 2.22858 12.0003C2.22858 13.7045 3.6101 15.086 5.31429 15.086Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
              </g>
              <defs>
                <clipPath id="clip0_19_805">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
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
              <g filter="url(#filter0_b_19_808)">
                <ellipse
                  cx="12.2"
                  cy="5.2"
                  rx="1.2"
                  ry="1.2"
                  transform="rotate(90 12.2 5.2)"
                  fill="white"
                />
              </g>
              <g filter="url(#filter1_b_19_808)">
                <ellipse
                  cx="12.2"
                  cy="12.4"
                  rx="1.2"
                  ry="1.2"
                  transform="rotate(90 12.2 12.4)"
                  fill="white"
                />
              </g>
              <g filter="url(#filter2_b_19_808)">
                <ellipse
                  cx="12.2"
                  cy="19.5999"
                  rx="1.2"
                  ry="1.2"
                  transform="rotate(90 12.2 19.5999)"
                  fill="white"
                />
              </g>
              <defs>
                <filter
                  id="filter0_b_19_808"
                  x="-8.99997"
                  y="-16"
                  width="42.4"
                  height="42.3999"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_19_808"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_19_808"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_b_19_808"
                  x="-8.99997"
                  y="-8.80005"
                  width="42.4"
                  height="42.3999"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_19_808"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_19_808"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter2_b_19_808"
                  x="-8.99997"
                  y="-1.6001"
                  width="42.4"
                  height="42.3999"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_19_808"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_19_808"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </MenuItem>
        </MenuItem>
      </Menu>
      <CoverImg
        src={`/src/assets/idol/product/${idol}/${product}/${order}.png`}
        alt={product}
        onError={(e) => {
          (
            e.target as HTMLImageElement
          ).src = `/src/assets/idol/logo/default.png`; // 대체 이미지 설정
        }}
      />
      <Contents>
        <ContentTypeDate>
          <div>{detail.type}</div>
          <div>·</div>
          <div>{getTimeDifferenceString(new Date(detail.date))}</div>
        </ContentTypeDate>
        <ContentBox>
          <div>
            <ContentPrice>{detail.price.toLocaleString()}원</ContentPrice>
            {/* 가격을 세 자리 단위로 끊어서 출력 */}
            <ContentTitle>{detail.title}</ContentTitle>
          </div>
          <ContentChatLikes>
            <ContentChatLike>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9.00002 14.2445H8.76817C7.93639 14.2063 7.12101 13.9675 6.38726 13.5443C6.38678 13.5441 6.3863 13.5438 6.38581 13.5435L6.19234 13.4307L5.92239 13.2733L5.62054 13.3541L4.28986 13.7105L4.64626 12.3809L4.72724 12.0788L4.56959 11.8087L4.45575 11.6136C4.45565 11.6135 4.45554 11.6133 4.45544 11.6131C3.99308 10.8172 3.75002 9.91155 3.75002 8.99727C3.75002 6.1024 6.103 3.75 9.00002 3.75C11.897 3.75 14.25 6.1024 14.25 8.99727C14.25 11.8921 11.897 14.2445 9.00002 14.2445Z"
                  stroke="#9EA3B2"
                  stroke-width="1.5"
                />
              </svg>
              {detail.chats}
            </ContentChatLike>
            <ContentChatLike>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9.00001 14.4001L3.72458 9.33643C2.35847 8.02445 2.35847 5.89606 3.72458 4.58408C5.09068 3.2721 7.30894 3.2721 8.67505 4.58408L9.00001 4.8954L9.32495 4.58408C10.6911 3.2721 12.9093 3.2721 14.2754 4.58408C15.6415 5.89606 15.6415 8.02445 14.2754 9.33643L9.00001 14.4001Z"
                  stroke="#9EA3B2"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linejoin="round"
                />
              </svg>
              {detail.likes}
            </ContentChatLike>
          </ContentChatLikes>
        </ContentBox>
        <Content>{detail.content}</Content>
        <Seller>
          <Sellerimg
            src={`/src/assets/member/${detail.id}.png`}
            alt={product}
            onError={(e) => {
              (
                e.target as HTMLImageElement
              ).src = `/src/assets/member/default.png`; // 대체 이미지 설정
            }}
          />
          <SellerIdRating>
            <SellerId>{detail.id}</SellerId>
            <SellerRating>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
              >
                <path
                  d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                  fill="#FFC700"
                />
              </svg>
              4.8
            </SellerRating>
          </SellerIdRating>
        </Seller>
      </Contents>
      <LikeChatBox>
        <LikeButton onClick={handleLikeClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M14 22L6.46368 14.4983C4.51211 12.5546 4.51211 9.40143 6.46368 7.45775C8.41526 5.51408 11.5842 5.51408 13.5358 7.45775L14 7.91897L14.4642 7.45775C16.4158 5.51408 19.5847 5.51408 21.5363 7.45775C23.4879 9.40143 23.4879 12.5546 21.5363 14.4983L14 22Z"
              fill={liked ? "#F89E86" : "#9EA3B2"} // 좋아요 상태에 따라 색상 변경
              stroke={liked ? "#F89E86" : "#9EA3B2"} // 좋아요 상태에 따라 색상 변경
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linejoin="round"
            />
          </svg>
        </LikeButton>
        <ChatButton>채팅하기</ChatButton>
      </LikeChatBox>
      <div>{detail.sold}</div>
    </Wrapper>
  );
}
