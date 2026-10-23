# 光学可视课 / Optics Learning

**在线访问：[光学可视课网站](https://1fool.github.io/optics-learning/)**

双语光学交互课程网站。共用首页选择两本独立课程：《傅里叶光学》目前完成 §1.1–§1.4 的 9 个小节、31 道正式练习；《物理光学（第5版）》目前完成 §1.1–§1.6.5，含 20 个学习单元与 66 道正式练习。两本都不是整本教材。

## 打开与部署

- 本地：双击根目录 `index.html`，从首页进入 `fourier/` 或 `course/`。无需构建、账号或外部 CDN。
- GitHub Pages：在仓库 **Settings → Pages** 中选择 **Deploy from a branch**，分支选 `main`，目录选 `/ (root)`，保存。项目站点地址为 [光学可视课网站](https://1fool.github.io/optics-learning/)。
- 网站首页在根目录；物理光学原入口 `course/index.html` 保持不变，傅里叶光学入口是 `fourier/index.html`。更新课程时将本地对应运行文件分别同步到 `course/optics-course/` 与 `fourier/fourier-course/`，保留网站特有的首页链接和不提供 PDF 的来源页码说明。

教材 PDF 未随网站发布。课程显示原书页码供合法持有教材的学习者核对；不要将教材 PDF、临时文件或凭据上传到公开仓库。网站中的学习记录保存在访问者当前浏览器，不跨设备同步；换域名也不会自动迁移原有本地记录。

网站包含第三方 KaTeX 资源，其许可文本保存在 `course/optics-course/vendor/katex/LICENSE`。本仓库没有为原创课程内容或其余代码声明开源许可。

首页采用 JoJo 风格漫画分镜，保留科学家切换、雷达图与两个独立课程入口。角色图与主视觉的来源记录见 `assets/jojo/SOURCES.md`，首页本地动效库的版本及许可来源见 `assets/vendor/SOURCES.md`。布局与交互回归可运行 `node tests/check-manga-home.cjs` 和 `node tests/check-scientist-home.cjs`（需要本机 Playwright 与 Chrome）。
