import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Privacy(){
  return (
    <div>
      <Header />
      <main className="container py-12">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-4">We store inquiry data to respond to you. Data retention: 3 years. Contact email stored only for response purposes.</p>
      </main>
      <Footer />
    </div>
  )
}
