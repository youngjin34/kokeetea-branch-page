import { useState, useEffect } from "react";
import style from "./Home.module.css";

function Home() {
  // 슬라이드 이미지 배열
  const images = [
    "../../public/images/1_img.png",
    "../../public/images/kokeetea_drink.jpg",
    "../../public/images/main_004.png",
    "../../public/images/main_006.png",
  ];

  // 현재 이미지 인덱스 상태 관리
  const [currentIndex, setCurrentIndex] = useState(0);

  // 슬라이드를 자동으로 변경하는 함수
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 이전 이미지로 이동하는 함수
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // 컴포넌트가 마운트될 때 자동 슬라이드를 시작하도록 설정
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // 3초마다 슬라이드 변경
    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 interval을 정리
  }, []);

  return (
    <div className={style.Home}>
      <div className={style.kokeetea}>KOKEE TEA</div>

      {/* 슬라이드 이미지 */}
      <div className={style.slider}>
        <img
          src={images[currentIndex]}
          alt="slide"
          className={style.slideImage}
        />
        <div className={style.navButtons}>
          <button className={style.prevBtn} onClick={prevSlide}>
            {"<"}
          </button>
          <button className={style.nextBtn} onClick={nextSlide}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
