# 🌈 Colleful
> Colleful은 React Native로 개발한 Restful API 기반 앱이다.  
## 🌻 개요

전북대학교 과팅 매칭 플랫폼 Colleful의 client repository.    
College와 Colorful의 합성어로, 다채로운 대학 생활을 제공해 주겠다는 의미이다.

## 📱 최적화 디바이스
- **Android** (Samsung Galaxy S7)

## 💡 사용 기술 스택

- **크로스 플랫폼 앱** : React Native (함수 컴포넌트 기반)
- **페이지 라우터** : React-navigation-v5
- **CSS** : emotion.js
- **상태관리 및 미들웨어** : Redux, Redux-saga
- **AJAX 요청** : Axios, SWR
- **협업** : Github, Slack

## 🌴 브랜치 전략

- Git-flow 사용

<br>

## 🚀 colleful 앱 시연 영상

[![Video Label](https://user-images.githubusercontent.com/43921054/110058298-7327dc00-7da5-11eb-9272-91820cae6df4.png)](https://youtu.be/EvGRBQKWoR8)

- 시연 순서 :   
회원가입 -> 로그인 -> 팀생성 -> 팀초대 -> 로그아웃 -> 팀을 구성하기 위해 초대를 보낸 계정으로 로그인 -> 초대 수락 -> 팀 상태 변경(준비 완료) -> 상대 팀(여자)을 만들기 위해 다른 계정으로 로그인 -> 팀 생성 -> 팀 상태 변경(준비 완료) -> 필터 및 검색 기능 -> 매칭 보내기 -> 보낸 매칭 목록, 받은 매칭 목록 -> 보낸 매칭을 수락하기 위해 남자팀 리더 계정으로 로그인 -> 매칭 수락 (팀 상태 :준비 완료 -> 매칭 완료) -> 팀 상태 변경 (매칭 종료) -> 닉네임 변경 -> 비밀번호 변경 -> 팀 삭제 -> 회원 탈퇴 -> 이메일 인증으로 비밀번호 찾기 -> 자동 로그인

<br>

## 🛠 리팩토링
- 리액트는 View를 중점적으로 다루는 라이브러리이기 때문에 컴포넌트 안에는 View에 대한 책임만 갖도록 View에 관련된 로직만 넣었습니다.
- 이렇게 네트워크 통신하는 것을 따로 만들어서 컴포넌트 안에 의존성 주입을 해주었습니다.
- 의존성 주입을 통해 객체의 생성과 사용의 관심을 분리하여 가독성과 코드 재사용을 높혔습니다. 
- 컴포넌트를 한 폴더 안에 View만 집중하는 컴포넌트와 style만 집중하는 컴포넌트로 분리하여 코드량이 분산되었고 원하는 코드를 바로 찾을 수 있어 가독성이 좋아졌고 유지보수에 용이해졌습니다.
   ## CSS
   
   - 모두 styled-components로 작성
   - 네이밍은 모두 CamelCase로 작성 
   - 네이밍 컨벤션으로는 독립적인 컴포넌트 스타일이면 S,   
      - 재사용 될 스타일이면 `assets/css/commons.js`사용, 별칭은 P,    
      - 받은매칭목록, 보낸초대목록 등 목록 레이아웃은 `assets/css/InvitationMatchingListLayout.js` 사용, 별칭은 L   
      - 독립적인 컴포넌트 스타일은 엘리먼트 속성을 쉽게 파악할 수 있는 이름으로 통일   
      - Wrapper는 컴포넌트를 감싸는 영역, WrapperInner는 컴포넌트 영역을 표시할 때, Container는 엘리먼트들을 감싸는 영역을 나타냄   
      - 모듈을 감쌀땐 Styled[모듈이름]으로 통일   
   - CSS 속성 기술 순서는 NHN 코딩컨벤션을 따름

<img src="https://user-images.githubusercontent.com/43921054/119236369-fcafa480-bb71-11eb-8230-49201cc3741a.png" width="75%" >

> 출처 : https://nuli.navercorp.com/data/convention/NHN_Coding_Conventions_for_Markup_Languages.pdf

<br>

## 📱 화면 구성

### 인증 관련

| 로그인 | 회원가입 | 회원가입 |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/120579304-40ec5000-c462-11eb-90d6-f38b4a83010e.jpg" width="100%" > | <img src="https://user-images.githubusercontent.com/43921054/120579361-56fa1080-c462-11eb-902c-bf6c711798fb.jpg" width="100%" >  | <img src="https://user-images.githubusercontent.com/43921054/120579388-65482c80-c462-11eb-8562-5bfd04908c36.jpg" width="100%">  |

| 비밀번호 찾기/변경 | 이메일 인증 성공후 비밀번호 변경  | 변경 성공 |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/120579497-932d7100-c462-11eb-8ec1-3b8990e8d6b7.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/120579712-f5867180-c462-11eb-9df2-640fdc9de617.jpg" width="100%" >  | <img src="https://user-images.githubusercontent.com/43921054/120579767-0931d800-c463-11eb-990d-3d36b49dcad3.jpg" width="100%">  |

### 로그인 후

| 홈 | 홈 (팀 필터) | 홈 (팀 검색) |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/120579947-4b5b1980-c463-11eb-99a5-f4343ce737ea.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/120579978-557d1800-c463-11eb-8e5e-8669cbcc7063.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/120579991-57df7200-c463-11eb-9018-aedc2f72e4c6.jpg" width="100%">  |

| 팀 매칭 전 유저정보 보기 (이미지) | 팀 매칭 전 유저정보 보기 (자기소개) | 매칭 신청 |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/120580080-865d4d00-c463-11eb-8009-e3fcce9cc171.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/120580085-878e7a00-c463-11eb-937f-5d7206ea8bc2.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/120580094-89f0d400-c463-11eb-813c-0b86c21bafeb.jpg" width="100%">  |

| 마이페이지 | 계정 (본인 인증) | 계정(회원정보 수정, 로그아웃, 회원탈퇴) |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/120580514-49458a80-c464-11eb-9ddf-374ca7184411.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/120580518-4a76b780-c464-11eb-948f-6386ca1d7d53.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/120580521-4c407b00-c464-11eb-8da3-6e48cf39924b.jpg" width="100%">  |

| 프로필 관리 | 프로필 변경 선택 | 프로필 변경 |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/110082671-03c7e180-7dd1-11eb-8cce-a8411f7ac247.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/110082682-06c2d200-7dd1-11eb-94ab-1577f48524ee.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/110082689-088c9580-7dd1-11eb-9021-777ba3d65c22.jpg" width="100%">  |

| 팀생성 | 팀생성 | 팀초대 |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/120580581-65e1c280-c464-11eb-85b0-b5dc0dcfba37.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/120580586-6712ef80-c464-11eb-85f0-484b40eddb60.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/120580589-68441c80-c464-11eb-8d47-a3c5995bdb73.jpg" width="100%">  |

| 팀목록 | 팀삭제 (팀원은 팀나가기) | 팀삭제 |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/120580730-a3465000-c464-11eb-9654-6a26a898f4c4.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/120581651-1dc39f80-c466-11eb-9e03-c9c9ecd17e19.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/120581655-2025f980-c466-11eb-93a7-04de0593720e.jpg" width="100%">  |

| 팀 상태변경(매칭 완료) | 팀 상태변경(멤버 구성중) | 팀 상태변경(준비 완료) |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/120581645-1a301880-c466-11eb-8efe-587edd826980.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/120580734-a4777d00-c464-11eb-8494-8fc5e733c8d6.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/120580963-fa4c2500-c464-11eb-9189-fac465c67e9e.jpg" width="100%">  |

<table>
 <thead>
  <tr>
   <th align="center">채팅목록(매칭 x)</th>
   <th align="center">채팅목록(매칭 완료)</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/120582509-86f7e280-c467-11eb-939c-f356ec8ffea1.jpg" width="100%"></td>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/120582513-88290f80-c467-11eb-9a32-2722f4d8a980.jpg" width="100%"></td>
  </tr>
 </tbody>
</table>

<table>
 <thead>
  <tr>
   <th align="center">받은 초대목록</th>
   <th align="center">받은 초대목록</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/120582017-b823e300-c466-11eb-8762-90ecadaaded7.jpg" width="100%"></td>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/120582023-b9eda680-c466-11eb-98d4-1fef863fae5b.jpg" width="100%"></td>
  </tr>
 </tbody>
</table>

<table>
 <thead>
  <tr>
   <th align="center">보낸 초대목록</th>
   <th align="center">보낸 초대목록</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/120582088-dab5fc00-c466-11eb-9e59-18331c6b138e.jpg" width="100%"></td>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/120582092-ddb0ec80-c466-11eb-9f24-eae19deb58c2.jpg" width="100%"></td>
  </tr>
 </tbody>
</table>

<table>
 <thead>
  <tr>
   <th align="center">받은 매칭목록</th>
   <th align="center">받은 매칭목록</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/120582169-fde0ab80-c466-11eb-8c03-e3db2e9181ed.jpg" width="100%"></td>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/120582183-03d68c80-c467-11eb-910d-8220a7cd3d01.jpg" width="100%"></td>
  </tr>
 </tbody>
</table>

<table>
 <thead>
  <tr>
   <th align="center">보낸 매칭목록</th>
   <th align="center">보낸 매칭목록</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/120582269-27013c00-c467-11eb-9649-92bda18bb88b.jpg" width="100%"></td>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/120582274-28326900-c467-11eb-97c8-a37b71e70110.jpg" width="100%"></td>
  </tr>
 </tbody>
</table>


## 👩🏻‍💻 기타
- [Colleful server repo](https://github.com/colleful/server)
- [API.md](https://github.com/colleful/server/blob/develop/API.md)
