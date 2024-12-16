import { useState } from "react";
import style from "./Login.module.css"; // 모듈화된 스타일 사용

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = () => {
    // 로그인 처리 로직 (예: API 호출 등)
    console.log("Login Submitted", { email, password });
  };

  return (
    <div className={style.Login}>
      <div className={`${style.form}`}>
        <h2>환영합니다</h2>
        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <button type="button" className={style.submit} onClick={handleSubmit}>
          로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
