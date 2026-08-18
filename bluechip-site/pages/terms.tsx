import Header from '../components/Header'
import Footer from '../components/Footer'

const sections = [
  {
    title: 'Introduction',
    content:
      'These Terms & Conditions govern the use of the BlueChip Solution website and the services presented through it. By accessing, browsing, or submitting a request through the site, you agree to these terms and to the business practices described in our privacy policy.',
  },
  {
    title: 'Scope of Services',
    content:
      'We provide software, business systems, consultation, and digital transformation support services tailored to operational needs. Service scope, pricing, timelines, and deliverables are subject to the project proposal or written agreement applicable to the engagement.',
  },
  {
    title: 'User Responsibilities',
    content:
      'Users must provide accurate information, act in compliance with all applicable laws, and use the website for legitimate business purposes only. Any misuse, abuse, unauthorized access attempts, or unlawful activity may result in restricted access or termination of services.',
  },
  {
    title: 'Payments & Commercial Terms',
    content:
      'Any subscription, implementation, or service fee is governed by the applicable quotation or commercial agreement. We reserve the right to change pricing, update packaged offerings, or revise service conditions in accordance with written communication and legal compliance requirements.',
  },
  {
    title: 'Intellectual Property',
    content:
      'All website content, branding, graphics, and technical materials remain the property of BlueChip Solution or their licensed owners. The content is provided for informational and business support use and may not be copied, distributed, or repurposed without authorization.',
  },
  {
    title: 'Confidentiality & Data Protection',
    content:
      'We handle information in line with our privacy policy and reasonable business safeguards. We may process client and inquiry data to support service delivery, internal operations, and business communication, subject to applicable law and the customer agreement.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'BlueChip Solution is not liable for indirect, incidental, or consequential losses resulting from website issues, downtime, service delays, or missed business outcomes, except where required by law or specifically agreed in writing. We aim to maintain reliable service delivery, but operational reliability depends on multiple external variables.',
  },
  {
    title: 'Termination & Amendments',
    content:
      'We may update, suspend, or discontinue portions of the website or services as needed to improve reliability, comply with legal requirements, or manage operational priorities. Continued use of the site after changes are posted constitutes acceptance of the revised terms.',
  },
  {
    title: 'Contact',
    content:
      'For questions, clarifications, or concerns regarding these Terms & Conditions, please reach out through our website contact page or the official support channels listed on the site. We welcome direct communication and will respond through the appropriate business contact method.',
  },
]

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container py-12 lg:py-16">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
          <div className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700">
            Terms & Conditions
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            These terms explain the relationship between BlueChip Solution and users of our website, digital services, and support channels. Please read them carefully before engaging with our business or submitting requests.
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

export function getServerSideProps() {
  return { props: {} }
}
