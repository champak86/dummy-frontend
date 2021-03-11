/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import "../App.css";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { getProducts } from "../actions/product";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    getProducts(page).then((response) => {
      if (response.data.success) {
        setTotalCount(response.data.count);
        if (page > 1) {
          setProduct([...product, ...response.data.data]);
        } else {
          setProduct(response.data.data);
        }
      }
      setLoading(false);
    });
  }, [page]);

  const handleLoadMore = () => {
    setLoading(true);
    setPage(page + 1);
  };

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage: totalCount > product.length,
    onLoadMore: handleLoadMore,
    window,
  });

  return (
    <>
    <div className="App" ref={infiniteRef}>
      {product &&
        product.map((item, key) => {
          console.log('item', item);
          return <ProductCard key={item._id} item={item} />;
        })}
    </div>
      {loading ? (
        <ClipLoader loading={loading} css={override} size={50} />
      ) : null}
      </>
  );
};

export default ProductList;
