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
[![Video Label](https://user-images.githubusercontent.com/43921054/110058298-7327dc00-7da5-11eb-9272-91820cae6df4.png)](https://www.youtube.com/watch?v=_n_Q75iCp8A)

- 시연 순서 :   
회원가입 - 로그인 - 자동 로그인 테스트 - 팀생성 - 팀초대 - 보낸 초대 확인 - 계정 인증 - 로그아웃 - 초대받은 계정 로그인 - 받은 초대 확인(수락) - 내 정보 수정 - 로그아웃 - 다른 계정 로그인 - 팀상태 변경(준비완료) - 홈화면에 팀 갱신 - 계정 비밀번호 변경 - 여자 계정으로 로그인 - 팀생성 - 팀상태 변경(준비완료) - 홈화면에 팀 갱신 - 필터 선택 - 찾고싶은 팀 검색 - 팀원 자기소개 본 후 매칭 보내기 - 보낸 매칭 취소 테스트/확인 - 받은 팀 매칭 확인 - 채팅목록에 매칭된 팀끼리 채팅 공간이 생겼는지 확인 - 비밀번호 찾기/변경

<br>

## 🗄 구조
<details markdown="1">
<summary>접기 / 펼치기</summary>
 

</details>

<br>

## 📱 화면 구성

### 인증 관련

| 로그인 | 회원가입 | 회원가입 |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/110070525-8777d300-7dbd-11eb-8c09-8015cf830687.jpg" width="100%" > | <img src="https://user-images.githubusercontent.com/43921054/110075238-d6296b00-7dc5-11eb-8def-157ac0b523ea.jpg" width="100%" >  | <img src="https://user-images.githubusercontent.com/43921054/110075241-d75a9800-7dc5-11eb-8554-78d3558edbcb.jpg" width="100%">  |

| 비밀번호 찾기/변경 | 이메일 인증 성공후 비밀번호 변경  | 변경 성공 |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/110080848-68357180-7dce-11eb-8b40-aba38c1c16e6.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/110080864-6cfa2580-7dce-11eb-8924-4c0527d302ad.jpg" width="100%" >  | <img src="https://user-images.githubusercontent.com/43921054/110080880-72577000-7dce-11eb-9d4e-44516bf277fe.jpg" width="100%" >  |

### 로그인 후

| 홈 | 홈 (팀 필터) | 홈 (팀 검색) |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/110076457-daef1e80-7dc7-11eb-97ac-59d1ba2dc563.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/110076571-0f62da80-7dc8-11eb-88d9-7aecfc7fa98c.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/110077340-47b6e880-7dc9-11eb-9bdd-265c7e1da749.jpg" width="100%">  |

| 팀 매칭 전 유저정보 보기 (이미지) | 팀 매칭 전 유저정보 보기 (자기소개) | 매칭 신청 |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/110081015-a6329580-7dce-11eb-928a-d22ec8c29066.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/110081023-a894ef80-7dce-11eb-90be-952445dc05f6.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/110081027-aaf74980-7dce-11eb-8f5e-a91ee6cf1bb8.jpg" width="100%">  |

| 마이페이지 | 계정 (본인 인증) | 계정(회원정보 수정, 로그아웃, 회원탈퇴) |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/110077964-623d9180-7dca-11eb-9dc6-8eebfdcb8999.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/110078283-dd9f4300-7dca-11eb-81ba-12ef95f52bfa.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/110078288-e09a3380-7dca-11eb-9507-5985fb9bc114.jpg" width="100%">  |

| 프로필 관리 | 프로필 변경 선택 | 프로필 변경 |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/110082671-03c7e180-7dd1-11eb-8cce-a8411f7ac247.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/110082682-06c2d200-7dd1-11eb-94ab-1577f48524ee.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/110082689-088c9580-7dd1-11eb-9021-777ba3d65c22.jpg" width="100%">  |

| 팀생성 | 팀생성 | 팀초대 |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/110078702-7a61e080-7dcb-11eb-980e-28d8208f8b33.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/110078712-7d5cd100-7dcb-11eb-893a-04d1db869783.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/110079012-e2182b80-7dcb-11eb-81ef-2303fe57e6f4.jpg" width="100%">  |

| 팀목록 | 팀 상태변경 | 팀 상태변경 |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/110078721-80f05800-7dcb-11eb-8c57-90482de5258e.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/110079683-c3fefb00-7dcc-11eb-844b-1be7d73f1b4d.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/110079788-e264f680-7dcc-11eb-8d4c-f6ff6d05a289.jpg" width="100%">  |

<table>
 <thead>
  <tr>
   <th align="center">채팅목록(매칭 x)</th>
   <th align="center">채팅목록(매칭 완료)</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/110077646-dd527800-7dc9-11eb-90a3-c19f70fa31f4.jpg" width="100%"></td>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/110077658-e2172c00-7dc9-11eb-8a0c-bf5f63bd8853.jpg" width="100%"></td>
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
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/110080112-615a2f00-7dcd-11eb-852d-966c6ce2489f.jpg" width="100%"></td>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/110080119-6323f280-7dcd-11eb-84e2-27b315a47485.jpg" width="100%"></td>
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
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/110080167-75059580-7dcd-11eb-91d1-00f914b41e4c.jpg" width="100%"></td>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/110080175-7767ef80-7dcd-11eb-9642-21c228aa3229.jpg" width="100%"></td>
  </tr>
 </tbody>
</table>

| 받은 매칭목록 | 받은 매칭목록 | 수락 |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/43921054/110080230-85b60b80-7dcd-11eb-9cb8-2a937bb03633.jpg" width="100%"> | <img src="https://user-images.githubusercontent.com/43921054/110080237-88186580-7dcd-11eb-9615-197ea3f9d94c.jpg" width="100%">  | <img src="https://user-images.githubusercontent.com/43921054/110080455-d299e200-7dcd-11eb-84b9-42b072d17632.jpg" width="100%">  |


<table>
 <thead>
  <tr>
   <th align="center">보낸 매칭목록</th>
   <th align="center">보낸 매칭목록</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/110080294-96ff1800-7dcd-11eb-8fc4-3d77420e282f.jpg" width="100%"></td>
   <td width="279px" align="center"> <img src="https://user-images.githubusercontent.com/43921054/110080303-98c8db80-7dcd-11eb-85ba-2cbd90cff7f9.jpg" width="100%"></td>
  </tr>
 </tbody>
</table>


## 👩🏻‍💻 기타
- [Colleful server repo](https://github.com/colleful/server)
- [API.md](https://github.com/colleful/server/blob/develop/API.md)
