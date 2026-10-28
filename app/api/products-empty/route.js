// 빈 목록 확인용: 화면에서 ?empty 를 붙이면 이 주소를 요청합니다.
export const dynamic = "force-static";

export function GET() {
  return Response.json([]);
}
