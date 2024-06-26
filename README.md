# TravelUs 🚌
🔗[TravelUs 바로가기](https://travels-us.netlify.app/ )
- ID: travelus_official@travelsus.com
- PW: 123123

### 목차
1. [TravelUs 서비스 소개](#1-TravelUs-서비스-소개)
2. [개발 기간](#2-개발-기간)
3. [팀 소개](#3-팀-소개)
4. [역할 분담](#4-역할-분담)
5. [협업 방식](#5-협업-방식)
6. [프로젝트 목표](#6-프로젝트-목표)
7. [기능](#7-기능)
8. [컨벤션 및 브랜치 전략](#8-컨벤션-및-브랜치-전략)
9. [개발 환경](#9-개발-환경)
10. [폴더 구조](#10-폴더-구조)
11. [프로젝트 소감](#11-프로젝트-소감)
12. [출처](#12-출처)

## 1. TravelUs 서비스 소개
서비스명 TravelUs는 "Travel"과 "Us"의 합성어로, 함께 여행하자는 의미를 담고 있습니다.
또한 읽을 때, "Travelers"로도 들릴 수 있어 여행자들을 의미하기도 합니다.

그리고 저희 마스코트는 떠돌이 고양이입니다. 떠돌이 고양이처럼 자유롭게 여러 장소를 다니면서 새로운 만남을 한다는 의미에서 선택하게 되었습니다. 

저희 서비스는 동행을 원하는 여행자들뿐만 아니라, 여행상품 판매자들, 그리고 새로운 사람들과 만남과 교류를 통해 직간접 여행 경험을 공유하고 싶은 분들에게도 적합한 서비스입니다.
이 서비스를 통해 여행자들을 함께 여행의 즐거움을 공유하고, 여러 사람들과 연결될 수도 있습니다.
- 여행자들은 게시글 작성을 통해 여행에 대한 경험이나, 원하는 여행 상품 동행을 구할 수 있고, 댓글 기능을 통해 서로 소통하며 여행의 즐거움을 공유할 수 있습니다.
- 여행상품 판매자들은 자신의 상품을 등록하고 홍보할 수 있습니다.

## 2. 개발 기간
6/1 - 6/6 : 프로젝트 계획 설립<br>
6/7 - 6/27 : 공통 컴퍼넌트 개발 → 역할분담별 기능 구현 → 유지보수 

## 3. 팀 소개 
Hello, there! 저희는 4명의 Front-End 개발자로 구성된 <img width="20" src = "https://github.com/starcradle101/starcradle101/assets/113353436/b707fb16-15ec-4e1a-8666-42f08a05be79"> **Fearless 4** 입니다.
저희는 모든 팀원이 MBTI F성격 유형이며, 팀원들과 함께라면 어떤 어려움에도 두려움 없이 도전에 임하겠다는 마음으로 팀명을 Fearless 4로 정하였습니다. 

(<img width="20" src = "https://github.com/FRONTENDSCHOOL5/final-4-/assets/113353436/ed76f0e4-a75a-4db6-9c0d-914a28d20f6d"> LIKELION FE5 Project Team 4)<br>
|**강동훈**|**김소연**|**정준영**|**최사라** |
| :------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="180" alt="강동훈_profile_img" src="https://github.com/starcradle101/starcradle101/assets/113353436/707efb89-2344-4f79-8080-d3947767a7c5"> | <img width="180"  alt="김소연_profile_img" src="https://github.com/starcradle101/starcradle101/assets/113353436/f3f0197d-2969-4ecf-b907-42b8bc31ade9"> | <img width="180" alt="정준영_profile_img" src="https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/108723143/834d1075-10cf-4eee-8688-f86e8fdb83d1"> | <img width="180" alt="최사라_profile_img" src="https://github.com/starcradle101/starcradle101/assets/113353436/db3243c5-1d3b-4010-8547-dabd0034d7eb" > |
| [starcradle101](https://github.com/starcradle101) | [sy412](https://github.com/sy412) | [DayTeaJun](https://github.com/DayTeaJun) | [developer-sala](https://github.com/developer-sala) |
| 팀장 | 팀원 | 팀원 / 테크 리더 | 팀원 |

## 4. 역할 분담
### 강동훈
#### 팀장으로서의 역할
- 팀장으로서 프로젝트의 전반적인 일정을 관리했습니다.
- 프로젝트에서 사용할 기술스택, 코드 및 커밋 컨벤션, 브랜치 전략을 제안하고 팀원과의 논의롤 통해 결정했습니다.

#### 게시물
#### 회원가입 단계 프로필 설정 페이지 마크업 및 기능 구현
- 사용자가 회원가입 시 닉네임, ID를 입력하고 프로필 사진 및 소개 문구를 입력하는 페이지의 마크업 및 기능을 구현했습니다.
- 정규표현식을 사용하여 제공된 백엔드의 프로필 이미지 확장자와 용량 제한에 대한, 그리고 사용자 ID에 대한 유효성 검사를 진행했습니다.

#### 게시물 마크업 및 기능 구현
- 게시물 작성 페이지에서는 useRef 훅을 사용하여 사용자가 textarea에 입력한 값을 참조하고, 이를 상태로 저장해 사용자가 업로드한 이미지와 함께 서버에 요청을 보낼 수 있도록 했습니다. 또한 scrollHeight 속성을 사용해 사용자가 텍스트를 입력할때마다 textarea의 크기가 조절되도록 했습니다.
- 게시물 상세 페이지에서는 사용자가 작성한 게시물을 확인하고, 삭제 버튼을 클릭할 경우 사용자가 작성한 게시글을 삭제할 수 있도록 했습니다.
- 게시물 상세 페이지에서 게시글을 수정할 경우, React Router를 사용해 상세 페이지의 텍스트와 이미지 콘텐츠를 불러와 수정할 수 있도록 했습니다.
- 프로필 페이지에서 사용자가 원하는 게시글 목록 스타일에 따라 리스트 형태로 게시글을 확인하거나 그리드 형태로 사진이 포함된 게시글을 확인할 수 있도록 했습니다.

#### 댓글
- 사용자는 게시글 상세 페이지에서 댓글을 작성할 수 있으며, 작성된 댓글은 moment.js를 사용하여 초, 분, 시, 일 단위로 언제 작성되었는지 확인할 수 있도록 했습니다.
- 현재 로그인한 사용자가 댓글 작성자와 일치할 경우 댓글을 삭제할 수 있도록 했으며, 타 사용자가 작성한 댓글을 클릭할 경우 신고가 가능하도록 했습니다.

### 김소연 
#### 홈피드 페이지

#### 검색 페이지

#### 채팅 페이지
- 채팅 페이지 마크업

### 정준영
#### 테크리더로서의 역할
- 모두가 처음으로 시작한 팀 프로젝트로, 저도 그러해서 ‘기술적인 문제로 모르는 것이 있다면 내가 모르더라도 해결할 때까지 끝까지 도와주겠다’ 고 팀원들에게 말하고 프로젝트에 임하였습니다.

#### 프로필 페이지
- 사용자 프로필 페이지
- 사용자 프로필 수정 페이지
- 다른 사용자 프로필 페이지
- 작업 내용
	- 프로필 페이지에서 프로필 컴포넌트를 담당하였고, 해당 유저에 따른 프로필 정보를 구현했습니다.
	- 프로필 수정 시, 기존 유저의 데이터에서 수정하도록 하고, 수정이 완료되면 해당 유저DB에 반영하도록 구현하였습니다.
	- 해당 프로필 페이지에서 계정ID가 없는 유저로 이동했다면, 404 페이지를 보여주도록 하였습니다.
	- Modal을 구현해, 로그아웃 기능을 구현하였습니다.

#### 팔로우 페이지
- 팔로잉 목록 페이지
- 팔로워 목록 페이지
- 작업 내용
	- 다른 유저의 프로필에서 팔로우를 할 수 있는 기능을 구현하였습니다.
	- 해당 유저의 프로필에서의 기준으로 팔로잉 및 팔로우 수를 구현하였습니다.
	- 팔로워 및 팔로우 수를 클릭 시, 해당 팔로우 페이지로 이동하여 누가 팔로우를 했는지 볼 수 있으며, 해당 페이지에서 로그인한 유저의 기준으로 팔로우 및 팔로우 취소를 할 수 있도록 구현하였습니다.
	- 해당 팔로우 페이지에서 팔로우 유저가 없다면, 검색 페이지 이동하는 것을 권장하는 UI를 구현하였습니다.

#### 기타
- 모바일 뷰 적용
- 라우터 및 페이지 경로 관리
- [리팩토링](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/wiki/TravelUs-%EC%A0%95%EC%A4%80%EC%98%81-%EB%8B%B4%EB%8B%B9) : 렌더링 상향을 위한 이미지 최적화 라이브러리 도입

### 최사라

#### 상품페이지
- 상품 리스트
- 상품 등록 페이지
- 상품 수정 페이지

#### 기타
- bottomnav 애니메이션 효과 기능 추가
- Splash 및 404페이지 화면 디자인 및 애니메이션 효과 추가
- Toast 기능 추가

### 공통
#### 로그인 페이지
- 로그인 메인 페이지
- 이메일 로그인 페이지
- 이메일로 회원가입
- 프로필 설정

## 5. 협업 방식
* [🎨 피그마 디자인](https://www.figma.com/file/lWC44oz1WlWN10lghynUid/Fearless-4?type=design&node-id=0%3A1&mode=design&t=sEW6DUWpoh7mFuqz-1)
* 🤙 라이브 쉐어
  * Visual Studio Code의 [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare) 확장 프로그램을 사용하여 프로젝트 진행 중 어려움을 겪는 부분을 공유하고 해결했습니다.
* 🌳 브랜치 전략
  * 소규모 프로젝트의 원할한 진행을 위해서, GitHub Flow 브랜치 전략을 사용했습니다. 개발부터 배포까지의 흐름이 단순해서 첫 협업 경험에서 사용하기 좋다고 판단했습니다.

## 6. 프로젝트 목표
1. 리액트 사용법을 익히고 실력 향상시키기
   
2. 협업에 필요한 소프트 스킬 기르기
   
3. 다른 사람들과 같이 하는 프로젝트 환경에 익숙해지기  

## 7. 기능 
### 페이지별 기능 

|                                                        Splash                                                         | 회원가입 |                                                        로그인                                                        |
| :-------------------------------------------------------------------------------------------------------------------: | :------: | :------------------------------------------------------------------------------------------------------------------: |
| ![splash](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/84113107/e8fcd397-e2c8-4489-8786-d93c31d7add1) |   ![email](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/84113107/b1cfa3d1-3d9d-41b1-9871-697983944d0a)| ![loginPage](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/108723143/66f3d39a-bfdb-41f4-949d-f02103c0b5f8) |

|                                                       홈피드                                                        | 검색 | 404 페이지 |
| :-----------------------------------------------------------------------------------------------------------------: | :--: | :--------: |
| ![HomeFeed](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/84113107/fbc75808-e1c8-44e2-bedb-ab327548efb7) |  ![searchPage](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/84113107/0bd09003-add0-4220-ad75-2c02764aa799) |     ![404page](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/108723143/8c4ba44e-964b-439e-a926-7c3a59f9b078) |

| 채팅 | 프로필 | 프로필 수정 |
| :--: | :----: | :---------: |
| ![chatpage](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/108723143/5f373e1b-42ea-44dd-bf51-e22de2c5cdfc) | ![profilepage](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/108723143/bf2a5c21-4c96-42c8-a38f-a3e42cc8dfba) | ![profileeditpage](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/108723143/a0a6d855-7000-44ea-b891-f69616339d65) |

| 게시글 등록 | 게시글 수정 | 게시글 삭제 |
| :---------: | :---------: | :---------: |
|     ![postUpload](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/113353436/9e94ae8e-2aa1-410c-815b-cccb609448c3)     |     ![postEdit](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/113353436/0303b6bb-fee1-43a8-b998-0db55e03d5ac)     |     ![postDel](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/113353436/62a2a7ad-d8f9-4919-9532-cabe5edddc94)     |

| 게시글 댓글 | 상품 등록 | 상품 정렬 |
| :------: | :----: | :---------: |
|![댓글 작성](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/113353436/c533f830-a889-44fd-9086-3cd821902bf9) | ![상품등록](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/113747290/f323bfd7-8473-4a4c-8cfe-cf343b3d86ad) | ![상품정렬](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/113747290/92fc91af-95a6-4e21-a335-b787d558a6bd)


| 팔로우 | 로그아웃 | 토스트 |
| :------: | :----: | :---------: |
|  ![followpage](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/108723143/9c42a2bc-e202-4b9a-bd3b-6e377e3ab9b8) |![logoutpage](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/108723143/5660c6bc-5e9a-45d3-aa90-2e6178867d37) | ![토스트](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/113747290/8854540c-fc3b-4515-a0a8-2848e04555e7) |

### 차별화 기능

#### 1) 이미지 유효성 검사 구체화
![validation](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/113353436/ae7dbbff-d637-454c-9015-ba83fb4ef91b)
- 프로필, 게시글, 상품에서 사용자가 이미지 업로드 시 input 요소 accept 속성에 지정되지 않은 파일들도 선택되는 문제를 해결하기 위해 유효성 검사 기능을 좀 더 구체적으로 만들어 추가하였습니다.
- 기존에는 input 요소 accept 속성에 accept='image/*'로 설정하여, 이미지 업로드 시 지정된 확장자의 파일만 사용자가 선택할 수 있게 설정하였습니다.
- 하지만 사용자가 형식을 사용자 지정 파일로 선택하지 않고, 모든 파일로 선택하여 업로드하는 경우, accept에 지정하지 않은 파일들도 선택이 가능해지는 문제점이 있습니다.
- 그래서 저희는 업로드되는 파일의 형식이 이미지 파일로만 설정되도록 한번 더 구체적 유효성 검사 기능을 추가하였습니다.   

#### 2) 요건에 맞는 상품을 정렬하여 보여주는 기능
![filter](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/113747290/3eceb602-568f-463f-8d31-2200020515e8)

- 사용자들이 원하는 조건에 맞는 상품을 손쉽게 찾을 수 있도록 해당 기능을 추가하였습니다.
- 사용자들이 함께 떠나는 상품 목록에서 🔥추천 상품이나 🤑할인 상품 버튼을 클릭하면, 해당 요건에 맞는 상품이 정렬되어 보여집니다.
- 상품 판매자가 상품 등록할 때 카테고리 [추천], [할인]을 선택할 수 있고, 선택하면 해당 카테고리가 적용됩니다.
- 또한, 사용자들이 추천이나 할인 상품을 보다가 전체 상품을 보고 싶을 때, # 전체 상품 버튼을 누르면 처음처럼 전체 상품 목록을 볼 수 있습니다.

#### 3) 검색 디바운스 기능 
![search_Animation](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/108723143/a7cc0ec2-288b-4aad-9f89-2836fa8be62c)
- 불필요한 검색 요청의 수를 제어함으로써 서버 부하를 감소시키기 위해 해당 기능을 추가하였습니다. 즉, 사용자가 검색어를 입력하는 동안 실시간으로 관련 검색어를 보여주면서도, 불필요한 요청을 최소화하여 사이트의 성능과 사용자 경험을 향상시킵니다.
- 사용자가 계정 검색에서 입력할 때마다 바로 검색 요청이 보내지지 않고, 일정 시간 동안 입력이 없을 때에만 요청이 보내집니다.
- 사용자가 연속적으로 검색어를 입력하는 동안 디바운스
 타이머는 재설정되어, 마지막 입력 이후 일정 시간이 경과되어야 찾고자 하는 계정명이 보여집니다.

#### 4) bottomnav 아이콘 선택 시 애니메이션 효과
![navbarbottom_Animation](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/113747290/40863d17-edca-4a04-9185-167d3e419e01)
- 다른 페이지로 이동할 때, 사용자가 현재 본인이 선택한 아이콘에 대해 시각적으로 인식 할 수 있어 가고자 하는 페이지를 탐색하는데 도움을 주고, 사용자가 더욱 즐겁게 앱 또는 웹 사이트를 탐색할 수 있도록 해당 기능을 추가하였습니다.
- 다른 페이지를 이동하기 위해 사용자가 bottomnav에서 아이콘을 선택하면 아이콘의 색 변화와 360도 회전하는 애니메이션 효과가 적용됩니다.

## 8. 컨벤션 및 브랜치 전략
### 컨벤션
#### 코드컨벤션
- Prettierrc: 일관된 코드 스타일을 적용시켜 개발자들이 코드 스타일을 일일이 조정할 필요가 없습니다. 따라서 시간을 절약할 수 있고, 가독성도 향상되며 유지보수에도 용이하게 하는 등 개발 프로세스를 더 효율적으로 해주기에 사용하였습니다. 

.prettierrc 설정
```
{
	"printWidth": 80,
	"tabWidth": 2,
	"useTabs": true,
	"semi": true,
	"singleQuote": true,
	"jsxSingleQuote": true,
	"trailingComma": "es5",
	"bracketSpacing": true,
	"bracketSameLine": false,
	"arrowParens": "always"
}
```
#### 커밋 컨벤션 
```
feat        : 기능 (새로운 기능)  
fix         : 버그 (버그 수정)  
refactor    : 리팩토링  
design      : CSS 등 사용자 UI 디자인 변경  
comment     : 필요한 주석 추가 및 변경  
style       : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)  
docs        : 문서 수정 (문서 추가, 수정, 삭제, README)  
test        : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)  
chore       : 기타 변경사항 (빌드 스크립트 수정, assets, 패키지 매니저 등)  
init        : 초기 생성  
rename      : 파일 혹은 폴더명을 수정하거나 옮기는 작업만 한 경우  
remove      : 파일을 삭제하는 작업만 수행한 경우
```

### 브랜치 전략
- GitHubFlow: 비교적 단순하고 직관적인 구조를 가지고 있어, 작은 규모의 단기간 프로젝트에 팀원들이 쉽게 학습하고 적용할 수 있어 이 전략을 선택하였습니다.

## 9. 개발 환경
1 ) 프론트엔드 기술<br><br>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
* 리팩토링 이후
<img src="https://img.shields.io/badge/reactquery-7957D5?style=flat-square&logo=reactquery&logoColor=white%22">

2 ) 백엔드 기술<br><br>
멋쟁이사자처럼 프론트엔드 스쿨에서 제공된 API 사용

3 ) 도구 및 라이브러리<br><br>
<img src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=NPM&logoColor=white">
<img alt="Prettier" src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"/>
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
<img src="https://img.shields.io/badge/Visual_Studio_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white"/> 

4 ) 협업 및 프로젝트 관리<br><br>
<img alt="Notion" src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"/>
<img alt="Discord" src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"/>

5 ) 디자인<br><br>
<img alt="Figma" src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>

## 10. 폴더 구조
```javascript
final-04-fearless4
│  
├─ .gitignore
├─ .prettierrc
├─ package-lock.json
├─ package.json
├─ README.md
└─ src
   ├─ App.js
   ├─ api.js
   ├─ GlobalStyle.jsx
   ├─ index.css
   ├─ index.js
   ├─ assets
   │  └─ image
   │  └─ icon
   ├─ components
   │  ├─ background
   │  ├─ bottomnav
   │  ├─ button
   │  ├─ form
   │  ├─ loading
   │  ├─ loginJoin
   │  ├─ logo
   │  ├─ modal
   │  ├─ navbar
   │  ├─ post
   │  ├─ toast
   │  ├─ style
   ├─ fonts
   ├─ hook
   ├─ mobile
   ├─ pages
   │  │  ├─ chat
   │  │  ├─ follow
   │  │  ├─ homeFeed
   │  │  ├─ login
   │  │  ├─ loginEmail
   │  │  ├─ page404
   │  │  ├─ post
   │  │  ├─ product
   │  │  ├─ profileSetup
   │  │  ├─ search
   │  │  ├─ splash
   │  │  ├─ userProfile
   ├─ routes
```

## 11. 프로젝트 소감

### 강동훈
저 역시도 처음으로 진행해 보는 팀 프로젝트였는데요, 이 프로젝트를 통해서 정말 많은 것들을 배워간다고 느꼈습니다. 기술적인 부분도 있었지만, 가장 큰 부분은 협업과 관련된 부분이었던 것 같습니다.
혼자 코드를 작성할 때는 코드 컨벤션이나 커밋 컨벤션 같은 부분들을 신경쓰지 않고 작업했었는데, 이번 프로젝트를 통해서 왜 그러한 것들을 정해두고 작업을 진행해야 하는지 확실하게 경험한 것 같습니다. 그리고 프로젝트 기간동안 수고해주신 저희 팀원 분들 모두에게도 감사인사를 드립니다.

### 김소연 
프로젝트 경험을 통해 고민해보고 차근차근 하는 연습을 한 것 같고 혼자였다면 절대 하지 못한 경험을 한 것 같습니다!
무엇보다 좋은 팀원분들 덕분에 많이 배운 것 같고 저도 얼른 성장해 도움이 될 수 있도록 노력하겠습니다~!!!! fearless4 팀원분들 감사합니다~!!👍🥹👍

### 정준영
프로젝트를 시작하기 전까지는 제 자신이 아직 많이 부족하다고 느꼈는데, 팀원들과 함께 프로젝트를 하면서, 제 자신이 생각보다 멋사에서 많이 성장하였다고 느끼게 되었고, 저의 부족한 부분은 팀원분들이 많이 채워주셨습니다!
저희 팀원분들과 멋사 여러분들께 감사드립니다!

### 최사라
프로젝트 시작 전에는 첫 개발 팀 프로젝트여서 걱정이 되었으나, 걱정과 달리 팀원 분들에게 많이 배우고 도움받았습니다.<br> 
그리고 어떤 서비스로 프로젝트를 시작할지 기획부터 제작까지 모든 프로세스를 경험해보아서 좋았습니다.<br> 
힘들었던 과정이었지만 팀원 분들 덕에 해낼 수 있었고, 개발자로서의 기술적 성장뿐만 아니라 협업 스킬 등 기술 외적으로도 많이 성장할 수 있었던 뜻깊은 경험이었습니다. fearless4 팀원분들 너무 감사합니다!! 

## 12. 출처 

### 이미지 출처
- Splash 화면<br>
https://kr.freepik.com/free-photo/view-of-adorable-3d-cat_45138557.htm#page=2&query=3d%20cat&position=4&from_view=search&track=ais<br>
https://kr.freepik.com/free-psd/travel-luggage-icon-isolated-3d-render-illustration_34151495.htm#query=3d%20BAGGAGE&position=13&from_view=search&track=ais<br>

- 로그인 화면<br>
https://kr.freepik.com/free-photo/view-of-adorable-3d-cat_45138557.htm#page=2&query=3d%20cat&position=4&from_view=search&track=ais<br>
https://kr.freepik.com/free-photo/love-button-notification-alert-on-chat-speech-bubble-notice-reminder-3d-cartoon-illustration_27654463.htm#query=3d%20heart&position=24&from_view=search&track=ais<br>

- 채팅 화면<br>
https://kr.freepik.com/free-psd/3d-illustration-of-person-with-long-hair_27470372.htm#query=3d%20profile&position=4&from_view=search&track=ais<br>
https://kr.freepik.com/free-photo/cute-woman-hold-hands-gesture-to-empty-spec-business-woman-concept-on-pink-background-3d-rendering_25694156.htm#query=3d%20kid&position=25&from_view=search&track=ais

- 404화면<br>
https://kr.freepik.com/free-photo/view-of-adorable-3d-cat_45138556.htm#query=3d%20cat&position=43&from_view=search&track=ais<br>
https://kr.freepik.com/free-photo/reminder-popup-bell-notification-alert-or-alarm-icon-sign-or-symbol-for-application-website-ui-on-purple-background-3d-rendering-illustration_24598564.htm#query=3d%20alert&position=5&from_view=search&track=ais

- 기본 프로필 설정 화면<br> 
https://kr.freepik.com/free-vector/3d-cartoon-young-woman-smiling-in-circle-frame-character-illustration-vector-design_24325541.htm#query=3d%20kid&position=10&from_view=search&track=ais

- 팔로우한 유저가가 없는 경우<br>
https://kr.freepik.com/free-photo/view-of-adorable-3d-cat_45138550.htm#query=3d%20cat&position=8&from_view=search&track=ais

- 팔로잉한 유저가 없는 경우<br> 
https://kr.freepik.com/free-photo/view-of-adorable-3d-cats_45138596.htm#page=2&query=3d%20cat&position=10&from_view=search&track=ais

- (함께 떠나는 상품) 해당하는 카테고리에 상품이 없을 경우<br>
https://kr.freepik.com/free-photo/3d-view-of-adorable-pet-cat_45145578.htm#page=2&query=3d%20cry%20cat&position=0&from_view=search&track=ais

### 폰트 출처
- 오뮤 다예쁨체<br> 
https://omyudiary.com/1510339180/?idx=28

- 수트<br>
https://noonnu.cc/font_page/845 (https://sunn.us/suit/)

- 마포배낭여행<br>
https://noonnu.cc/font_page/378

