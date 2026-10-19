# 光学可视课 / Optics Learning

双语物理光学交互课程网站。当前是《物理光学（第5版）》第 1 章 §1.1–§1.6.5 的原创重组学习材料：20 个学习单元、可视化实验、完整讲义与 66 道正式练习；不是整本教材。

## 打开与部署

- 本地：双击根目录 `index.html`，从首页进入 `course/`。无需构建、账号或外部 CDN。
- GitHub Pages：在仓库 **Settings → Pages** 中选择 **Deploy from a branch**，分支选 `main`，目录选 `/ (root)`，保存。项目站点地址为 `https://1fool.github.io/optics-learning/`。
- 网站首页在根目录；课程入口是 `course/index.html`，不要只上传其中一个 HTML。更新课程时，将本地源项目中对应的运行文件复制到 `course/optics-course/`，再检查公开版没有重新出现失效的教材 PDF 链接。

教材 PDF 未随网站发布。课程显示原书页码供合法持有教材的学习者核对；不要将教材 PDF、临时文件或凭据上传到公开仓库。网站中的学习记录保存在访问者当前浏览器，不跨设备同步；换域名也不会自动迁移原有本地记录。

网站包含第三方 KaTeX 资源，其许可文本保存在 `course/optics-course/vendor/katex/LICENSE`。本仓库没有为原创课程内容或其余代码声明开源许可。
