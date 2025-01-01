import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './Login.module.css';

// 전역 상태 관리
import { AuthContext } from '../components/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext); // 전역 상태 업데이트 함수

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async () => {
    setError(null); // 에러 초기화
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        {
          email,
          password,
        }
      );

      console.log('Login Successful:', response.data);
      setIsAuthenticated(true); // 전역 상태 업데이트
      localStorage.setItem('token', response.data.token);
      navigate('/'); // 로그인 성공 시 홈으로 이동
    } catch (err) {
      console.error('Login Failed:', err.response?.data || err.message);
      alert('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(); // Enter 키 눌렀을 때 로그인 처리
    }
  };

  return (
    <div className={style.Login}>
      <div className={`${style.form}`}>
        <h2>환영합니다</h2>
        {error && <p className={style.error}>{error}</p>}
        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onKeyDown={handleKeyPress}
            required
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyPress}
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
