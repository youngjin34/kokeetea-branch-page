import React, { useRef, useState } from "react";
import style from "./ManageStock.module.css";

const dummyData = {
  "구로점(본점)": [
    {
      id: 1,
      material: "커피원두",
      category: "주재료",
      quantity: 50,
      price: 5000,
      image: "/images/coffeebean.png",
    },
    {
      id: 2,
      material: "홍차잎",
      category: "주재료",
      quantity: 30,
      price: 3000,
      image: "/images/blacktea.png",
    },
    {
      id: 3,
      material: "녹차잎",
      category: "주재료",
      quantity: 20,
      price: 4000,
      image: "/images/greentea.png",
    },
    {
      id: 4,
      material: "오렌지",
      category: "주재료",
      quantity: 15,
      price: 2000,
      image: "/images/orange.png",
    },
    {
      id: 5,
      material: "포도",
      category: "주재료",
      quantity: 25,
      price: 3500,
      image: "/images/grape.png",
    },
    {
      id: 6,
      material: "우유",
      category: "부재료",
      quantity: 100,
      price: 1000,
      image: "/images/milk.png",
    },
    {
      id: 7,
      material: "초콜릿",
      category: "부재료",
      quantity: 50,
      price: 1500,
      image: "/images/chocolate.png",
    },
    {
      id: 8,
      material: "시나몬",
      category: "부재료",
      quantity: 10,
      price: 500,
      image: "/images/cinnamon.png",
    },
    {
      id: 9,
      material: "꿀",
      category: "부재료",
      quantity: 5,
      price: 8000,
      image: "/images/honey.png",
    },
    {
      id: 10,
      material: "설탕",
      category: "부재료",
      quantity: 200,
      price: 100,
      image: "/images/sugar.png",
    },
    {
      id: 11,
      material: "휘핑크림",
      category: "부재료",
      quantity: 30,
      price: 1200,
      image: "/images/whippingcream.png",
    },
    {
      id: 12,
      material: "타피오카펄",
      category: "부재료",
      quantity: 40,
      price: 600,
      image: "/images/tapiocapearl.png",
    },
  ],
  강남점: [
    {
      id: 1,
      material: "커피원두",
      category: "주재료",
      quantity: 50,
      price: 5000,
      image: "/images/coffeebean.png",
    },
    {
      id: 2,
      material: "홍차잎",
      category: "주재료",
      quantity: 30,
      price: 3000,
      image: "/images/blacktea.png",
    },
    {
      id: 3,
      material: "녹차잎",
      category: "주재료",
      quantity: 20,
      price: 4000,
      image: "/images/greentea.png",
    },
    {
      id: 4,
      material: "오렌지",
      category: "주재료",
      quantity: 20,
      price: 2000,
      image: "/images/orange.png",
    },
    {
      id: 5,
      material: "포도",
      category: "주재료",
      quantity: 40,
      price: 3500,
      image: "/images/grape.png",
    },
    {
      id: 6,
      material: "우유",
      category: "부재료",
      quantity: 200,
      price: 1000,
      image: "/images/milk.png",
    },
    {
      id: 7,
      material: "초콜릿",
      category: "부재료",
      quantity: 58,
      price: 1500,
      image: "/images/chocolate.png",
    },
    {
      id: 8,
      material: "시나몬",
      category: "부재료",
      quantity: 20,
      price: 500,
      image: "/images/cinnamon.png",
    },
    {
      id: 9,
      material: "꿀",
      category: "부재료",
      quantity: 50,
      price: 8000,
      image: "/images/honey.png",
    },
    {
      id: 10,
      material: "설탕",
      category: "부재료",
      quantity: 100,
      price: 100,
      image: "/images/sugar.png",
    },
    {
      id: 11,
      material: "휘핑크림",
      category: "부재료",
      quantity: 32,
      price: 1200,
      image: "/images/whippingcream.png",
    },
    {
      id: 12,
      material: "타피오카펄",
      category: "부재료",
      quantity: 43,
      price: 600,
      image: "/images/tapiocapearl.png",
    },
  ],
  여의도점: [
    {
      id: 1,
      material: "커피원두",
      category: "주재료",
      quantity: 50,
      price: 5000,
      image: "/images/coffeebean.png",
    },
    {
      id: 2,
      material: "홍차잎",
      category: "주재료",
      quantity: 30,
      price: 3000,
      image: "/images/blacktea.png",
    },
    {
      id: 3,
      material: "녹차잎",
      category: "주재료",
      quantity: 20,
      price: 4000,
      image: "/images/greentea.png",
    },
    {
      id: 4,
      material: "오렌지",
      category: "주재료",
      quantity: 20,
      price: 2000,
      image: "/images/orange.png",
    },
    {
      id: 5,
      material: "포도",
      category: "주재료",
      quantity: 40,
      price: 3500,
      image: "/images/grape.png",
    },
    {
      id: 6,
      material: "우유",
      category: "부재료",
      quantity: 200,
      price: 1000,
      image: "/images/milk.png",
    },
    {
      id: 7,
      material: "초콜릿",
      category: "부재료",
      quantity: 58,
      price: 1500,
      image: "/images/chocolate.png",
    },
    {
      id: 8,
      material: "시나몬",
      category: "부재료",
      quantity: 20,
      price: 500,
      image: "/images/cinnamon.png",
    },
    {
      id: 9,
      material: "꿀",
      category: "부재료",
      quantity: 50,
      price: 8000,
      image: "/images/honey.png",
    },
    {
      id: 10,
      material: "설탕",
      category: "부재료",
      quantity: 100,
      price: 100,
      image: "/images/sugar.png",
    },
    {
      id: 11,
      material: "휘핑크림",
      category: "부재료",
      quantity: 32,
      price: 1200,
      image: "/images/whippingcream.png",
    },
    {
      id: 12,
      material: "타피오카펄",
      category: "부재료",
      quantity: 43,
      price: 600,
      image: "/images/tapiocapearl.png",
    },
  ],
  신도림점: [
    {
      id: 1,
      material: "커피원두",
      category: "주재료",
      quantity: 50,
      price: 5000,
      image: "/images/coffeebean.png",
    },
    {
      id: 2,
      material: "홍차잎",
      category: "주재료",
      quantity: 30,
      price: 3000,
      image: "/images/blacktea.png",
    },
    {
      id: 3,
      material: "녹차잎",
      category: "주재료",
      quantity: 20,
      price: 4000,
      image: "/images/greentea.png",
    },
    {
      id: 4,
      material: "오렌지",
      category: "주재료",
      quantity: 15,
      price: 2000,
      image: "/images/orange.png",
    },
    {
      id: 5,
      material: "포도",
      category: "주재료",
      quantity: 25,
      price: 3500,
      image: "/images/grape.png",
    },
    {
      id: 6,
      material: "우유",
      category: "부재료",
      quantity: 100,
      price: 1000,
      image: "/images/milk.png",
    },
    {
      id: 7,
      material: "초콜릿",
      category: "부재료",
      quantity: 50,
      price: 1500,
      image: "/images/chocolate.png",
    },
    {
      id: 8,
      material: "시나몬",
      category: "부재료",
      quantity: 10,
      price: 500,
      image: "/images/cinnamon.png",
    },
    {
      id: 9,
      material: "꿀",
      category: "부재료",
      quantity: 5,
      price: 8000,
      image: "/images/honey.png",
    },
    {
      id: 10,
      material: "설탕",
      category: "부재료",
      quantity: 200,
      price: 100,
      image: "/images/sugar.png",
    },
    {
      id: 11,
      material: "휘핑크림",
      category: "부재료",
      quantity: 30,
      price: 1200,
      image: "/images/whippingcream.png",
    },
    {
      id: 12,
      material: "타피오카펄",
      category: "부재료",
      quantity: 40,
      price: 600,
      image: "/images/tapiocapearl.png",
    },
  ],
};

