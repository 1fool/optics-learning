# 物理光学 · 咱们裸熊主题

2026-10-23：保留 20 节、66 道正式题及四模式教学结构，把开场、目录、模式按钮、步骤、实验外框、任务纸面、讲义、练习与符号窗口统一为三熊森林手绘风。用户反馈第一版“只是换米色贴图”，目前采用更明显的整幅剧集场景、真实角色标签、熊掌步骤和木牌/手绘轮廓。物理图的语义颜色与所有计算、题目 ID、进度键保持原有含义。

## 入口与文件

- 本地课程：上一级 `physical-optics-1-1-1-2.html`；开场 `physical-optics-start.html`。
- 网站副本：独立仓库 `E:\optics-learning-site\course\index.html` 与 `start.html`，不是本地目录里的 Git 分支。
- `bears-data.js`：按小节保存剧集、标题和四张素材。
- `bears-theme.js/css`：当前节装饰及全套主题；深色互动图、操作区和图注使用低对比度 52px 方格底纹。`visuals.js` 与 `visuals-13-16.js` 在 Canvas 底色及大面积介质/面板底色上先绘方格，再绘物理图形；1.3.1 透明画布沿用场景底纹，不重复叠线。模型和语义颜色不变。
- `bears-start.js/css`：三熊叠叠乐入场、轻微起伏与照片出场；支持暂停、低动态、后台及离屏停止。
- `assets/we-bare-bears/SOURCES.md`、`sources.json`：来源、映射及权利说明。

## 素材映射

按课程末级小节顺序依次使用 S01E01–S01E20。例如 1.1 → Our Stuff，1.2.1 → Viral Video，1.2.2 → Food Truck；1.3.1 → Primal；1.6.5 → Charlie & the Snake。每节四张不同图，品牌与开场另有共用三熊透明素材。所有素材本地压缩加载，没有运行时第三方请求。

剧集归属通过 TVmaze 索引及对应 Fandom Gallery 记录。来源不是独立核实的再分发许可；人物和原作权利归对应权利人。已逐张看过四张/节的选帧总览，替换了 Chloe 图集中不适合的蓝色错误画面。

## 验证

主题回归命令为 `node optics-course/check-bears-theme.js`，可用 `COURSE_URL`、`START_URL`、`FILE_ENTRY` 指向网站副本。需本机 Playwright/Edge，仅供开发，课程本身无安装依赖。

检查覆盖逐节四模式、桌面/手机、英文重绘、图片、固定工具与正文分离、旧答案保持、开场与暂停/低动态、file 入口断网。图形、长页与主题辨识度仍须另看截图。保留并运行 `check-browser.js`、`check-sphere-lab.js`、`check-explorations.js` 与数据检查；不要把主题检查当成教材逐页审校或学习效果验证。

课程目录在所有小节和四模式保持可见：宽屏留在左侧随阅读定位，窄屏位于正文上方并可内部滚动；章/节自身仍可折叠。不再显示“课程地图”开关。图示方格只是弱背景纹理，不代表空间坐标或真实介质结构。

本轮截图在本地制作目录 `tmp/bears-ui/`；主题规则另已写入本机 `optics-course-builder` 的 `references/physical-bears-theme.md`。这些安装 skill 文件不属于网站仓库。源码同步、提交、推送和线上部署须分别记录实际状态。
