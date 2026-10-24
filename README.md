# 毛茸茸 Furry Club

基于 Next.js App Router 和 React 的宠物洗护概念店页面。

## 本地运行

需要 Node.js 20.9 或更高版本。

```sh
npm install
npm run dev
```

打开 http://localhost:3000 。

## 生产构建

```sh
npm run build
npm start
```

## 目录

- `app/layout.jsx`：全局布局、中文语言与 SEO 元信息
- `app/page.jsx`：首页入口
- `app/globals.css`：原页面样式与响应式布局
- `components/PetCare.jsx`：服务切换与预约弹窗
- `lib/menus.js`：猫犬服务名称、价格与描述
- `legacy/index.html`：迁移前的原始页面备份

预约仅在浏览器内生成预览，不保存个人信息，也不会向门店提交订单。图片与字体继续使用原有外部资源，需要网络连接。
