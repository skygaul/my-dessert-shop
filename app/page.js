import products from "../data/products.json";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function formatPrice(price) {
  return `${price.toLocaleString("ko-KR")}원`;
}

export default function Home() {
  return (
    <main className="container">
      <h1>수제 디저트</h1>
      <ul className="grid">
        {products.map((product) => (
          <li
            key={product.id}
            className={product.soldOut ? "card sold-out" : "card"}
          >
            <div className="image-area">
              {product.image ? (
                <img src={`${basePath}${product.image}`}alt={product.name} />
              ) : (
                <span>이미지 없음</span>
              )}
            </div>
            <p className="category">{product.category}</p>
            <h2 className="name">{product.name}</h2>
            <p className="price">{formatPrice(product.price)}</p>
            {product.soldOut && <span className="badge">품절</span>}
          </li>
        ))}
      </ul>
    </main>
  );
}
