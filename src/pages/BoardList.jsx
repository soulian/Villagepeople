import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getPosts,
  getComments,
  getBoardDisplayName,
  isBoardProtected,
  getStoredAptAccess,
  setAptBoardAccess,
  checkAptBoardPassword,
} from '../data/mock'
import './BoardList.css'

export default function BoardList() {
  const { aptId, boardId } = useParams()
  const boardName = getBoardDisplayName(aptId, boardId)
  const posts = getPosts(aptId, boardId)
  const protectedBoard = isBoardProtected(boardId)
  const hasAccess = !protectedBoard || getStoredAptAccess(aptId)

  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleUnlock = (e) => {
    e.preventDefault()
    setPasswordError('')
    if (!passwordInput.trim()) {
      setPasswordError('비밀번호를 입력하세요.')
      return
    }
    if (!checkAptBoardPassword(aptId, passwordInput.trim())) {
      setPasswordError('비밀번호가 일치하지 않습니다.')
      return
    }
    setAptBoardAccess(aptId)
    setPasswordInput('')
  }

  if (protectedBoard && !hasAccess) {
    return (
      <div className="board-list hitel-card board-unlock">
        <nav className="hitel-nav">
          <Link to={`/apt/${aptId}`}>◀ 메인</Link>
          <span># {boardName} 🔑</span>
        </nav>
        <p className="board-unlock-desc">이 게시판은 아파트 비밀번호를 입력해야 열람할 수 있습니다.</p>
        <form onSubmit={handleUnlock} className="board-unlock-form">
          <label>
            <span>아파트 비밀번호</span>
            <input
              type="password"
              className="hitel-input"
              placeholder="비밀번호 입력"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError('') }}
              autoComplete="current-password"
            />
          </label>
          {passwordError && <p className="hitel-error">{passwordError}</p>}
          <button type="submit" className="hitel-btn">[ 확인 ]</button>
        </form>
      </div>
    )
  }

  return (
    <div className="board-list hitel-card">
      <nav className="hitel-nav">
        <Link to={`/apt/${aptId}`}>◀ 메인</Link>
        <span># {boardName}{protectedBoard ? ' 🔑' : ''}</span>
      </nav>
      <h2 className="hitel-board-title">게시판 총 {posts.length}건</h2>
      <table className="hitel-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>작성자</th>
            <th>제목</th>
            <th>조회</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan={4} className="hitel-empty">아직 글이 없습니다. 첫 글을 남겨보세요.</td>
            </tr>
          ) : (
            posts.map((post, i) => {
              const commentCount = getComments(aptId, boardId, post.id).length
              return (
                <tr key={post.id}>
                  <td>{posts.length - i}</td>
                  <td>{post.author}</td>
                  <td>
                    <Link to={`/apt/${aptId}/board/${boardId}/post/${post.id}`}>
                      {post.title}
                      {commentCount > 0 && (
                        <span className="board-list-comment-count"> ({commentCount})</span>
                      )}
                    </Link>
                  </td>
                  <td>{post.views || 0}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
      <div className="hitel-actions">
        <Link to={`/apt/${aptId}/board/${boardId}/write`} className="hitel-btn">
          [ 글쓰기 ]
        </Link>
      </div>
    </div>
  )
}
