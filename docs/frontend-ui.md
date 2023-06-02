# 프론트엔드 UI 문서
## 폴더 구조

<details>
<summary>src 폴더</summary>
  
```bash
src
 ┣ assets
 ┃ ┣ Union.svg
 ┃ ┣ calender-icon.svg
 ┃ ┣ cancel.svg
 ┃ ┣ circle.svg
 ┃ ┣ copy.svg
 ┃ ┣ dropdown.svg
 ┃ ┣ dropup.svg
 ┃ ┣ emptydata.svg
 ┃ ┗ next-icon.svg
 ┣ components
 ┃ ┣ Accounts
 ┃ ┃ ┣ Login.tsx
 ┃ ┃ ┣ PasswordFind.tsx
 ┃ ┃ ┣ PasswordReset.tsx
 ┃ ┃ ┗ Signup.tsx
 ┃ ┣ Home
 ┃ ┃ ┣ EnterTheWorkRoom.tsx
 ┃ ┃ ┗ Footer.tsx
 ┃ ┣ UI
 ┃ ┃ ┗ EmptyDataContainer.tsx
 ┃ ┣ User
 ┃ ┃ ┣ UserHome.tsx
 ┃ ┃ ┗ WorkRoomCard.tsx
 ┃ ┣ Worker
 ┃ ┃ ┣ AllowanceItem.tsx
 ┃ ┃ ┣ DateDropdown.tsx
 ┃ ┃ ┣ HistoryCard.tsx
 ┃ ┃ ┣ NightTimePayItem.tsx
 ┃ ┃ ┣ OverTimePayItem.tsx
 ┃ ┃ ┣ WorkerDetail.tsx
 ┃ ┃ ┗ WorkerInfoCards.tsx
 ┃ ┣ WrokRoom
 ┃ ┃ ┣ WorkRoomDetail.tsx
 ┃ ┃ ┗ WorkerCard.tsx
 ┃ ┣ Button.tsx
 ┃ ┣ Header.tsx
 ┃ ┗ Input.tsx
 ┣ hooks
 ┃ ┗ useInput.ts
 ┣ modals
 ┃ ┣ BaseModal.tsx
 ┃ ┣ DeleteModal.tsx
 ┃ ┣ HistoryDeleteModal.tsx
 ┃ ┣ HistoryInfoFixModal.tsx
 ┃ ┣ HistoryModal.tsx
 ┃ ┣ HistoryRegisterModal.tsx
 ┃ ┣ UserInfoFixModal.tsx
 ┃ ┣ WokerInfoFixModal.tsx
 ┃ ┣ WorkRoomRegisterModal.tsx
 ┃ ┣ WorkerDeleteModal.tsx
 ┃ ┣ WorkerModal.tsx
 ┃ ┣ WorkerRegisterModal.tsx
 ┃ ┣ WorkroomDeleteModal.tsx
 ┃ ┣ WorkroomInfoFixModal.tsx
 ┃ ┗ WorkroomModal.tsx
 ┣ pages
 ┃ ┣ Home.tsx
 ┃ ┣ LoginPage.tsx
 ┃ ┣ PasswordFindPage.tsx
 ┃ ┣ Signup.tsx
 ┃ ┣ UserPage.tsx
 ┃ ┣ WorkRoomDetailPage.tsx
 ┃ ┗ WorkerDetailPage.tsx
 ┣ store
 ┃ ┣ useAccessTokenState.ts
 ┃ ┣ useAuthState.ts
 ┃ ┗ useUIState.ts
 ┣ styles
 ┃ ┣ Home
 ┃ ┃ ┗ Footer.module.scss
 ┃ ┣ UI
 ┃ ┃ ┗ EmptyDataContainer.module.scss
 ┃ ┣ WorkRoom
 ┃ ┃ ┣ WorkRoom.module.scss
 ┃ ┃ ┗ WorkerCard.module.scss
 ┃ ┣ Worker
 ┃ ┃ ┣ AllowanceItem.module.scss
 ┃ ┃ ┣ HistoryCard.module.scss
 ┃ ┃ ┣ NightTimePayItem.module.scss
 ┃ ┃ ┣ OverTimePayItem.module.scss
 ┃ ┃ ┣ WorkerDetail.module.scss
 ┃ ┃ ┗ WorkerInfoCards.module.scss
 ┃ ┣ modals
 ┃ ┃ ┣ BaseModal.module.scss
 ┃ ┃ ┣ DateDropdown.module.scss
 ┃ ┃ ┣ DeleteModal.module.scss
 ┃ ┃ ┣ HistoyModal.module.scss
 ┃ ┃ ┣ UserInfoFixModal.module.scss
 ┃ ┃ ┣ WorkerRegisterModal.module.scss
 ┃ ┃ ┗ WorkroomModal.module.scss
 ┃ ┣ user
 ┃ ┃ ┣ UserHome.module.scss
 ┃ ┃ ┗ WorkRoomCard.module.scss
 ┃ ┣ Button.module.scss
 ┃ ┣ EnterTheWorkRoom.module.scss
 ┃ ┣ Header.module.scss
 ┃ ┣ Input.module.scss
 ┃ ┣ Login.module.scss
 ┃ ┣ PasswordFind.module.scss
 ┃ ┗ Signup.module.scss
 ┣ utils
 ┃ ┣ emailAuth.ts
 ┃ ┗ formatDate.ts
 ┣ App.tsx
 ┣ axiosConfig.ts
 ┣ global.d.ts
 ┣ index.css
 ┣ index.tsx
 ┗ react-app-env.d.ts
```
</details>

## 화면 UI
프론트엔드 UI는 모든 페이지에서 반응형 웹으로 작업되었습니다. 
<div align="center">
<img width="579" alt="히어유얼 메인 사진" src="https://github.com/kimseowoo03/hereYoure/assets/102151860/7060d9ea-e9d8-4903-aa07-f41d2d9c4d48">
</div>

<details>
<summary>로그인</summary>
<div align="center">  
<img width="511" alt="로그인페이지 사진" src="https://github.com/kimseowoo03/hereYoure/assets/102151860/fc0c028c-4ef7-4953-ba29-88cb9e13b5ce">
</div> 

</details>
<details>
<summary>회원가입</summary>
  <div align="center">  
    <img width="579" alt="회원가입페이지 사진" src="https://github.com/kimseowoo03/hereYoure/assets/102151860/b24da7a4-c035-4c75-b4f5-9dc6433f216e">
  </div>
</details>
<details>
<summary>비밀번호 찾기</summary>
<div align="center">  
<img width="512" alt="비밀번호 찾기 페이지 사진" src="https://github.com/kimseowoo03/hereYoure/assets/102151860/10f23a95-00d4-442e-834c-03b7c5978a21" width="20%" height="30%">
</div> 
</details>
<details>
<summary>마이페이지</summary>
  <div align="center">  
    <img width="512" alt="마이페이지 gif" src="https://github.com/kimseowoo03/hereYoure/assets/102151860/4d6cf37a-146a-4260-b9da-e133af940904">
</div> 
  </div>
</details>
<details>
<summary>근무방페이지</summary>
  <div align="center">  
    <img width="512" alt="근무방페이지 gif" src="https://github.com/kimseowoo03/hereYoure/assets/102151860/4f82bd81-6339-4b3f-a76f-bb4b8bad6a63">

  </div>
</details>
<details>
<summary>근무자 페이지</summary>
  <div align="center">  
    <img width="512" alt="근무자페이지 gif" src="https://github.com/kimseowoo03/hereYoure/assets/102151860/00ab3f6b-3e6e-4bc6-87f6-539bfe121987">
  </div>
</details>