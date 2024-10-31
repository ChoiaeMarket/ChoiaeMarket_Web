# 최애마켓 | ChoiaeMarket

K-pop 아이돌 팬들을 위한 **굿즈 중고거래 플랫폼**

## 목표와 기능

### 목표

- 아이돌 굿즈를 사고파는 중고거래 플랫폼
- 팬덤과의 소통과 상호작용을 위한, 팬들을 위한 플랫폼
- 아이돌 팬덤별 커뮤니티를 구축 및 맞춤 서비스를 제공하는 플랫폼
- 팬들이 직접 참여하고 키워가는 플랫폼
- 자신의 아이돌에 대한 애정과 가치를 다른 팬들과 공유하는 플랫폼

### 기능

- 아이돌 팬덤별 굿즈 분류를 통한 맞춤형 서비스
- 굿즈 실시간 판매 시세 제공
- 판매 게시물 등록 및 관리
- 실시간 채팅
  - 판매자와 구매자의 1대1 매칭
- SNS 계정을 통한 간단한 회원가입

## 기술 스택 및 의존성

### 기술 스택

- **UI/UX**: Figma
- **Frontend**: React
- **Backend**: Spring Boot
- **Database**: MySQL
- **Deployment**: AWS EC2 (예정)

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

## ERD 및 API 명세서

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

### REST API 명세서

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

## 프로젝트 구조와 개발 일정

### 프로젝트 구조

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

### 개발 일정

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

- 이메일 회원가입
- 프로필 설정

### [로그인]

- 이메일 로그인
- SNS 로그인

### [상하단 네이게이션바]

### [메인]

### [아이돌 메인]

### [아이돌 상품 목록]

### [검색]

### [검색 결과]

- 연관 검색어

### [관심 목록]

### [상품 등록]

### [상품 상세]

- 내 상품
- 상품 상세 페이지 수정
- 상품 상세 페이지 삭제

### [채팅 목록]

### [채팅방]

### [프로필]

- 내 프로필
- 다른 사용자 프로필

### [프로필 수정]

## 프론트엔드

### 사용자 인터페이스(UI)

- 홈 화면 : 인기 상품, 최신 상품, 추천 상품 등을 표시하는 카드 레이아웃
- 상품 목록 화면 : 카테고리별로 상품을 필터링하고 검색할 수 있는 인터페이스
- 상품 상세 화면 : 상품의 사진, 설명, 가격, 판매자 정보 등을 표시하는 페이지
- 사용자 프로필 화면 : 사용자 정보, 구매 내역, 판매 내역 등을 관리할 수 있는 페이지

### 사용자 경험(UX)

- 간편한 검색 및 필터링 기능을 제공하여 사용자가 원하는 상품을 쉽게 찾을 수 있도록 함
- 편리한 결제 시스템을 구현하여 사용자가 쉽고 안전하게 상품을 구매할 수 있도록 함
- 사용자 프로필을 통해 구매 내역과 판매 내역을 관리할 수 있는 기능을 제공함

### 기능 요구사항

- 상품 등록 및 수정 기능 : 판매자가 상품 정보를 등록하고 수정할 수 있도록 함
- 상품 검색 기능 : 상품명이나 카테고리로 상품을 검색할 수 있도록 함
- 사용자 인증 기능 : 회원가입, 로그인, 로그아웃 기능을 구현하여 사용자를 인증함

## 백엔드

### 데이터베이스 모델링

- 상품 정보를 저장할 데이터베이스 테이블을 설계함
- 사용자 정보와 사용자 세션 정보를 저장할 데이터베이스 테이블을 설계함
- 주문 정보를 저장할 데이터베이스 테이블을 설계함

### API 설계

- 상품 조회 API : 상품 목록을 반환하는 API를 구현함
- 상품 등록 및 수정 API : 판매자가 상품 정보를 등록하고 수정할 수 있도록 함
- 사용자 관리 API : 회원가입, 로그인, 로그아웃 기능을 제공하는 API를 구현함
- 주문 처리 AP I: 사용자가 상품을 구매할 때 주문 정보를 생성하고 결제를 처리하는 API를 구현함

### 보안 및 성능

- 사용자 인증 및 권한 부여 : 사용자 인증을 위한 보안 기능을 구현하고, 권한이 없는 사용자의 요청을 거부함.
- 데이터베이스 인덱싱 : 검색 및 필터링 기능의 성능을 향상시키기 위해 데이터베이스 인덱싱을 적절히 사용함.
- API 보안 : API 요청에 대한 인증 및 인가를 수행하여 보안을 강화함.

# 프로세스

### 등록

1. 카테고리 등록
2. 게시글 등록 + 이미지 업로드
3. 메일 알림 전송
4. 거래 상태 등록 (대기)

### 검색

1. 전체 게시글 검색
2. 키워드 검색
3. 키워드 + 필터 검색

### 구매

- 대화 → 예약 → 구매확정

1. 대화 - STOMP 방식을 통한 실시간 채팅
2. 예약 - 거래 상태 변경 (예약)
3. 메일 알림 전송
4. 구매 확정 - 거래 상태 변경 (승인)
5. 메일 알림 전송

### 삭제

1. 게시글 삭제
2. 이미지 삭제
3. 거래 상태 삭제

## 에러

## 개선 목표

구매 프로세스 구축

- 채팅 → 예약 → 구매확정

1. 실시간 채팅방을 통한 예약
2. 게시물 상태 변경 (일반 → 예약)
3. 구매 후 게시물 상태 변경 (예약 → 확정)

## 느낀점

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
