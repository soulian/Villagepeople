import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import AptHome from './pages/AptHome'
import AboutPage from './pages/AboutPage'
import BoardList from './pages/BoardList'
import PostView from './pages/PostView'
import PostWrite from './pages/PostWrite'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/apt/doosan" replace />} />
        <Route path="apt/:aptId" element={<AptHome />} />
        <Route path="apt/:aptId/about" element={<AboutPage />} />
        <Route path="apt/:aptId/board/:boardId" element={<BoardList />} />
        <Route path="apt/:aptId/board/:boardId/post/:postId" element={<PostView />} />
        <Route path="apt/:aptId/board/:boardId/write" element={<PostWrite />} />
      </Route>
    </Routes>
  )
}
