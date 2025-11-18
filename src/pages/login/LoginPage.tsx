export default function () {
  return (
    <body>
      <div className="로그인">
        <img src="/logo.svg" alt="GAMI 로고" className="logo" />
        <p className="회원가입">
          GAMI가 처음이라면? <a href="/join/join.html">회원가입하기</a>
        </p>
        <form className="입력">
          <input type="text" placeholder="이메일" required />
          <input type="password" placeholder="비밀번호" required />
          <button type="submit">로그인</button>
        </form>
        <div className="한국">
          <a href="login.html" className="비번찾기">
            비밀번호 찾기
          </a>
        </div>
      </div>
    </body>
  );
}
