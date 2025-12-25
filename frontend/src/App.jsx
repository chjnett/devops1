import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import AdminPage from './components/AdminPage'
import InquiryModal from './components/InquiryModal'

function App() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)

  return (
    <Router>
      <Routes>
        {/* 메인 페이지 */}
        <Route
          path="/"
          element={
            <>
              <MainPage onOpenInquiry={() => setIsInquiryModalOpen(true)} />
              <InquiryModal
                isOpen={isInquiryModalOpen}
                onClose={() => setIsInquiryModalOpen(false)}
              />
            </>
          }
        />

        {/* 관리자 페이지 */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  )
}

export default App
