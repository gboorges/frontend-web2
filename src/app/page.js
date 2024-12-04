import Header from "../components/Header"
import Footer from "../components/Footer"
import { CheckboxGroup, Checkbox } from "@nextui-org/react"
import NovaAgenda from "../components/NovaAgenda"


export default function Home() {
  return (
    <>
      <div>
        <Header />
        <main>
          <div className="flex-col-reverse h-screen w-1/4 justify-center items-center">
            <h1 className="text-3xl">Agendas</h1>
            <CheckboxGroup defaultValue={["agenda1", "agenda2"]}>
              <Checkbox value="agenda1">Agenda 1</Checkbox>
              <Checkbox value="agenda2">Agenda 2</Checkbox>
              <Checkbox value="agenda3">Agenda 3</Checkbox>
              <Checkbox value="agenda4">Agenda 4</Checkbox>
            </CheckboxGroup>
            <NovaAgenda />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
