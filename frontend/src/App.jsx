import { useState } from 'react'
import MainPage from './components/MainPage'
import InquiryModal from './components/InquiryModal'

function App() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)

  return (
    <>
      <MainPage onOpenInquiry={() => setIsInquiryModalOpen(true)} />
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </>
  )
}

export default App
