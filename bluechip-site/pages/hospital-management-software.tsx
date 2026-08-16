import SolutionPageLayout from '../components/SolutionPageLayout'

const features = [
  {
    title: 'Outpatient and inpatient management',
    description: 'Coordinate patient registration, doctor schedules, admissions, discharge, follow-up, and care planning through one connected workflow.',
  },
  {
    title: 'Pharmacy and lab integration',
    description: 'Support prescribing, dispensing, stock movement, diagnostic orders, and result tracking with fewer manual handoffs.',
  },
  {
    title: 'Billing and revenue visibility',
    description: 'Streamline invoicing, discounts, payments, and financial reporting so departments can operate with clearer accountability.',
  },
  {
    title: 'EMR and clinical documentation',
    description: 'Create a dependable digital record of appointments, treatment plans, diagnoses, and patient history for better continuity of care.',
  },
  {
    title: 'Compliance and governance',
    description: 'Support audit readiness, quality control, and structured processes that help healthcare teams maintain dependable operations.',
  },
  {
    title: 'Operational oversight',
    description: 'Give administrators the visibility needed to manage staff, capacity, service flow, and growth across departments and locations.',
  },
]

const benefits = [
  {
    title: 'Faster patient flow',
    description: 'Shorten waiting times and reduce delays with more orderly scheduling, registration, and care coordination.',
  },
  {
    title: 'Stronger accountability',
    description: 'Provide teams and leadership with better records, reporting, and visibility across clinical and administrative functions.',
  },
  {
    title: 'Reliable growth support',
    description: 'Scale from a single facility to larger hospital networks without losing consistency in service delivery or reporting.',
  },
]

const modules = [
  'OPD management',
  'IPD management',
  'Pharmacy operations',
  'Lab and radiology workflows',
  'Appointments and scheduling',
  'Financial and billing controls',
]

export default function HospitalManagementSoftwarePage() {
  return (
    <SolutionPageLayout
      eyebrow="Healthcare technology"
      title="Hospital Management Software"
      subtitle="A polished healthcare operating system for hospitals, clinics, and specialist networks that need dependable patient and operational workflows."
      heroBullets={[
        'Unified OPD, IPD, pharmacy, lab, billing, and EMR workflows',
        'Structured records designed to support compliance and audit readiness',
        'Clear visibility into capacity, service delivery, and daily administration',
      ]}
      features={features}
      benefits={benefits}
      ctaLabel="Book a consultation"
      ctaHref="/contact"
      extraContent={
        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Core solution areas</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Designed to unify the most important hospital workflows.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">From front-desk coordination to medical records and billing, the platform is structured to keep operations consistent and easier to manage.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {modules.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">{item}</div>
              ))}
            </div>
          </div>
        </section>
      }
    />
  )
}
