import { BoardMock } from "../mocks";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useLoginUserStore from "../stores/login-user.store";
import styled from "styled-components";
import { Board } from "types/interface";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 326px;
  padding: 44px 0px 68px;
  position: relative;
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

const More = styled.div`
  position: absolute;
  top: 100px;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: rgb(24, 26, 32, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const MoreItem = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 34px;
  letter-spacing: -0.025em;
  border: 1px solid rgb(24, 26, 32);
  padding: 10px 40px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f89e86;
    color: white;
  }
`;

const CoverImgBox = styled.div`
  display: flex;
  width: 390px;
  height: 390px;
  overflow: hidden;
  position: relative;
`;

const CoverImg = styled.img`
  width: 390px;
  height: 390px;
  object-fit: cover;
  flex-shrink: 0;
  transition: transform 0.5s ease;
`;

const ArrowButton = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 1;
  padding: 10px;
`;

const PrevButton = styled(ArrowButton)`
  left: 10px;
`;

const NextButton = styled(ArrowButton)`
  right: 10px;
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
  const { idol, product, boardNumber } = useParams(); // 게시물 path variable 상태
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
  const { pathname } = useLocation();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [board, setBoard] = useState<Board | null>(null);
  const [showMore, setShowMore] = useState<boolean>(false);
  const { loginUser } = useLoginUserStore(); // 로그인 유저 상태

  // 이전 페이지 이동
  const handleBack = () => {
    navigate(-1);
  };

  // 메인 페이지 이동
  const handleHome = () => {
    navigate("/");
  };

  // more 버튼 클릭 이벤트 처리
  const onMoreButtonClickHandler = () => {
    setShowMore(!showMore);
  };

  // 게시물 수정 클릭 이벤트
  const onUpdateButtonClickHandler = () => {
    if (!board || !loginUser) return;
    if (loginUser.email !== board.writerEmail) return;
    navigate(`${pathname}/update`); // 현재 경로 + /update
  };

  // 게시물 삭제 클릭 이벤트
  const onDeleteButtonClickHandler = () => {
    if (!board || !loginUser) return;
    if (loginUser.email !== board.writerEmail) return;
    // Todo: Elete Request
    navigate("/"); // 현재 경로 + /update
  };

  // 사진 이전 버튼 클릭 이벤트
  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : board!.boardImageList.length - 1
    );
  };

  // 사진 다음 버튼 클릭 이벤트
  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < board!.boardImageList.length - 1 ? prevIndex + 1 : 0
    );
  };

  // 닉네임 버튼 클릭 이벤트 처리
  const onNicknameClickHandler = () => {
    if (!board) return;
    navigate(`/user/${board.writerEmail}`);
  };

  // 좋아요 버튼 클릭을 처리하는 함수
  const onFavoriteClickHandler = () => {
    setIsFavorite(!isFavorite);
  };

  // 게시물 번호 path variavle이 바뀔때 마다 게시물 불러오기
  useEffect(() => {
    setBoard(BoardMock);
  }, [boardNumber]);

  // 게시물이 존재하지 않으면 return
  if (!board) return <></>;
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
          <MenuItem style={{ cursor: "pointer" }}>
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
          <MenuItem
            style={{ marginLeft: "12px", cursor: "pointer" }}
            onClick={onMoreButtonClickHandler}
          >
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
      {showMore && (
        <More>
          <MoreItem onClick={onUpdateButtonClickHandler}>수정</MoreItem>
          <MoreItem onClick={onDeleteButtonClickHandler}>삭제</MoreItem>
        </More>
      )}
      <CoverImgBox>
        {board.boardImageList.length > 0 ? (
          board.boardImageList.map((image, index) => (
            <CoverImg
              src={image}
              key={image}
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            />
          ))
        ) : (
          <CoverImg src="/src/assets/idol/logo/default.png" alt="default" />
        )}
        {board.boardImageList.length > 1 && (
          <>
            <PrevButton onClick={handlePrevClick}>&lt;</PrevButton>
            <NextButton onClick={handleNextClick}>&gt;</NextButton>
          </>
        )}
      </CoverImgBox>
      <Contents>
        <ContentTypeDate>
          <div>{board?.type}</div>
          <div>·</div>
          <div>{getTimeDifferenceString(new Date(board!.writeDatetime))}</div>
        </ContentTypeDate>
        <ContentBox>
          <div>
            <ContentPrice>{board?.price.toLocaleString()}원</ContentPrice>
            {/* 가격을 세 자리 단위로 끊어서 출력 */}
            <ContentTitle>{board!.title}</ContentTitle>
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
              {board.chatCount}
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
              {board.favoriteCount}
            </ContentChatLike>
          </ContentChatLikes>
        </ContentBox>
        <Content>{board!.content}</Content>
        <Seller>
          <Sellerimg
            src={
              board?.writerProfileImage
                ? board?.writerProfileImage
                : `/src/assets/member/default.png` // 대체 이미지 설정
            }
            alt={product}
          />
          <SellerIdRating>
            <SellerId>{board?.writerNickname}</SellerId>
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
        <LikeButton onClick={onFavoriteClickHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M14 22L6.46368 14.4983C4.51211 12.5546 4.51211 9.40143 6.46368 7.45775C8.41526 5.51408 11.5842 5.51408 13.5358 7.45775L14 7.91897L14.4642 7.45775C16.4158 5.51408 19.5847 5.51408 21.5363 7.45775C23.4879 9.40143 23.4879 12.5546 21.5363 14.4983L14 22Z"
              fill={isFavorite ? "#F89E86" : "#9EA3B2"} // 좋아요 상태에 따라 색상 변경
              stroke={isFavorite ? "#F89E86" : "#9EA3B2"} // 좋아요 상태에 따라 색상 변경
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linejoin="round"
            />
          </svg>
        </LikeButton>
        <ChatButton>채팅하기</ChatButton>
      </LikeChatBox>
      <div>{board.sold}</div>
    </Wrapper>
  );
}
