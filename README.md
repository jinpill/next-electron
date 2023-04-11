# next-electron

## 📕 Usage

### 📥 Installation

**의존성**을 설치합니다.

```bash
corepack enable
corepack prepare pnpm@8.2.0 --activate
pnpm run ci # pnpm ci ❌
```

### 🚀 Development

**개발 서버**를 실행한 후, **일렉트론 앱**을 실행합니다.

```bash
# 1st Terminal
pnpm run dev:render

# 2nd Terminal
pnpm run dev:main
```

### ⚗️ Testing

**빌드 테스트**를 실행합니다.

```bash
pnpm run test
```

### 📦 Build

**일렉트론 앱**을 빌드합니다.

```bash
# Windows
pnpm pack:win

# MacOS
pnpm pack:mac
```

---

## ⚙️ Configuration

### 💿 Format on Save (ESLint / Prettier)

아래 키를 눌러 설정 화면을 엽니다.

> **Windows** `Ctrl + ,`<br/> **MacOS** `⌘ + ,`

우측 상단의 **설정 열기(JSON) 버튼**을 클릭합니다.

아래 내용을 추가 또는 수정합니다.

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
