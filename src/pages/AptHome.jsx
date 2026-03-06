import { Link, useParams } from 'react-router-dom'
import { APARTMENTS } from '../data/mock'
import './AptHome.css'

export default function AptHome() {
  const { aptId } = useParams()
  const apt = APARTMENTS.find((a) => a.id === aptId)
  const aptName = apt ? apt.name : ''

  return (
    <div className="apt-home hitel-card">
      <h2 className="hitel-section-basic">[ 기본메뉴 ]</h2>
      <ul className="hitel-menu-list">
        <li><Link to={`/apt/${aptId}/board/notice`}>1. 공지사항</Link></li>
        <li><Link to={`/apt/${aptId}/about`}>2. 빌리지피플?</Link></li>
      </ul>

      <h2 className="hitel-section-community">[ 커뮤니티 ]</h2>
      <ul className="hitel-menu-list">
        <li><Link to={`/apt/${aptId}/board/free`}>3. 자유게시판</Link></li>
        <li><Link to={`/apt/${aptId}/board/news`}>4. {aptName}소식</Link></li>
        <li><Link to={`/apt/${aptId}/board/suggest`}>5. 개선건의사항</Link></li>
      </ul>

      <p className="hitel-footer">* 정자일로 55 빌리지피플 - 우리 동네 이야기</p>
    </div>
  )
}
