import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import style from "./ManageStock.module.css";

const ManageStock = () => {
  const [selectedBranch, setSelectedBranch] = useState("본점");
  const [stockList, setStockList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(0);
  const modalBackground = useRef();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // API 호출 (예: /api/ingredient/{branchId}/list)
        const response = await axios.get(
          `http://localhost:8080/api/ingredient/1/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // JWT 토큰 추가
            },
            withCredentials: true,
          }
        );
        setStockList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("재고 데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchStockData();
  }, [selectedBranch, token]);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
    setOrderQuantity(item.quantity); // 모달 열 때 기본 재고 수량 설정
  };

  const handleOrderQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0) {
      setOrderQuantity(value);
    }
  };

  const handleOrderSubmit = () => {
    // 주문 처리 로직 (API 호출 또는 상태 업데이트)
    console.log(
      `주문 제출: ${selectedItem.ingredient_name}, 수량: ${orderQuantity}`
    );

    // 주문 후 모달 닫기
    setModalOpen(false);
  };

  return (
    <div className={style.ManageStock}>
      <h1>{selectedBranch} 재고 관리</h1>
      <select
        className={style.branchDropdown}
        onChange={handleBranchChange}
        value={selectedBranch}
      >
        <option value="구로점(본점)">구로점(본점)</option>
        <option value="강남점">강남점</option>
        <option value="여의도점">여의도점</option>
        <option value="신도림점">신도림점</option>
      </select>

      <div className={style.stockList}>
        {stockList.map((item) => (
          <div key={item.ingredient_name}>
            <div
              className={`${style.card} ${
                item.quantity <= 10 ? style.lowStock : ""
              }`}
              onClick={() => openModal(item)}
            >
              <img
                src={item.image}
                alt={item.material}
                className={style.itemImage}
              />
              <hr />
              <h3>{item.ingredient_name}</h3>
              <p>재고: {item.quantity}</p>
              <p>가격: {item.ingredient_price}원</p>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedItem && (
        <div
          className={style.modal_container}
          ref={modalBackground}
          onClick={(event) => {
            if (event.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <div className={style.modal_content}>
            <div>
              <h4>{selectedItem.ingredient_name}</h4>
              남은 재고: {selectedItem.quantity} <br />
              가격: {selectedItem.ingredient_price} 원
            </div>
            <input
              className={style.order_input}
              type="number"
              placeholder="재고 입력"
              autoFocus
              value={orderQuantity}
              onChange={handleOrderQuantityChange}
            />
            <button
              className={style.modal_close_btn}
              onClick={() => setModalOpen(false)}
            >
              ❌
            </button>
            <button
              className={`${style.btn} ${style.btn_success}`}
              onClick={handleOrderSubmit}
            >
              주문
              <i>✔️</i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStock;
