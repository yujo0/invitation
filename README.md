# Will U Be Our PhD - Mini Web Project

이 프로젝트는 정적 웹사이트라서 GitHub Pages로 무료 배포하면 링크 공유가 됩니다.

## 빠른 실행 (내 컴퓨터)
1. `index.html` 더블클릭

## 다른 사람에게 링크 보내기 (GitHub Pages)

### 1) GitHub에서 새 저장소 만들기
- 예: `phd-invite`
- Public으로 생성

### 2) 이 폴더에서 PowerShell 실행
아래 명령에서 본인 정보로 바꿔서 실행:

```powershell
.\publish-github.ps1 -RepoUrl "https://github.com/<your-id>/phd-invite.git"
```

### 3) GitHub Actions 배포 완료 대기
- GitHub 저장소 > `Actions` 탭에서 `Deploy to GitHub Pages`가 초록 체크 되면 완료

### 4) 공유 링크
보통 아래 주소로 열립니다:

```text
https://<your-id>.github.io/phd-invite/
```

## 파일 설명
- `index.html`: 화면 문구/버튼/밈 이미지
- `style.css`: 디자인
- `script.js`: NO 도망 + YES 축하 로직
- `.github/workflows/deploy-pages.yml`: 자동 배포 설정
- `publish-github.ps1`: Git 초기화/푸시 도우미

## 문구 수정 위치
- 고정 문구: `index.html`
- 클릭 후 바뀌는 문구: `script.js`
