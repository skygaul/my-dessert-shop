import "./globals.css";

export const metadata = {
  title: "수제 디저트 쇼핑몰",
  description: "선물하기 좋은 수제 디저트 상품 목록",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
