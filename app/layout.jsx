import './globals.css';

export const metadata = {
 title: '毛茸茸 Furry Club · 宠物洗护',
 description: '毛茸茸宠物洗护概念店，为小狗与小猫准备的温柔洗护时光。',
};
export const viewport = { themeColor: '#fbf8f2' };

export default function RootLayout({ children }) {
 return <html lang="zh-CN"><body>{children}</body></html>;
}
