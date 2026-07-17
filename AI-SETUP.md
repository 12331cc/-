# AI 岗位匹配器配置

页面通过同域接口 `POST /api/match` 调用大模型，密钥不会出现在网页源码中。

## Vercel

项目目录已经包含：

`api/match.js`

在 Vercel 项目的“Environment Variables / 环境变量”中配置：

- `AI_GATEWAY_API_KEY`：模型 API Key，标记为 Sensitive
- `AI_GATEWAY_BASE_URL`：OpenAI 兼容接口的基础地址
- `AI_GATEWAY_MODEL`：模型名称

环境至少勾选 Production；需要测试预览部署时同时勾选 Preview。保存后必须重新部署，旧部署不会自动读取新变量。

## 阿里云百炼（推荐国内接入方式）

在百炼当前业务空间的 API Key 页面创建 Key，然后在 Vercel 项目环境变量中填写：

- `AI_GATEWAY_API_KEY`：刚创建的百炼 API Key，标记为 Sensitive
- `AI_GATEWAY_BASE_URL`：百炼页面显示的 OpenAI compatible 地址，复制到 `/compatible-mode/v1` 结尾
- `AI_GATEWAY_MODEL`：`qwen-plus`

注意：不要在 Base URL 后面手动添加 `/chat/completions`，接口函数会自动添加。API Key、专属域名和模型必须属于同一地域及业务空间。保存环境变量后需要重新部署项目。

重新部署后，访问 `/api/match`，看到 `{"status":"ok", ... ,"configured":true}` 即表示函数路由和模型变量均已生效。

## 页面结构

- `index.html`：AI 岗位匹配器
- `portfolio.html`：原视频作品集，原有交互保持不变

直接双击本地 `index.html` 时，页面会显示明确标注的本地预览评分；部署后自动改为调用 AI。

