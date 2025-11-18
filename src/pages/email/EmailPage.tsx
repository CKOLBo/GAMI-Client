export default function Email() {
  return (
    <body>
      <div className="login">
        <img src="/GAMY-FE/logo.svg" alt="GAMI 로고" className="logo" />
        <p className="join">
          이미 회원이신가요? <a href="sign1.html">로그인하기</a>
        </p>
        <form className="input">
          <div className="auth">
            <input type="text" placeholder="이메일" required />
            <button type="submit" className="auth-button">
              인증하기
            </button>
          </div>

          <div className="auth-check">
            <input type="text" placeholder="인증번호" required />
            <button type="submit" className="check-button">
              확인
            </button>
          </div>

          <button type="submit" className="next">
            다음으로
          </button>
        </form>
      </div>
    </body>
  );
}
