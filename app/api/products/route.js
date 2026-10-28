import products from "../../../data/products.json";

// 정적 export(GitHub Pages)에서도 /api/products 응답 파일로 만들어지도록 고정합니다.
export const dynamic = "force-static";

export function GET() {
  return Response.json(products);
}
