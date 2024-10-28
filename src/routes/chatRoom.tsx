import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChatService } from "../services/ChatService";
import useLoginUserStore from "../stores/login-user.store";
import {
  getChatRoomListRequest,
  getMessagesRequest as getMessageRequest,
} from "../apis";
import { useCookies } from "react-cookie";
import {
  GetChatRoomListResponseDto,
  GetMessageResponseDto,
} from "apis/response/chat";
import { ResponseDto } from "apis/response";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  min-height: 99vh;
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

const ChatBoard = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.025em;
`;

const ChatBox = styled.div<{ isDifferent?: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  margin: ${(props) => (props.isDifferent ? "10px 0 0 0" : "0 0 0 50px")};
`;

const ChatBoxMe = styled(ChatBox)`
  justify-content: flex-end;
`;

const ChatWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Chatimg = styled.img<{ isDifferent?: boolean }>`
  min-width: 40px;
  width: 40px;
  height: 40px;
  margin-top: 15px;
  border-radius: 50%;
  object-fit: cover;
  display: ${(props) => (props.isDifferent ? "block" : "none")};
`;

const ChatContent = styled.div`
  max-width: 85%;
  width: fit-content;
  padding: 5px 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: -0.025em;
  color: #ffffff;
  background-color: #252932;
  position: relative;
`;

const ChatContentMe = styled(ChatContent)`
  background-color: #f89e86;
`;

const ChatTime = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
`;

const ChatInputBox = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 390px;
  height: 68px;
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: -0.025em;
  color: #ffffff;
  background-color: #181a20;
  border: 1px solid #35383f;
  border-top: 0px;
`;

const Input = styled.input<{ hasValue: boolean }>`
  width: 300px;
  height: 45px;
  border: 1px solid #252932;
  border-radius: 16px;
  padding: 19px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: #ffffff;
  box-shadow: ${(props) =>
    props.hasValue ? " 0 0 0 1px #9ea3b2" : " 0 0 0 1px #252932"};
  background-color: #252932;
  outline: none;
  &::placeholder {
    color: #777c89;
  }
  &:focus {
    box-shadow: 0 0 0 1px #f89e86;
    background-color: rgba(248, 158, 134, 0.1);
  }
  /* 자동완성이 될 때 배경색 변경 */
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #252932 inset, 0 0 0 1px #9ea3b2;
    -webkit-text-fill-color: #ffffff !important;
    caret-color: #ffffff !important;
  }
`;

