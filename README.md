# 🌈 Colleful

## 🌻 개요

전북대학교 과팅 매칭 플랫폼 Colleful의 client repository.    
College와 Colorful의 합성어로, 다채로운 대학 생활을 제공해 주겠다는 의미이다.   
Colleful은 React Native로 개발한 Restful API 기반 앱이다.    
 
## 💡 기술 스택

- React Native(함수형 컴포넌트 기반, Hooks API), react-navigation-v5
- emotion.js
- Redux, Redux-thunk, Redux-saga
- Axios, SWR

## 🌴 브랜치 전략

* Git-flow 사용

## 🚀 colleful 앱 시연 영상
[![Video Label](https://user-images.githubusercontent.com/43921054/110058298-7327dc00-7da5-11eb-9272-91820cae6df4.png)](https://www.youtube.com/watch?v=_n_Q75iCp8A)

- 시연 순서 :   
회원가입 - 로그인 - 자동 로그인 테스트 - 팀생성 - 팀초대 - 보낸 초대 확인 - 계정 인증 - 로그아웃 - 초대받은 계정 로그인 - 받은 초대 확인(수락) - 내 정보 수정 - 로그아웃 - 다른 계정 로그인 - 팀상태 변경(준비완료) - 홈화면에 팀 갱신 - 계정 비밀번호 변경 - 여자 계정으로 로그인 - 팀생성 - 팀상태 변경(준비완료) - 홈화면에 팀 갱신 - 필터 선택 - 찾고싶은 팀 검색 - 팀원 자기소개 본 후 매칭 보내기 - 보낸 매칭 취소 테스트/확인 - 받은 팀 매칭 확인 - 채팅목록에 매칭된 팀끼리 채팅 공간이 생겼는지 확인 - 비밀번호 찾기/변경

## 🗄 구조
<details markdown="1">
<summary>접기 / 펼치기</summary>

📦client   
 ┣ 📂container   
 ┃  ┣ 📜LoginContainer.js   
 ┃  ┗ 📜RegisterContainer.js   
 ┃ 📂hooks   
 ┃  ┗ 📜useInterval.js   
 ┃ 📂lib   
 ┃  ┣ 📜api.js   
 ┃  ┣ 📜createRequestAuthSaga.js   
 ┃  ┗ 📜createRequestSaga.js   
 ┃ 📂modules   
 ┃  ┣ 📜auth.js   
 ┃  ┣ 📜index.js   
 ┃  ┣ 📜loading.js   
 ┃  ┣ 📜team.js   
 ┃  ┗ 📜user.js   
 ┃ 📂screens  
 ┃  ┣ 📂auth  
 ┃  ┃ ┣ 📜LoginScreen.js  
 ┃  ┃ ┗ 📜RegisterScreen.js  
 ┃  ┣ 📂Chat  
 ┃  ┃ ┗ 📜ChatScreen.js  
 ┃  ┣ 📂Home  
 ┃  ┃ ┣ 📜HomeScreen.js  
 ┃  ┃ ┣ 📜ModalFilter.js  
 ┃  ┃ ┣ 📜TeamInfo.js  
 ┃  ┃ ┣ 📜TeamInfoModal.js  
 ┃  ┃ ┣ 📜TeamInfoModalList.js  
 ┃  ┃ ┗ 📜TeamInfoModalListItem.js  
 ┃  ┣ 📂MyPage  
 ┃  ┃ ┣ 📂MyPageStack  
 ┃  ┃ ┃ ┣ 📂Account  
 ┃  ┃ ┃ ┃ ┗ 📜AccountScreen.js  
 ┃  ┃ ┃ ┣ 📂AddTeam  
 ┃  ┃ ┃ ┃ ┗ 📜AddTeamScreen.js  
 ┃  ┃ ┃ ┣ 📂ReceivedInvitationList  
 ┃  ┃ ┃ ┃ ┣ 📜ReceivedInvitationList.js  
 ┃  ┃ ┃ ┃ ┣ 📜ReceivedInvitationListItemScreen.js  
 ┃  ┃ ┃ ┃ ┗ 📜ReceivedInvitationListScreen.js  
 ┃  ┃ ┃ ┣ 📂ReceivedMatchingList  
 ┃  ┃ ┃ ┃ ┣ 📜ReceivedMatchingList.js  
 ┃  ┃ ┃ ┃ ┣ 📜ReceivedMatchingListItemScreen.js  
 ┃  ┃ ┃ ┃ ┗ 📜ReceivedMatchingListScreen.js  
 ┃  ┃ ┃ ┣ 📂SentInvitationList  
 ┃  ┃ ┃ ┃ ┣ 📜SentInvitationList.js  
 ┃  ┃ ┃ ┃ ┣ 📜SentInvitationListItemScreen.js  
 ┃  ┃ ┃ ┃ ┗ 📜SentInvitationListScreen.js  
 ┃  ┃ ┃ ┣ 📂SentMatchingList  
 ┃  ┃ ┃ ┃ ┣ 📜SentMatchingList.js  
 ┃  ┃ ┃ ┃ ┣ 📜SentMatchingListItemScreen.js  
 ┃  ┃ ┃ ┃ ┗ 📜SentMatchingListScreen.js  
 ┃  ┃ ┃ ┣ 📂TeamList  
 ┃  ┃ ┃ ┃ ┣ 📜InvitationScreen.js  
 ┃  ┃ ┃ ┃ ┣ 📜TeamListItemModal.js  
 ┃  ┃ ┃ ┃ ┣ 📜TeamListItemScreen.js  
 ┃  ┃ ┃ ┃ ┗ 📜TeamListScreen.js  
 ┃  ┃ ┃ ┣ 📜MemberInfo.js  
 ┃  ┃ ┃ ┣ 📜MessageScreen.js  
 ┃  ┃ ┃ ┣ 📜NoticeScreen.js  
 ┃  ┃ ┃ ┣ 📜ProfileScreen.js  
 ┃  ┃ ┃ ┣ 📜SettingScreen.js  
 ┃  ┃ ┃ ┗ 📜SuggestionScreen.js  
 ┃  ┃ ┣ 📜MyPageInfo.js  
 ┃  ┃ ┣ 📜MypageNavigator.js  
 ┃  ┃ ┣ 📜MyPageNavList.js  
 ┃  ┃ ┣ 📜MyPageNavListItem.js  
 ┃  ┃ ┗ 📜MyPageScreen.js  
 ┃  ┣ 📜MainNavigator.js  
 ┃  ┣ 📜SplashScreen.js  
 ┃  ┗ 📜SwitchNavigator.js  
 ┃ 📂utils  
 ┃  ┗ 📜GetTimeFromNow.js    
 ┣ 📜App.js `Routing역할`   
 ┣ 📜index.js   
 ┣ 📜Config.js  
 ┣ 📜package-lock.json   
 ┗ 📜package.json     

</details>