import Header from '../components/Header'
import Footer from '../components/Footer'

const sections = [
  {
    title: 'Introduction',
    content:
      'This Privacy Policy explains how Blue Chip Solutions collects, uses, stores, and protects personal information provided through our website, contact forms, and support channels. We are committed to handling your data responsibly and transparently.',
  },
  {
    title: 'Information We Collect',
    content:
      'We may collect your name, email address, phone number, company details, and inquiry message when you contact us, request a consultation, or submit a form. We may also collect technical data such as your IP address, browser type, and usage information for security and analytics purposes.',
  },
  {
    title: 'How We Use Your Information',
    content:
      'Your information is used to respond to inquiries, provide support, improve our services, maintain site security, and communicate with you regarding your request. We may also use anonymized data for internal reporting and service enhancement.',
  },
  {
    title: 'Data Storage and Retention',
    content:
      'We store inquiry and contact data in secure systems and retain it only for as long as necessary to respond to your request, comply with legal obligations, and maintain service records. In general, inquiry records are retained for a defined period in accordance with our internal policies.',
  },
  {
    title: 'Sharing of Information',
    content:
      'We do not sell or rent your personal data to third parties. We may share information only with trusted service providers who support our operations, such as hosting, email delivery, analytics, or support systems, and only as required to perform their services.',
  },
  {
    title: 'Your Rights',
    content:
      'You may request access to, correction of, or deletion of your personal information where applicable. If you wish to exercise these rights or have concerns about how your data is handled, please contact us directly.',
  },
  {
    title: 'Security',
    content:
      'We apply reasonable administrative, technical, and organizational safeguards to protect your information against unauthorized access, misuse, or loss. However, no system is completely immune to risk, and we encourage users to protect their own credentials and personal data.',
  },
  {
    title: 'Contact Us',
    content:
      'If you have questions about this Privacy Policy or your personal information, please contact us through the website contact form or the support channels listed on our site.',
  },
]

export default function Privacy(){
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container py-12 lg:py-16">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
          <div className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
            Privacy Policy
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            We are committed to protecting the privacy of visitors, clients, and business contacts. This policy explains what information we collect, how we use it, and the steps we take to keep it secure.
          </p>

          <div className="mt-10 space-y-6">
            {sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
