import { useState } from 'react'
import WhatsAppLeadModal from './WhatsAppLeadModal'

const phoneNumber = '923087607119'
const defaultMessage = 'Hi BlueChip Solution, I want to inquire about POS system. Thanks'

function buildWhatsappUrl(phone: string, message: string) {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encodedMessage}`
}

export default function WhatsAppFloatingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const whatsappUrl = buildWhatsappUrl(phoneNumber, defaultMessage)

  return (
    <>
      <div className="fixed bottom-20 right-4 z-50">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label="Chat with BlueChip Solution on WhatsApp"
          className="inline-flex items-center gap-3 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-500/20 transition duration-300 hover:bg-emerald-600 hover:-translate-y-0.5 active:translate-y-0.5 motion-safe:animate-pulse-slow"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-emerald-600">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M20.52 3.48A11.88 11.88 0 0 0 12.01.01 11.92 11.92 0 0 0 .78 12.5c0 2.11.55 4.18 1.6 6.02L.02 24l5.55-1.44a11.82 11.82 0 0 0 5.84 1.45h.01c6.62 0 12.01-5.37 12.01-12 0-3.2-1.24-6.2-3.29-8.53Zm-8.51 18.23h-.01a10.16 10.16 0 0 1-5.2-1.4l-.37-.22-3.3.86.87-3.21-.24-.33A10.01 10.01 0 1 1 12.01 21.7Zm5.23-7.1c-.28-.14-1.65-.82-1.9-.91-.25-.08-.43-.12-.61.14-.18.26-.71.91-.87 1.1-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.4-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.46.14-.15.18-.26.28-.43.1-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.04-.22-.54-.44-.47-.61-.48l-.52-.01c-.18 0-.46.07-.7.34-.24.28-.92.9-.92 2.2 0 1.29.94 2.53 1.07 2.7.14.18 1.86 2.83 4.52 3.97.63.27 1.12.43 1.5.55.63.2 1.21.17 1.67.1.51-.08 1.65-.67 1.88-1.32.23-.64.23-1.19.16-1.31-.08-.12-.29-.18-.61-.32Z"/>
            </svg>
          </span>
          <span>WhatsApp</span>
        </button>
      </div>
      <WhatsAppLeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
