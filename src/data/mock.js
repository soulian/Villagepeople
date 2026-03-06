export const APARTMENTS = [
  { id: 'doosan', name: '분당두산위브트레지움' },
  { id: 'hanra3', name: '한라3단지' },
  { id: 'hwain2', name: '화인유천2단지' },
  { id: 'imgwang', name: '임광보성' },
  { id: 'michelan', name: '미켈란쉐르빌' },
  { id: 'kolon', name: '코오롱더프라우' },
  { id: 'housestory', name: '분당하우스토리' },
  { id: 'gyeryong', name: '계룡' },
  { id: 'seogwang', name: '서광영남' },
]

export const BOARD_IDS = {
  notice: '공지사항',
  free: '자유게시판',
  news: '소식', // 실제 표시명은 getBoardDisplayName에서 아파트 이름 + '소식'
  suggest: '개선건의사항',
}

/** 공지사항 글쓰기용 운영자 비밀번호 (필요시 코드에서 변경) */
export const OPERATOR_PASSWORD = 'village2024'

export function checkOperatorPassword(input) {
  return input === OPERATOR_PASSWORD
}

export function getBoardDisplayName(aptId, boardId) {
  if (boardId === 'news') {
    const apt = APARTMENTS.find((a) => a.id === aptId)
    return apt ? `${apt.name}소식` : '소식'
  }
  return BOARD_IDS[boardId] || boardId
}

const STORAGE_KEY = 'village_people_data'
const NICKNAME_KEY = 'village_people_nickname'

export function getStoredNickname() {
  try {
    return sessionStorage.getItem(NICKNAME_KEY) || ''
  } catch (_) {
    return ''
  }
}

export function setStoredNickname(nick) {
  try {
    sessionStorage.setItem(NICKNAME_KEY, nick || '')
  } catch (_) {}
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (_) {}
  return { posts: {}, comments: {} }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (_) {}
}

export function getPosts(aptId, boardId) {
  const data = loadData()
  const key = `${aptId}:${boardId}`
  const list = data.posts[key] || []
  return [...list].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
}

export function getPost(aptId, boardId, postId) {
  const list = getPosts(aptId, boardId)
  return list.find((p) => p.id === postId) || null
}

export function addPost(aptId, boardId, { title, body, author }) {
  const data = loadData()
  const key = `${aptId}:${boardId}`
  if (!data.posts[key]) data.posts[key] = []
  const post = {
    id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    title,
    body,
    author: author || '익명',
    createdAt: Date.now(),
    views: 0,
  }
  data.posts[key].push(post)
  saveData(data)
  return post
}

export function increaseViews(aptId, boardId, postId) {
  const data = loadData()
  const key = `${aptId}:${boardId}`
  const list = data.posts[key] || []
  const post = list.find((p) => p.id === postId)
  if (post) {
    post.views = (post.views || 0) + 1
    saveData(data)
  }
}

export function getComments(aptId, boardId, postId) {
  const data = loadData()
  const key = `${aptId}:${boardId}:${postId}`
  const list = data.comments[key] || []
  return [...list].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0))
}

export function addComment(aptId, boardId, postId, { body, author }) {
  const data = loadData()
  const key = `${aptId}:${boardId}:${postId}`
  if (!data.comments[key]) data.comments[key] = []
  const comment = {
    id: `c_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    body,
    author: author || '익명',
    createdAt: Date.now(),
  }
  data.comments[key].push(comment)
  saveData(data)
  return comment
}
