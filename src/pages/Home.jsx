import { useState, useEffect } from "react";
import style from "./Home.module.css";

function Home() {
  // 슬라이드 이미지 배열
  const images = [
    "/images/1_img.png",
    "/images/kokeetea_drink.jpg",
    "/images/main_004.png",
    "/images/main_006.png",
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
      <h2 className={style.kokeetea_sns}>@KOKEETEA SNS</h2>
      <ul className={style.sns_container}>
        <li>
          <a
            href="https://www.instagram.com/kokeetea/"
            target="_blank"
            rel="opener"
            className="link"
          >
            <img src="/images/insta.png" alt="" width="35" height="35" />
            <p>Kokee Tea</p>
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/@kokeetea2886"
            target="_blank"
            rel="opener"
            className="link"
          >
            <img src="/images/youtube.png" alt="" width="35" height="35" />
            <p>코키티</p>
          </a>
        </li>
        <li>
          <a
            href="https://ko-kr.facebook.com/luvkokeetea/"
            target="_blank"
            rel="opener"
            className="link"
          >
            <img src="/images/facebook.png" alt="" width="35" height="35" />
            <p>코키티</p>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Home;
