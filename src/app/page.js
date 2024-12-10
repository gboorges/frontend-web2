import Header from "../components/Header"
import Footer from "../components/Footer"
import ListaAgenda from "../components/ListaAgenda"
import NovaAgendaModal from "../components/NovaAgendaModal"
import ListaGeral from "@/components/ListaGeral"

export default function Home() {

  return (
    <>
      <div>
        <Header />
        <main>
          <div className="flex">
          <div className="flex-col-reverse h-screen w-1/4 justify-center items-center">
            <h1 className="text-3xl">Agendas</h1>
            <ListaGeral />
          </div>
          <div className="flex bg-red-600 h-screen w-3/4">
          </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
