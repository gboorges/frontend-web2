import Header from "../components/Header"
import Footer from "../components/Footer"
import NovaAgenda from "../components/NovaAgenda"
import ListaAgenda from "../components/ListaAgenda"
import { CheckboxGroup, Checkbox } from "@nextui-org/react"
import NovaAgendaModal2 from "../components/NovaAgendaModal"


export default function Home() {

  return (
    <>
      <div>
        <Header />
        <main>
          <div className="flex-col-reverse h-screen w-1/4 justify-center items-center">
            <h1 className="text-3xl">Agendas</h1>
            <ListaAgenda></ListaAgenda>
            <NovaAgendaModal2 />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
