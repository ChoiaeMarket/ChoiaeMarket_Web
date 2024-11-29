# 최애마켓 | ChoiaeMarket
![최애마켓 배너](https://github.com/user-attachments/assets/89ec7e29-8579-4be3-8a91-dadeb95cffed)

K-pop 아이돌 팬들을 위한 **굿즈 중고거래 플랫폼**

## 목표

- 아이돌 굿즈를 사고파는 중고거래 플랫폼
- 팬덤과의 소통과 상호작용을 위한, 팬들을 위한 플랫폼
- 아이돌 팬덤별 커뮤니티를 구축 및 맞춤 서비스를 제공하는 플랫폼
- 팬들이 직접 참여하고 키워가는 플랫폼
- 자신의 아이돌에 대한 애정과 가치를 다른 팬들과 공유하는 플랫폼

## 기능

- 아이돌 팬덤별 굿즈 분류를 통한 맞춤형 서비스
- 굿즈 실시간 판매 시세 제공
- 판매 게시물 등록 및 관리
- 실시간 채팅
  - 판매자와 구매자의 1대1 매칭
- SNS 계정을 통한 간단한 회원가입

## 기술 스택

- **UI/UX**: Figma
- **Frontend**: React
- **Backend**: Spring Boot
- **Database**: MySQL
- **Deployment**: AWS EC2 (예정)

## 의존성

### 프론트엔드 의존성

```
@stomp/stompjs               7.0.0
axios                        1.6.8
react                        18.2.0
react-cookie                 7.1.4
react-dom                    18.2.0
react-router-dom             6.14.2
sockjs-client                1.6.1
styled-components            6.0.7
styled-reset                 4.5.2
zustand                      4.5.2
```

### 백엔드 의존성

```
spring-boot-starter-data-jpa
spring-boot-starter-mail
spring-boot-starter-oauth2-client
spring-boot-starter-security
spring-boot-starter-validation
spring-boot-starter-web
spring-boot-starter-websocket
io.jsonwebtoken:jjwt-api     0.11.2
io.jsonwebtoken:jjwt-impl    0.11.2
io.jsonwebtoken:jjwt-jackson 0.11.2
```

## ERD

```mermaid
erDiagram

    search_log {
        INT sequence PK "시퀀스"
        TEXT search_word "검색어"
        TEXT relation_word "관련 검색어"
        BOOLEAN relation "관련 검색어 여부"
    }

    chat_rooms {
        INT id PK "채팅방 ID"
        VARCHAR user1_email FK "첫 번째 유저 이메일"
        VARCHAR user2_email FK "두 번째 유저 이메일"
        TEXT last_message "마지막 메시지 내용"
        TIMESTAMP last_timestamp "마지막 메시지 전송 시간"
    }

    board {
        INT board_number PK "게시물 번호"
        VARCHAR idol "아이돌"
        VARCHAR type "상품 타입"
        TEXT name "상품 이름"
        TEXT title "게시물 제목"
        TEXT content "게시물 내용"
        INT price "게시물 가격"
        INT chat_count "게시물 채팅 수"
        INT favorite_count "게시물 좋아요 수"
        BOOLEAN sold "게시물 팔림 유무"
        DATETIME write_datetime "게시물 작성 날짜 및 시간"
        VARCHAR writer_nickname "게시물 작성자 닉네임"
        TEXT writer_profile_image "게시물 작성자 프로필 사진"
        VARCHAR writer_email FK "게시물 작성자 이메일"
        INT product_number FK "상품 번호"
    }

    favorite {
        VARCHAR user_email PK, FK "사용자 이메일"
        INT board_number PK, FK "게시물 번호"
    }

    image {
        INT sequence PK "이미지 번호"
        INT board_number FK "게시물 번호"
        TEXT image "게시물 사진 URL"
    }

    product {
        INT product_number PK "상품 번호"
        VARCHAR idol "아이돌"
        VARCHAR type "상품 타입"
        TEXT name "상품 이름"
        TEXT image "상품 사진"
        INT price_avg "상품 평균 가격"
        INT sold_count "상품 거래 내역"
        INT favorite_count "상품 좋아요 수"
    }

    user {
        VARCHAR email PK "사용자 이메일"
        VARCHAR password "사용자 비밀번호"
        VARCHAR type "사용자 계정 타입"
        VARCHAR name "사용자 이름"
        VARCHAR nickname "사용자 닉네임"
        VARCHAR tel "사용자 전화번호"
        BOOLEAN gender "사용자 성별"
        TEXT profile_image "사용자 프로필 사진"
        BOOLEAN agreed_personal "개인 정보 동의 여부"
    }

    certification {
        VARCHAR email PK "사용자 이메일"
        VARCHAR certification_number "인증 번호"
    }

    messages {
        INT id PK "메시지 ID"
        INT chat_room_id FK "채팅방 ID"
        VARCHAR sender_email FK "메시지를 보낸 유저 이메일"
        TEXT message "메시지 내용"
        TIMESTAMP timestamp "메시지 전송 시간"
    }

    board_list_view {
        INT board_number "게시물 번호"
        VARCHAR idol "아이돌"
        TEXT name "상품 이름"
        TEXT title "게시물 제목"
        TEXT content "게시물 내용"
        INT price "가격"
        BOOLEAN sold "판매 여부"
        INT chat_count "채팅 수"
        INT favorite_count "좋아요 수"
        DATETIME write_datetime "작성 시간"
        VARCHAR writer_email FK "작성자 이메일"
        TEXT image "대표 이미지 URL"
    }

    board ||--o| user : "작성자"
    board ||--o| product : "상품 번호 참조"
    image ||--o| board : "게시물 참조"
    favorite ||--o| board : "게시물 참조"
    favorite ||--o| user : "사용자 참조"
    messages ||--o| chat_rooms : "채팅방 참조"
    messages ||--o| user : "발신자 참조"
    chat_rooms ||--o| user : "유저 참조"

    %% 뷰와 관련된 관계
    board_list_view ||--o| board : "게시물 정보"
    board_list_view ||--o| user : "작성자 정보"
    board_list_view ||--o| image : "대표 이미지"
```

## REST API 명세서

[최애마켓 REST API 명세서 - Notion 링크](https://nodb.notion.site/REST-API-59bcb52995f6445eb16b824847a8ae64?pvs=4)

## URL 구조

| URL                         | 설명                      | 로그인 권한 필요 |
| :-------------------------- | :------------------------ | :--------------: |
| /login                      | 로그인 페이지             |                  |
| /join                       | 회원가입 페이지           |                  |
| /register                   | 회원 정보 등록 페이지     |                  |
| /                           | 메인(아이돌 목록) 페이지  |        ✅        |
| /cart                       | 관심 목록 페이지          |        ✅        |
| /upload                     | 상품 게시물 등록 페이지   |        ✅        |
| /chat                       | 채팅방 목록 페이지        |        ✅        |
| /chat/{roomId}              | 채팅방 페이지             |        ✅        |
| /user/{user}                | 사용자 프로필 페이지      |        ✅        |
| /user/{user}/update         | 사용자 프로필 수정 페이지 |        ✅        |
| /search                     | 검색 페이지               |        ✅        |
| /search/{searchWord}        | 특정 검색어 결과 페이지   |        ✅        |
| /idol/{idol}                | 아이돌 메인 페이지        |        ✅        |
| /idol/{idol}/{product}      | 아이돌 상품 목록 페이지   |        ✅        |
| /board/{boardNumber}        | 상품 게시물 페이지        |        ✅        |
| /board/{boardNumber}/update | 상품 게시물 수정 페이지   |        ✅        |
| \*                          | 404 페이지                |                  |

## 프로젝트 구조

### 프론트엔드 프로젝트 구조

[프론트엔드 깃허브](https://github.com/ChoiaeMarket/ChoiaeMarket_Web)

```
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
│
├── .vscode
│   └── settings.json
│
└── src
    ├── App.tsx
    ├── main.tsx
    ├── vite-env.d.ts
    │
    ├── apis
    │   ├── index.ts
    │   ├── request
    │   │   ├── auth
    │   │   │   ├── check-certification.request.dto.ts
    │   │   │   ├── email-certification.request.dto.ts
    │   │   │   ├── index.ts
    │   │   │   ├── sign-in.request.dto.ts
    │   │   │   └── sign-up.request.dto.ts
    │   │   ├── board
    │   │   │   ├── index.ts
    │   │   │   ├── patch-board.request.dto.ts
    │   │   │   └── post-board.request.dto.ts
    │   │   ├── chat
    │   │   │   └── post-chat-room.request.dto.ts
    │   │   └── user
    │   │       ├── index.ts
    │   │       ├── patch-profile-image.request.dto.ts
    │   │       └── patch-profile.request.dto.ts
    │   └── response
    │       ├── index.ts
    │       ├── response.dto.ts
    │       ├── auth
    │       │   ├── check-certification.response.dto.ts
    │       │   ├── email-certification.response.dto.ts
    │       │   ├── email-check.response.dto.ts
    │       │   ├── index.ts
    │       │   ├── sign-in.response.dto.ts
    │       │   └── sign-up.response.dto.ts
    │       ├── board
    │       │   ├── delete-board.response.dto.ts
    │       │   ├── get-board-list.response.dto.ts
    │       │   ├── get-board.response.dto.ts
    │       │   ├── get-favorite-board-list.response.dto.ts
    │       │   ├── get-favorite.response.dto.ts
    │       │   ├── get-search-board-list.response.dto.ts
    │       │   ├── get-user-board-list.response.dto.ts
    │       │   ├── index.ts
    │       │   ├── patch-board.response.dto.ts
    │       │   ├── post-board.response.dto.ts
    │       │   └── put-favorite.response.dto.ts
    │       ├── chat
    │       │   ├── get-chatroom-list.response.dto.ts
    │       │   ├── get-message.response.dto.ts
    │       │   ├── index.ts
    │       │   └── post-chat.response.dto.ts
    │       ├── search
    │       │   ├── get-popular-list.response.dto.ts
    │       │   ├── get-relation-list.response.ts
    │       │   └── index.ts
    │       └── user
    │           ├── get-sign-in-user.response.dto.ts
    │           ├── get-user.response.dto.ts
    │           ├── index.ts
    │           ├── patch-profile-image.response.dto.ts
    │           └── patch-profile.response.dto.ts
    │
    ├── assets
    │   ├── icon
    │   │   ├── back.png
    │   │   └── check.png
    │   │        .
    │   │        .
    │   ├── idol
    │   │   ├── cover
    │   │   │   ├── 8TURN.jpg
    │   │   │   └── AB6IX.jpg
    │   │   │        .
    │   │   │        .
    │   │   └── logo
    │   │   │   ├── 8TURN.jpg
    │   │   │   └── AB6IX.jpg
    │   │   │        .
    │   │   │        .
    │   ├── logo
    │   │   ├── logo.png
    │   │   └── logoWhite.png
    │   └── member
    │       └── default.png
    │
    ├── components
    │   ├── auth-components.ts
    │   ├── board-item.tsx
    │   ├── idolList.ts
    │   ├── loading-screen.tsx
    │   ├── navigation-bar.tsx
    │   ├── pagination.tsx
    │   ├── product-item.tsx
    │   └── protected-route.tsx
    │
    ├── hooks
    │   ├── index.ts
    │   └── pagination.hook.ts
    │
    ├── mocks
    │   ├── board-list.mock.ts
    │   ├── board.mock.ts
    │   ├── index.ts
    │   └── product-list.mock.ts
    │
    ├── routes
    │   ├── board.tsx
    │   ├── boardUpdate.tsx
    │   ├── cart.tsx
    │   ├── chat.tsx
    │   ├── chatRoom.tsx
    │   ├── detail.tsx
    │   ├── home.tsx
    │   ├── idol.tsx
    │   ├── join.tsx
    │   ├── login.tsx
    │   ├── oauth.tsx
    │   ├── register.tsx
    │   ├── search.tsx
    │   ├── searchWord.tsx
    │   ├── upload.tsx
    │   ├── userPage.tsx
    │   └── userUpdate.tsx
    │
    ├── services
    │   └── ChatService.ts
    │
    ├── stores
    │   └── login-user.store.ts
    │
    ├── types
    │   ├── enum
    │   │   ├── index.ts
    │   │   └── response-code.enum.ts
    │   └── interface
    │       ├── board-list-item.interface.ts
    │       ├── board.interface.ts
    │       ├── chatroom-list-item.interface.ts
    │       ├── favorite-list-item.interface.ts
    │       ├── favorite.interface.ts
    │       ├── index.ts
    │       ├── product-list-item.interface.ts
    │       └── user.interface.ts
    │
    └── utils
        └── index.ts

```

### 백엔드 프로젝트 구조

[백엔드 깃허브](https://github.com/ChoiaeMarket/ChoiaeMarket_Server)

```
├── .gitignore
├── build.gradle
├── gradlew
├── gradlew.bat
├── README.md
├── settings.gradle
│
├── .gradle
│    .
│    .
│
├── .vscode
│   └── settings.json
│
└── src─
    └── main
        ├── java
        │   └── com
        │       └── choiaemarket
        │           └── choiaemarket_server
        │               ├── ChoiaemarketServerApplication.java
        │               │
        │               ├── common
        │               │   ├── CertificationNumber.java
        │               │   ├── ResponseCode.java
        │               │   └── ResponseMessage.java
        │               │
        │               ├── config
        │               │   ├── WebSecurityConfig.java
        │               │   └── WebSocketConfig.java
        │               │
        │               ├── controller
        │               │   ├── AuthController.java
        │               │   ├── BoardController.java
        │               │   ├── ChatController.java
        │               │   ├── FileController.java
        │               │   ├── SearchController.java
        │               │   └── UserController.java
        │               │
        │               ├── dto
        │               │   ├── message
        │               │   │   └── ChatMessage.java
        │               │   │
        │               │   ├── object
        │               │   │   ├── BoardListItem.java
        │               │   │   ├── FavoriteListItem.java
        │               │   │   └── ProductListItem.java
        │               │   │
        │               │   ├── request
        │               │   │   ├── auth
        │               │   │   │   ├── CheckCertificationRequestDto.java
        │               │   │   │   ├── EmailCertificationRequestDto.java
        │               │   │   │   ├── SignInRequestDto.java
        │               │   │   │   └── SignUpRequestDto.java
        │               │   │   │
        │               │   │   ├── board
        │               │   │   │   ├── PatchBoardRequestDto.java
        │               │   │   │   └── PostBoardRequestDto.java
        │               │   │   │
        │               │   │   ├── chat
        │               │   │   │   └── PostChatRoomRequestDto.java
        │               │   │   │
        │               │   │   └── user
        │               │   │       ├── PatchProfileImageRequestDto.java
        │               │   │       └── PatchProfileRequestDto.java
        │               │   │
        │               │   └── response
        │               │       ├── ResponseDto.java
        │               │       │
        │               │       ├── auth
        │               │       │   ├── CheckCertificationResponseDto.java
        │               │       │   ├── EmailCertificationResponseDto.java
        │               │       │   ├── EmailCheckResponseDto.java
        │               │       │   ├── SignInResponseDto.java
        │               │       │   └── SignUpResponseDto.java
        │               │       │
        │               │       ├── board
        │               │       │   ├── DeleteBoardResponseDto.java
        │               │       │   ├── GetBoardResponseDto.java
        │               │       │   ├── GetFavoriteBoardListResponseDto.java
        │               │       │   ├── GetFavoriteResponseDto.java
        │               │       │   ├── GetLatestBoardListResponseDto.java
        │               │       │   ├── GetSearchBoardListResponseDto.java
        │               │       │   ├── GetUserBoardListResponseDto.java
        │               │       │   ├── PatchBoardResponseDto.java
        │               │       │   ├── PostBoardResponseDto.java
        │               │       │   └── PutFavoriteResopnseDto.java
        │               │       │
        │               │       ├── chat
        │               │       │   ├── GetChatRoomListResponseDto.java
        │               │       │   ├── GetMessageResponseDto.java
        │               │       │   └── PostChatRoomResponseDto.java
        │               │       │
        │               │       ├── search
        │               │       │   ├── GetPopularListResponseDto.java
        │               │       │   └── GetRelationListResponseDto.java
        │               │       │
        │               │       └── user
        │               │           ├── GetSignInUserResponseDto.java
        │               │           ├── GetUserResponseDto.java
        │               │           ├── PatchProfileImageResponseDto.java
        │               │           └── PatchProfileResponseDto.java
        │               │
        │               ├── entity
        │               │   ├── BoardEntity.java
        │               │   ├── BoardListViewEntity.java
        │               │   ├── CertificationEntity.java
        │               │   ├── ChatEntity.java
        │               │   ├── ChatRoomEntity.java
        │               │   ├── CustomOAuth2User.java
        │               │   ├── FavoriteEntity.java
        │               │   ├── ImageEntity.java
        │               │   ├── MessageEntity.java
        │               │   ├── ProductEntity.java
        │               │   ├── SearchLogEntity.java
        │               │   ├── UserEntity.java
        │               │   │
        │               │   └── primaryKey
        │               │       ├── ChatPk.java
        │               │       └── FavoritePk.java
        │               │
        │               ├── exception
        │               │   └── BadRequestExceptionHandler.java
        │               │
        │               ├── filter
        │               │   └── JwtAuthenticationFilter.java
        │               │
        │               ├── handler
        │               │   ├── OAuth2SuccessHandler.java
        │               │   └── ValidationExceptionHandler.java
        │               │
        │               ├── provider
        │               │   ├── EmailProvider.java
        │               │   └── JwtProvider.java
        │               │
        │               ├── repository
        │               │   ├── BoardListViewRepository.java
        │               │   ├── BoardRepository.java
        │               │   ├── CertificationRepository.java
        │               │   ├── ChatRepository.java
        │               │   ├── ChatRoomRepository.java
        │               │   ├── FavoriteRepository.java
        │               │   ├── ImageRepository.java
        │               │   ├── MessageRepository.java
        │               │   ├── ProductRepository.java
        │               │   ├── SearchLogRepository.java
        │               │   ├── UserRepository.java
        │               │   │
        │               │   └── resultSet
        │               │       ├── GetPopularListResultSet.java
        │               │       └── GetRelationListResultSet.java
        │               │
        │               └── service
        │                   ├── AuthService.java
        │                   ├── BoardService.java
        │                   ├── ChatRoomService.java
        │                   ├── FileService.java
        │                   ├── MessageService.java
        │                   ├── SearchService.java
        │                   ├── UserService.java
        │                   │
        │                   └── implement
        │                       ├── AuthServiceImplement.java
        │                       ├── BoardServiceImplement.java
        │                       ├── ChatRoomServiceImplement.java
        │                       ├── FileServiceImplement.java
        │                       ├── MessageServiceImplement.java
        │                       ├── OAuth2UserServiceImplement.java
        │                       ├── SearchServiceImplement.java
        │                       └── UserServiceImplement.java
        │
        └── resources
            └── application.properties
```

## 개발 일정

```mermaid
gantt
    title 프로젝트 개발 일정
    dateFormat  YYYY-MM-DD

    section 기획
        프로젝트 주제 선정 :p1, 2024-03-15, 1d
        회원가입/로그인 기능 :p2, after p1, 16d
        상품 게시물 생성/수정/삭제 기능 :p3, after p2, 15d
        상품 게시물 정렬 및 필터 기능 :p4, after p2, 15d
        검색 기능 :p5, 2024-06-01, 15d
        채팅 기능 :p6, 2024-08-15, 17d
        회원가입 메일 인증 기능 :p7, after p6, 15d
        SNS 로그인 기능 :p8, after p6, 15d

    section 디자인
        페이지 디자인 :d1, 2024-03-20, 30d
        아이돌 로고 디자인 :d2, 2024-04-01, 30d
        페이지 리디자인 :d3, 2024-08-01, 31d

    section 프론트엔드
        리액트 프로젝트 생성 :f1, 2024-03-20, 1d
        회원가입 페이지 :f2, after f1, 15d
        로그인 페이지 :f3, after f1, 15d
        회원 정보 등록 페이지 :f4, after f3, 15d
        메인 페이지 :f5, after f3, 15d
        아이돌 메인 페이지 :f6, after f5, 15d
        아이돌 상품 상세 페이지 :f7, after f5, 15d
        상품 정렬 :f8, after f7, 15d
        상품 시세 :f9, after f7, 15d
        상품 게시물 페이지 :f10, after f8, 15d
        검색 페이지 :f11, after f10, 15d
        특정 검색어 결과 페이지 :f12, after f10, 15d
        검색어 결과 로컬 저장 :f13, after f10, 15d
        사진 업로드 :f14, after f13, 15d
        상품 게시물 등록 페이지 :f15, after f13, 15d
        상품 게시물 목업 -> API 연동 :f16, after f13, 15d
        상품 게시물 삭제 :f17, after f16, 15d
        상품 게시물 수정 페이지 :f18, after f16, 15d
        페이지네이션 :f19, after f18, 15d
        장바구니 페이지 :f20, after f18, 15d
        사용자 프로필 페이지 :f21, after f19, 15d
        사용자 프로필 수정 페이지 :f22, after f19, 15d
        사용자 프로필 목업 -> API 연동 :f23, after f19, 15d
        채팅 리스트 페이지 :f24, after f23, 15d
        채팅방 페이지 :f25, after f23, 15d
        채팅방 목업 -> API 연동 :f26, after f23, 15d
        페이지 리디자인 적용 :f27, after f26, 15d
        회원가입 메일 인증 :f28, after f27, 15d
        로그인 OAuth 카카오, 네이버 :f29, after f28, 15d

    section 백엔드
        스프링 프로젝트 생성 :b1, 2024-05-01, 1d
        회원가입 API :b2, after b1, 15d
        로그인 API :b3, after b1, 15d
        사진 업로드 :b4, after b3, 15d
        상품 게시물 생성/불러오기/수정/삭제 API :b5, after b4, 15d
        상품 게시물 좋아요 API :b6, after b4, 15d
        검색어 불러오기 API :b7, after b6, 15d
        연관 검색어 불러오기 API :b8, after b7, 15d
        관심 목록 불러오기 API :b9, after b8, 15d
        사용자 상품 게시물 불러오기 API :b10, after b9, 15d
        사용자 정보 불러오기/수정 API :b11, after b9, 15d
        채팅방 생성/불러오기 API :b12, after b11, 15d
        채팅 API :b13, after b12, 15d
        회원가입 메일 인증 API :b14, after b13, 15d
        로그인 OAuth 카카오, 네이버 API :b15, after b14, 15d
```

## 페이지별 기능

### [회원가입]

- 이메일 주소를 입력하면 입력창에서 유효성 검사 진행(중복 불가)
  - 통과하지 못하면 경고 문구 출력
- 이메일 인증 버튼을 클릭하면 해당 이메일 주소로 인증 번호 전송
- 인증 번호를 입력 후 인증 확인을 클릭하면 유효성 검사 진행
  - 통과하지 못하면 경고 문구 출력

| 회원가입                                                                                                    |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/bebe8738-6916-49c8-a29b-799674bcb93a" width="400px" /> |

### [프로필 설정]

- 비밀번호, 이름, 프로필명, 전화번호, 성별, 프로필 사진 입력
- 이메일은 변경 불가 → 아이디로 사용
- 비밀번호는 8~20자리, 숫자/영문자[대소구분]
- 프로필 사진은 등록하지 않을 경우 기본 이미지
- 프로필명과 전화번호은 유효성 검사 진행(중복 불가)
  - 통과하지 못하면 경고 문구 출력

| 프로필 설정                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/b5486266-8633-4c82-8d67-86229dddf7ee" width="400px" /> |

### [로그인]

- 이메일과 비밀번호를 입력하고 로그인 버튼을 클릭하면 유효성 검사 진행
  - 통과하지 못하면 경고 문구 출력
  - 로그인에 성공하면 메인 화면으로 이동

| 로그인                                                                                                      |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/3c995795-9e63-427f-a028-0492038ffd91" width="400px" /> |

### [카카오 로그인]

- 카카오 버튼을 클릭하면 카카오 로그인에 진입
- 카카오 로그인 성공시 토큰을 발행하고 이메일, 이름, 닉네임,
- 전화번호, 성별을 제공 받아 데이터베이스에 저장
  - 이메일은 “kakao\_이메일 앞 부분”의 형태로 저장
- 이후 프로필 수정에서 변경 가능

| 카카오 로그인                                                                                               |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/1eaa1581-feaa-49fc-9896-5dd5ef41def6" width="400px" /> |

### [네이버 로그인]

- 네이버 버튼을 클릭하면 네이버 로그인에 진입
- 네이버 로그인 성공시 토큰을 발행하고 이메일, 이름, 닉네임,
- 전화번호, 성별을 제공 받아 데이터베이스에 저장
  - 이메일은 “naver\_이메일 앞 부분”의 형태로 저장
- 이후 프로필 수정에서 변경 가능

| 네이버 로그인                                                                                               |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/634fb963-a902-42a1-802d-2bbec38f4e63" width="400px" /> |

### [메인]

- 로그인 성공시 가장 처음에 뜨는 화면
- 상하단 네이게이션바와 아이돌 로고로 구성
- 아이돌 로고 및 이름 클릭시 해당 아이돌 페이지로 진입

| 메인                                                                                                        |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/3964fb90-3e6f-431b-8ae7-04a880e08e99" width="400px" /> |

### [네비게이션바]

- 상단 네비게이션 바
  - 검색
  - 알림
  - 공유
  - 수정/삭제
  - (페이지마다 다름)
- 하당 네비게이션 바
  - 메인
  - 관심 목록
  - 게시물 등록
  - 채팅 목록
  - 프로필

| 네비게이션바                                                                                                |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/78af709d-cc1a-4ca1-9267-48b155c02bdf" width="400px" /> |

### [아이돌 메인]

- 상품 목록
  - 종류에 따른 필터
  - 정렬(최신, 저가, 찜)
- 상품 목록 클릭시 해당 상품 페이지로 진입

| 아이돌 메인                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/a03b2a83-93a8-441b-8c28-f369e10a8e23" width="400px" /> |

### [아이돌 상품 목록]

- 상품 게시물
  - 평균 상품 가격
  - 상품 등록 개수
  - 정렬(최신, 저가, 찜)
- 게시물 클릭시 해당 상품 게시물 페이지로 진입

| 아이돌 상품 목록                                                                                            |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/5b321047-a155-4349-a98e-81cd87bab7a3" width="400px" /> |

### [상품 게시물]

- 상품 정보
  - 이미지
  - 상품 종류
  - 제목
  - 내용
  - 가격
  - 게시 시간
- 유저 클릭시 유저 프로필로 이동
- 좋아요 버튼 클릭시 관심 목록에 추가
  - 다시 누르면 제거
- 채팅 버튼 클릭시 채팅방 생성 및 진입
  - 기존에 있는 방일 경우 해당 방으로 진입

| 상품 게시물                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/ed412afa-4a3f-4e17-be34-f440c76864dd" width="400px" /> |

### [관심 목록]

- 좋아요 누른 상품 게시물 목록
- 게시물 클릭시 해당 상품 게시물 페이지로 진입

| 관심 목록                                                                                                   |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/2eaff364-ceac-4bd9-9e7d-709ef660e324" width="400px" /> |

### [상품 등록]

- 상품 정보
  - 이미지
  - 아이돌
  - 카테고리
  - 상품명
  - 제목
  - 상세 설명
  - 가격
- 등록하기 버튼 클릭시 등록 후 해당 상품 목록 페이지로 진입

| 상품 등록                                                                                                   |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/9347b99b-52ab-4940-a414-378591ee766d" width="400px" /> |

### [상품 수정]

- 로그인된 이메일과 상품 게시물 등록한 이메일을 통해 유효성 검사 진행 후 상단 네비게이션 바에 수정/삭제 목록 표시
- 상품 등록 페이지와 동일하게 필수 입력
- 수정하기 버튼 클릭시 수정 후 해당 상세 페이지로 진입

| 상품 수정                                                                                                   |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/34c3ef85-9adf-46a0-9f0a-4586521cc75d" width="400px" /> |

### [상품 삭제]

- 게시물을 삭제 후 메인 페이지로 진입

| 상품 삭제                                                                                                   |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/a2b6cfb9-db2f-41f6-9093-e0b92f81fae8" width="400px" /> |

### [채팅방]

- 게시물을 게시한 유저와 실시간 1대1 채팅방 생성
  - 기존에 생성된 방일 경우 해당 방으로 진입
  - 채팅 목록에 방 생성
- 채팅을 치지 않고 나올 경우 채팅 목록에서 삭제

| 채팅방                                                                                                      |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/1cf14614-6c68-4da3-8739-427806a16914" width="400px" /> |

### [채팅 목록]

- 생성된 채팅방 목록
- 채팅방 클릭시 해당 채팅방에서의 기존 채팅 불러오기

| 채팅 목록                                                                                                   |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/1ef504b2-9178-4466-8068-3d1790aa3541" width="400px" /> |

### [프로필]

- 로그인된 이메일과 프로필의 이메일을 통해 유효성 검사 진행 후 프로필 편집 및 로그아웃 버튼 생성
- 판매 상품 목록 출력
- 프로필 편집
  - 이름, 이메일 수정 불가
  - 닉네임, 전화번호 수정 가능, 중복 불가(유효성 검사)
  - 프로필 사진 수정 가능, 중복 가능
  - 통과하지 못하면 경고 문구 출력

| 프로필                                                                                                      |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/2a15c9f9-7441-428c-97c2-1a702d389296" width="400px" /> |

### [다른 유저 프로필]

- 해당 유저의 판매 상품 목록 출력

| 다른 유저 프로필                                                                                            |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/b3ebc545-c994-4846-b460-57f8959c847a" width="400px" /> |

### [검색]

- 검색
  - 최근 검색어
- 검색 결과
  - 연관 검색어
  - 검색 상품 목록
  - (검색어가 포함된 아이돌, 카테고리, 상품명, 제목, 상세 내용)
- 검색시 최근 검색어에 추가
- 연달아 검색시 연관 검색어 데이터베이스에 저장

| 검색                                                                                                        |
| ----------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/f721ad81-a1d2-41e8-9391-b0fef41a0d6d" width="400px" /> |

## 개발자

<div align="center">

|                                                          **노다빈**                                                          |
| :--------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/71473708?v=4" height=150 width=150> <br/> @nodb](https://github.com/nodb) |
|                                                       FE │ BE │ UI/UX                                                        |

</div>

## 라이선스

이 프로젝트는 MIT 라이선스로 배포됩니다.
상세한 라이선스 정보는 LICENSE 파일에서 확인할 수 있습니다.
