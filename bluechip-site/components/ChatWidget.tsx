import { useEffect, useMemo, useState } from 'react'

type Message = {
  id: number
  role: 'assistant' | 'user'
  text: string
}

const starterMessages = [
  'Hello! I can help with store support, inquiries, and product questions.',
  'To get started, please share your name, email, and phone number.',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'assistant', text: 'Hello! I can help with store support, inquiries, and product questions.' },
  ])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [inquiry, setInquiry] = useState('')
  const [step, setStep] = useState<'intro' | 'contact' | 'inquiry' | 'done'>('intro')

  const isReady = useMemo(() => Boolean(name && email && phone && inquiry), [name, email, phone, inquiry])

  useEffect(() => {
    if (!open) return
    setMessages((prev) => {
      if (prev.length > 1) return prev
      return [...prev, { id: 2, role: 'assistant', text: 'Please tell me your name, email, and phone number so I can help you.' }]
    })
  }, [open])

  function addMessage(text: string, role: 'assistant' | 'user' = 'assistant') {
    setMessages((prev) => [...prev, { id: Date.now(), role, text }])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (step === 'intro') {
      if (!name.trim()) {
        addMessage('Please provide your name so I can start.', 'assistant')
        return
      }
      setStep('contact')
      addMessage(`Thanks ${name}! I will need your email and phone next.`, 'assistant')
      return
    }

    if (step === 'contact') {
      if (!email.trim() || !phone.trim()) {
        addMessage('Please provide both your email and phone number.', 'assistant')
        return
      }
      setStep('inquiry')
      addMessage('Great. Please tell me your inquiry or question.', 'assistant')
      return
    }

    if (step === 'inquiry') {
      if (!inquiry.trim()) {
        addMessage('Please share your inquiry so I can assist you.', 'assistant')
        return
      }
      setStep('done')
      addMessage('Thank you. I have captured your request and our support team will contact you shortly.', 'assistant')
      return
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-[340px] max-w-[92vw] rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between rounded-t-3xl bg-slate-900 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Support Assistant</p>
              <p className="text-xs text-slate-300">We are here to help</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-sm text-slate-300">✕</button>
          </div>

          <div className="max-h-[360px] space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${message.role === 'user' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4 space-y-3">
            {step === 'intro' ? (
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Your name" />
            ) : null}

            {step === 'contact' ? (
              <>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Your email" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Your phone" />
              </>
            ) : null}

            {step === 'inquiry' ? (
              <textarea value={inquiry} onChange={(e) => setInquiry(e.target.value)} className="min-h-[90px] w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Describe your inquiry" />
            ) : null}

            {step === 'done' ? (
              <div className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">We will contact you soon.</div>
            ) : (
              <button className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white">Continue</button>
            )}
          </form>
        </div>
      ) : null}

      <button onClick={() => setOpen((prev) => !prev)} className="mt-3 rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-lg">
        {open ? 'Close chat' : 'Need help?'}
      </button>
    </div>
  )
}
