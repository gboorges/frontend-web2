import Header from "../components/Header"
import Footer from "../components/Footer"
import ListaTeste from "../components/ListaTeste"
import ListaAgenda from "../components/ListaAgenda"
import NovaAgendaModal from "../components/NovaAgendaModal"

export default function Home() {

  return (
    <>
      <div>
        <Header />
        <main>
          <div className="flex-col-reverse h-screen w-1/4 justify-center items-center">
            <h1 className="text-3xl">Agendas</h1>
            <ListaTeste />
            <ListaAgenda />
            <NovaAgendaModal />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
