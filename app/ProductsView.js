"use client";

import { useEffect, useState } from "react";
import ProductList from "./ProductList";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// 확인용 주소 옵션: ?delay=2000 (느린 응답), ?fail (HTTP 404 오류), ?empty (빈 배열)
async function fetchProducts(signal) {
  const params = new URLSearchParams(window.location.search);
  const delay = Number(params.get("delay")) || 0;
  let path = "/api/products";
  if (params.has("fail")) path = "/api/products-fail";
  else if (params.has("empty")) path = "/api/products-empty";

  if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));

  const response = await fetch(`${basePath}${path}`, { signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("응답이 상품 배열이 아닙니다.");
  }
  return data;
}

export default function ProductsView() {
  const [status, setStatus] = useState("loading");
  const [products, setProducts] = useState([]);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetchProducts(controller.signal)
      .then((data) => {
        setProducts(data);
        setStatus("success");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setStatus("error");
      });
    return () => controller.abort();
  }, [attempt]);

  if (status === "loading") {
    return <p className="message">불러오는 중...</p>;
  }

  if (status === "error") {
    return (
      <div className="message">
        <p>상품을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
        <button type="button" onClick={() => setAttempt((n) => n + 1)}>
          다시 시도
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="message">등록된 상품이 없습니다.</p>;
  }

  return <ProductList products={products} />;
}
