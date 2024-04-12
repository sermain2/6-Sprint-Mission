import { useState } from "react";
import { useProductCountStore } from "../store/productCountStore";
import paginationStore from "../store/paginationStore";

import searchIcon from "../images/ic_search.png";
import arrowDown from "../images/ic_arrow_down.png";
import sortButton from "../images/btn_sort.png";
import favoriteIcon from "../images/ic_heart.png";

import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";

export default function AllItemsList({ data }) {
  const [dropdownView, setDropdownView] = useState(false);
  const [allProducts, setAllProducts] = useState(data.list);

  const productCount = useProductCountStore();
  const currentPage = paginationStore((state) => state.currentPage);

  const sortProductsByDate = (products) => {
    const sortedProducts = [...products].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    setAllProducts(sortedProducts);
  };

  const sortProductsByLike = (products) => {
    const sortedProducts = [...products].sort(
      (a, b) => b.favoriteCount - a.favoriteCount,
    );
    setAllProducts(sortedProducts);
  };

  return (
    <div className="mt-6 sm:mt-10">
      <div className="my-6 flex flex-col justify-between sm:flex-row sm:items-center">
        <div className="mx-4 flex items-center justify-between sm:mx-0">
          <h1 className="text-xl font-bold text-[var(--footer-bg-color)]">
            전체 상품
          </h1>
          <button className="inline rounded-lg bg-[var(--btn-blue1)] px-6 py-3 text-white sm:hidden">
            상품 등록하기
          </button>
        </div>
        <div className="mx-4 my-2 flex items-center justify-between gap-x-3 sm:mx-0 sm:my-0 sm:justify-normal">
          <div className="relative flex items-center">
            <img
              src={searchIcon}
              alt="searchicon"
              className="absolute left-4"
            />
            <input
              className="w-64 rounded-xl bg-[var(--cool-gray100)] py-2 pl-11 text-[var(--cool-gray400)] sm:w-56 sm:pr-1 lg:w-96"
              placeholder="검색할 상품을 입력해주세요"
            />
          </div>
          <button className="hidden rounded-lg bg-[var(--btn-blue1)] px-6 py-3 text-white sm:inline-block">
            상품 등록하기
          </button>
          <div
            className="relative hidden w-32 cursor-pointer justify-between rounded-xl border px-5 py-3 sm:inline-block sm:flex "
            onClick={() => {
              setDropdownView(!dropdownView);
            }}
          >
            <span>최신순</span>
            <img src={arrowDown} alt="arrowdown" className="inline" />
            {dropdownView && (
              <SortDropdown
                sortProductsByDate={sortProductsByDate}
                sortProductsByLike={sortProductsByLike}
                allProducts={allProducts}
              />
            )}
          </div>
          <div
            className="relative flex justify-between sm:hidden"
            onClick={() => setDropdownView(!dropdownView)}
          >
            <img src={sortButton} alt="sortbutton" />
            {dropdownView && (
              <SortDropdown
                sortProductsByDate={sortProductsByDate}
                sortProductsByLike={sortProductsByLike}
                allProducts={allProducts}
              />
            )}
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {allProducts &&
          allProducts
            .slice(
              currentPage * productCount - productCount,
              currentPage * productCount,
            )
            .map((post) => {
              return (
                <li key={post.id}>
                  <img
                    src={post.images[0]}
                    alt={post.name}
                    className="h-40 w-40 rounded-2xl object-fill sm:h-56 sm:w-56"
                  />
                  <p className="mt-4 text-sm font-medium text-[var(--cool-gray800)]">
                    {post.name} 팝니다
                  </p>
                  <p className="text-sm font-bold text-[var(--cool-gray800)]">
                    {post.price}원
                  </p>
                  <img
                    src={favoriteIcon}
                    alt="favoriteicon"
                    className="inline"
                  />
                  <span className="ml-1 text-xs">{post.favoriteCount}</span>
                </li>
              );
            })}
      </ul>
      <Pagination datatotalCount={data.totalCount} />
    </div>
  );
}
