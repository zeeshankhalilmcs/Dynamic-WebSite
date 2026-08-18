import Header from '../components/Header'
import Footer from '../components/Footer'
import Clients from '../components/Clients'
import Hero from '../components/Hero'
import AnnouncementBar from '../components/AnnouncementBar'
import WhoWeAre from '../components/WhoWeAre'
import IndustriesServed from '../components/IndustriesServed'
import OurApproach from '../components/OurApproach'
import WhyChooseUs from '../components/WhyChooseUs'
import OurMission from '../components/OurMission'
import OurVision from '../components/OurVision'
import OurValues from '../components/OurValues'
import CTASection from '../components/CTASection'

export default function Home(){
  return (
    <div className="overflow-x-hidden">
      <Header />
      <Hero />
      <AnnouncementBar />
      <WhoWeAre />
      <main className="w-full bg-slate-900 px-4 py-16 sm:px-6 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">Our Core Services</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Everything You Need From One Technology Partner</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-cyan-500/30 bg-slate-800/60 p-5 backdrop-blur-sm transition hover:border-cyan-400/50 hover:bg-slate-800/80 sm:p-6">
              <div className="text-4xl">💾</div>
              <h3 className="mt-4 text-lg font-semibold text-white">Business Software</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">Custom software solutions designed for retail, pharmacy, restaurants, construction, and garments businesses. From POS systems to management software.</p>
            </div>
            <div className="rounded-xl border border-cyan-500/30 bg-slate-800/60 p-5 backdrop-blur-sm transition hover:border-cyan-400/50 hover:bg-slate-800/80 sm:p-6">
              <div className="text-4xl">⌨️</div>
              <h3 className="mt-4 text-lg font-semibold text-white">Hardware & POS</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">Business hardware and POS equipment including computers, touch machines, printers, barcode scanners, and thermal rolls for retail and hospitality operations.</p>
            </div>
            <div className="rounded-xl border border-cyan-500/30 bg-slate-800/60 p-5 backdrop-blur-sm transition hover:border-cyan-400/50 hover:bg-slate-800/80 sm:p-6">
              <div className="text-4xl">🔒</div>
              <h3 className="mt-4 text-lg font-semibold text-white">Network & IT</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">Networking solutions, CCTV systems, security infrastructure, time attendance systems, and structured cabling for secure, reliable business operations.</p>
            </div>
          </div>
        </div>
      </main>
      <IndustriesServed />
      <OurApproach />
      <WhyChooseUs />
      <OurMission />
      <OurVision />
      <OurValues />
      <Clients />
      <CTASection />
      <Footer />
    </div>
  )
}

export function getServerSideProps() {
  return { props: {} }
}
