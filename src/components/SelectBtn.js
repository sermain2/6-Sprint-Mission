import { useState, useEffect, useRef } from "react";
import "../stlye/SelectBtn.css";
import ArrowDownIcon from "../assets/icon/ic_arrow_down.svg";

export default function SelectBtn({ onChange }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [order, setOrder] = useState("recent");
  const order_kr = {
    recent: "최신순",
    favorite: "좋아요순",
  };

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // 정렬 옵션 선택시 호출되는 함수
  const handleOrderChange = (e) => {
    setOrder(e); // 상태 업데이트
    onChange(e); // 부모 컴포넌트로 선택된 정렬 순서 전달
    setDropdownOpen(false); // 드롭다운 닫기
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdownBtn" onClick={toggleDropdown}>
        <div className="select">
          <span>{order_kr[order]}</span>
          <img src={ArrowDownIcon} alt="arrow-down" />
        </div>
      </div>
      {isDropdownOpen && (
        <ul className="dropdown_contents">
          <li onClick={() => handleOrderChange("recent")}>최신순</li>
          <li onClick={() => handleOrderChange("favorite")}>좋아요순</li>
        </ul>
      )}
    </div>
  );
}
