type TermsModalProps = {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
}

const sections = [
  {
    title: 'Introduction',
    content:
      'These Terms & Conditions govern your use of the BlueChip Solution website and the services offered through it. By accessing or using our website, you agree to these terms and acknowledge that the information provided is for general informational and business-support purposes.',
  },
  {
    title: 'Service Use',
    content:
      'We provide business software, consulting, digital transformation support, and related technology services. You agree to use the website and any related services in a lawful and responsible manner and not to misuse the platform for fraudulent, abusive, or unauthorized activity.',
  },
  {
    title: 'Client Responsibilities',
    content:
      'Clients are responsible for providing accurate information, timely approvals, and complete business requirements relevant to the services requested. We may rely on the information you provide when preparing proposals, implementation plans, or recommendations.',
  },
  {
    title: 'Payments & Orders',
    content:
      'Any service requests, pricing plans, or implementation proposals are subject to confirmation and may vary based on scope, timeline, or operational requirements. All fees, deposits, or agreed payments are subject to the written commercial terms applicable to the relevant engagement.',
  },
  {
    title: 'Intellectual Property',
    content:
      'All content, branding, text, graphics, software elements, and materials appearing on this website are owned by BlueChip Solution or licensed for use by the business. You may not copy, reproduce, distribute, or repurpose our website content without prior written authorization.',
  },
  {
    title: 'Privacy & Security',
    content:
      'We take reasonable measures to protect your information and personal data in accordance with our privacy policies. However, no platform can guarantee absolute security, and you remain responsible for the confidentiality of your own credentials and operational data.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'BlueChip Solution shall not be liable for indirect, incidental, consequential, or special damages arising out of the use or inability to use the website or services, including loss of business, lost profits, or reputational harm, unless such liability is expressly provided under applicable law.',
  },
  {
    title: 'Termination & Changes',
    content:
      'We may modify, suspend, or discontinue any part of our website or service offering at any time. Continued use of the site after such changes signifies your acceptance of the updated terms or policies.',
  },
  {
    title: 'Contact',
    content:
      'If you have questions about these Terms & Conditions, please contact us through the website contact form or the official support channels listed on our site. We are committed to answering questions clearly and transparently.',
  },
]

export default function TermsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-cyan-500/20 bg-slate-950 shadow-[0_20px_70px_rgba(6,182,212,0.12)]">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3 sm:px-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-400">Legal</p>
            <h3 className="mt-1 text-lg font-semibold text-white sm:text-xl">Terms & Conditions</h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
            aria-label="Close terms dialog"
          >
            Close
          </button>
        </div>

        <div className="max-h-[72vh] overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          <div className="space-y-3 text-sm leading-7 text-slate-300">
            <p className="rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2 text-slate-300">
              These Terms & Conditions explain the responsibilities associated with using our website, services, and business support flows. We encourage you to read them carefully before proceeding with an inquiry, consultation, or service request.
            </p>

            {sections.map((section) => (
              <section key={section.title} className="rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-3">
                <h4 className="text-sm font-semibold text-white">{section.title}</h4>
                <p className="mt-1 text-sm leading-6 text-slate-300">{section.content}</p>
              </section>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 bg-slate-900/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-end sm:px-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => {
              onAccept()
              onClose()
            }}
            className="rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110"
          >
            I agree
          </button>
        </div>
      </div>
    </div>
  )
}
