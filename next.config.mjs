// GitHub Pages는 https://<user>.github.io/my-dessert-shop/ 하위 경로에서 서비스됩니다.
// 개발 서버(npm run dev)에서는 기존처럼 루트(/)에서 열립니다.
const basePath = process.env.NODE_ENV === "production" ? "/my-dessert-shop" : "";

export default {
  output: "export",
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
