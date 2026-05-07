# barber_taro

理发预约微信小程序前端。

技术栈：Taro + React + TypeScript。

## 开发分支

当前开发分支：`test_0.0.1`。

除非明确要求，不在 `main` 分支继续开发；需要合并时按约定合并到 `master` 分支。

## API 地址

小程序 API 入口配置在：

```text
src/services/api.ts
```

当前默认公网 API 前缀：

```text
https://www.ringsora.com/barber
```

示例请求：

```text
https://www.ringsora.com/barber/shops/current
```

## 构建

```bash
pnpm install
pnpm build:weapp
```
