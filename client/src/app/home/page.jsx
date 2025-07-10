import Navbar from '../components/Navbar'
import HeroSection from './components/HeroSection'
import CategoriasSection from './components/CategoriasSection'
import TendenciasSection from './components/TendenciasSection'
import Footer from './components/Footer'
import ChatBot from "@/app/home/components/ChatBot";

export default function HomePage() {
  return (
    <>
      <Navbar usuario="Rosmeri Ccanto" />
      <HeroSection />
      <CategoriasSection />
      <TendenciasSection />
      <Footer />
      <ChatBot />
    </>
  )
}