const Button = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0 0 0 10px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ChatRoom = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
  const { roomId } = useParams<{ roomId: string }>();
  const { loginUser } = useLoginUserStore(); // 로그인 유저 상태
  const [messages, setMessages] = useState<
    { senderEmail: string; content: string; timestamp: string }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatRoomUser, setChatRoomUser] = useState<{
    id: number;
    email: string;
    nickname: string;
    profileImage: string | null;
  } | null>(null); // 초기값을 null로 설정
  const [cookies, setCookies] = useCookies();

  const getChatRoomListResponse = (
    responseBody: GetChatRoomListResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) {
      console.error("네트워크 이상입니다.");
      return;
    }
    const { code } = responseBody;
    if (code !== "SU") {
      console.error("Failed to fetch messages:", responseBody);
      return;
    }

    const { chatRoomList } = responseBody as GetChatRoomListResponseDto;

    const updatedChatRoom = chatRoomList
      .filter((chatRoom) => chatRoom.id === Number(roomId)) // roomId와 일치하는 chatRoom만 필터링
      .map((chatRoom) => {
        const user =
          chatRoom.user1.email === loginUser!.email
            ? chatRoom.user2
            : chatRoom.user1; // 로그인된 유저와 다른 유저 선택
        return {
          id: chatRoom.id,
          email: user.email,
          nickname: user.nickname,
          profileImage: user.profileImage,
        };
      })[0];
    if (!updatedChatRoom) {
      // 로그인 유저가 포함되지 않은 채팅방
      console.error("권한이 없습니다.");
      navigate("/");
      return;
    }
    setChatRoomUser(updatedChatRoom);
    console.log(chatRoomUser);
  };

  // WebSocket을 통해 메시지를 수신
  const { sendMessage } = useChatService(roomId as string, (message) => {
    message.timestamp = new Date().toISOString();
    const formattedMessages = formatMessage(message);
    message.timestamp = formattedMessages.timestamp;
    setMessages((prev) => [...prev, message]);
  });

  // 메시지 가져오기 응답 처리 함수
  const getMessageResponse = (
    responseBody: GetMessageResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) {
      console.error("네트워크 이상입니다.");
      return;
    }
    const { code } = responseBody;
    if (code !== "SU") {
      console.error("Failed to fetch messages:", responseBody);
      return;
    }

    const { messages } = responseBody as GetMessageResponseDto;
    const formattedMessages = messages.map((msg: any) => formatMessage(msg));
    setMessages(formattedMessages);
  };

  // 메시지를 가져오는 useEffect
  useEffect(() => {
    if (loginUser && roomId) {
      getChatRoomListRequest(loginUser.email, cookies.accessToken).then(
        getChatRoomListResponse
      );
      getMessageRequest(roomId, cookies.accessToken).then(getMessageResponse);
    }
  }, [roomId, loginUser]);

  // 타임스탬프를 포맷팅
  const formatMessage = (msg: any) => {
    const date = new Date(msg.timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHour = String(hours).padStart(2, "0");
    const formattedMinute = String(minutes).padStart(2, "0"); // 2자리로 포맷
    const timeString = `${formattedHour}:${formattedMinute}`;

    return {
      senderEmail: msg.senderEmail,
      content: msg.message,
      timestamp: timeString,
    };
  };

  // 이전 페이지 이동
  const handleBack = () => {
    navigate(-1);
  };

  // 메인 페이지 이동
  const handleHome = () => {
    navigate("/");
  };

  // 검색 페이지 이동
  const handleSearch = () => {
    navigate("/search");
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && loginUser!.email) {
      sendMessage(loginUser!.email, inputMessage);
      setInputMessage(""); // 메시지 보낸후 비우기
    } else if (!loginUser!.email) {
      console.error("User email is undefined.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
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
        <Title>{chatRoomUser?.nickname}</Title>
        <MenuItem>
          <MenuItem onClick={handleSearch} style={{ cursor: "pointer" }}>
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
      <ChatBoard>
        <div>
          {messages.map((msg, index) => (
            <>
              {msg.senderEmail === loginUser!.email ? (
                <>
                  <ChatBoxMe
                    key={index}
                    isDifferent={
                      index === 0 ||
                      msg.senderEmail !== messages[index - 1].senderEmail
                    }
                  >
                    <ChatTime>{msg.timestamp}</ChatTime>
                    <ChatContentMe>{msg.content}</ChatContentMe>
                  </ChatBoxMe>
                </>
              ) : (
                <>
                  <ChatWrapper>
                    <Chatimg
                      src={
                        chatRoomUser?.profileImage
                          ? chatRoomUser?.profileImage
                          : `/src/assets/member/default.png` // 대체 이미지 설정
                      }
                      isDifferent={
                        index === 0 ||
                        msg.senderEmail !== messages[index - 1].senderEmail
                      }
                    />
                    <ChatBox
                      key={index}
                      isDifferent={
                        index === 0 ||
                        msg.senderEmail !== messages[index - 1].senderEmail
                      }
                    >
                      <ChatContent>{msg.content}</ChatContent>
                      <ChatTime>{msg.timestamp}</ChatTime>
                    </ChatBox>
                  </ChatWrapper>
                </>
              )}
            </>
          ))}
        </div>
      </ChatBoard>
      <ChatInputBox>
        <Input
          onChange={(e) => setInputMessage(e.target.value)}
          name="inputMessage"
          value={inputMessage}
          placeholder="메시지 보내기"
          type="text"
          onKeyDown={handleKeyDown}
          required
          hasValue={inputMessage.length > 0}
        />
        <Button onClick={handleSendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ transform: "scale(-1, 1)" }}
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </ChatInputBox>
    </Wrapper>
  );
};

export default ChatRoom;
