import { Link, useParams } from 'react-router-dom'
import './AboutPage.css'

export default function AboutPage() {
  const { aptId } = useParams()

  return (
    <div className="about-page hitel-card">
      <nav className="hitel-nav">
        <Link to={`/apt/${aptId}`}>◀ 메인</Link>
      </nav>
      <h1 className="about-heading">[ 빌리지피플? ]</h1>
      <div className="about-body">
        <p>
          정자일로 55 빌리지피플은 <strong>아파트 단위 주민 커뮤니티</strong> 서비스입니다.
        </p>
        <p>
          같은 아파트에 사는 이웃들이 공지사항, 자유게시판, 동네 소식, 개선건의사항 등을
          나누는 공간입니다. 다른 아파트 게시판도 상단 메뉴에서 선택해 둘러볼 수 있습니다.
        </p>
        <p>
          공지사항은 운영자 비밀번호를 아시는 분만 작성할 수 있으며,
          나머지 게시판은 닉네임을 입력해 자유롭게 글을 쓸 수 있습니다.
        </p>
        <p>
          좋은 이웃 문화가 이곳에서 이어지길 바랍니다.
        </p>
        <p className="about-sign">- 정자일로 55 빌리지피플 -</p>
      </div>
    </div>
  )
}