const ManageStock = () => {
  const [selectedBranch, setSelectedBranch] = useState("구로점(본점)");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <div className={style.ManageStock}>
      <h1>{selectedBranch} 재고 관리</h1>
      <select className={style.branchDropdown} onChange={handleBranchChange}>
        <option value="구로점(본점)">구로점(본점)</option>
        <option value="강남점">강남점</option>
        <option value="여의도점">여의도점</option>
        <option value="신도림점">신도림점</option>
      </select>

      <div className={style.stockList}>
        {dummyData[selectedBranch].map((item) => (
          <div key={item.id}>
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
              <h3>{item.material}</h3>
              <p className={style.category}>{item.category}</p>
              <p>재고: {item.quantity}</p>
              <p>가격: {item.price}원</p>
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
              <h4>{selectedItem.material}</h4>
              남은 재고: {selectedItem.quantity} <br />
              가격: {selectedItem.price}
            </div>
            <input
              className={style.order_input}
              type="number"
              placeholder="재고 입력"
              autoFocus
              onChange={(event) => {
                const value = parseInt(event.target.value, 10);
                if (value < 0) {
                  event.target.value = 0;
                }
              }}
            />
            <button
              className={style.modal_close_btn}
              onClick={() => setModalOpen(false)}
            >
              ❌
            </button>
            <button className={`${style.btn} ${style.btn_success}`}>
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
