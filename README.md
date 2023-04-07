# next-electron

## 📕 Usage

### 📥 Installation

Install the **dependencies**...

```bash
corepack enable
corepack prepare pnpm@8.1.1 --activate
pnpm run ci # pnpm ci ❌
```

### 🚀 Development

Start the **dev server** and **electron**...

```bash
# 1st Terminal
pnpm run dev:render

# 2nd Terminal
pnpm run dev:main
```

### ⚗️ Testing

Run the **tests**...

```bash
pnpm run test
```

### 📦 Build

Build the **electron app**...

```bash
pnpm pack
```
