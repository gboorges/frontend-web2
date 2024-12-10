"use client"

import { useState, useEffect } from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input, Textarea, Radio, RadioGroup, } from "@nextui-org/react"
import Globais from './Globais'


export default function ListaEvento() {
  const cores = ["#FF5555", "#FFB254", "#F9FF51", "#7DFF63", "#54DAF8", "#5193FE", "#A963FF", "#FF6AFF", "#FF4FB0"]
  const [agendas, setAgendas] = useState([])
  const [eventos, setEventos] = useState([]) // Lista de agendas recebida do backend
  const [modalProps, setModalProps] = useState({ isEditing: false, agenda: null }) // Controle do modal
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [agendaId, setAgendaId] = useState("")
  const [tituloAgenda, setTituloAgenda] = useState("")
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState()
  const [id, setId] = useState(0)


  // Função para buscar a lista de agendas
  const handleGetEventoList = async () => {
    let response = null
    await fetch('http://localhost:4000/evento/list', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((req) => {
      response = req
    }).catch((error) => {
      console.log(error)
    })

    if (response?.ok) {
      const data = await response.json()
      console.log(data)
      setEventos(data)
    }
  }

  useEffect(() => {
    handleGetEventoList()  // Faz a requisição ao backend quando o componente é montado
    handleGetAgendaList()
  }, [Globais.refresh])

  const handleGetAgendaList = async () => {
    let response = null
    await fetch('http://localhost:4000/agenda/list', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((req) => {
      response = req
    }).catch((error) => {
      console.log(error)
    })

    if (response?.ok) {
      const data = await response.json()
      console.log(data)
      setAgendas(data)
    }
  }
  // Callback para atualizar a lista após salvar
  const atualizarListaEventos = (novoEvento) => {
    if (modalProps.isEditing) {
      // Atualiza uma agenda existente
      setEventos((prevEventos) =>
        prevEventos.map((evento) =>
          evento.id === novoEvento.id ? novoEvento : evento
        )
      )
    } else {
      // Adiciona uma nova agenda
      setEventos((prevEventos) => [...prevEventos, novoEvento])
    }

    setModalProps({ isEditing: false, evento: null }) // Fecha o modal
  }

  // Função para lidar com ações do dropdown
  const handleAction = (key, evento) => {
    if (key === "edit") {
      setIsEditing(true)
      setIsOpen(true)

      // Abre o modal em modo de edição
    } else if (key === "delete") {
      // Lógica para excluir a agenda
      console.log(id)
      handleDeleteEvento(evento.id)
    }
  }

  // Função para excluir uma agenda
  const handleDeleteEvento = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/evento/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Erro ao excluir o evento")

      // Atualiza a lista removendo a agenda excluída
      setEventos((prevEventos) => prevEventos.filter((evento) => evento.id !== id))
    } catch (error) {
      console.error("Erro ao excluir o evento:", error)
    }
  }

  const handleSaveEvento = (data) => {
    console.log("evento salvo:", data);
    Globais.refresh = !Globais.refresh
  };

  const handleSave = async () => {
    const payload = {
      agendaId: parseInt(agendaId),
      titulo,
      descricao,
      dataInicio: `${dataInicio}:00.000Z`,
      dataFim: `${dataFim}:00.000Z`,
    };
    console.log(payload)
    try {
      const response = await fetch(
        isEditing
          ? `http://localhost:4000/evento/${id}` // Atualizar evento
          : "http://localhost:4000/evento/", // Criar novo evento
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data)
      // Fecha o modal
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
    }
    fechaTudo()
  }

  function fechaTudo() {
    setId(0)
    setAgendaId(null)
    setTituloAgenda("")
    setTitulo()
    setDescricao()
    setDataFim()
    setDataInicio()
    setIsEditing(false)
    setIsOpen(false)
    Globais.refresh = !Globais.refresh
  }

  function inserirTituloAgenda(id, titulo) {
    if (agendaId == id) {
      setTituloAgenda(titulo)
    }
  }

  return (
    <>
      {/* Renderiza a lista de agendas */}
      {eventos.map((evento) => (
        <Dropdown key={evento.id}>
          <DropdownTrigger>
            <Button variant="ghost" className="w-full text-white" >{evento.titulo}</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Ações da Agenda"
            onAction={(key) => handleAction(key, evento)}
          >
            <DropdownItem key="edit" className="text-slate-900"
              onPress={() => {
                setAgendaId(evento.agendaId)
                setTitulo(evento.titulo)
                setDescricao(evento.descricao)
                setDataInicio(evento.dataInicio.substring(0, 16))
                setDataFim(evento.dataFim.substring(0, 16))
                setId(evento.id)
              }}>Editar Evento</DropdownItem>
            <DropdownItem key="delete" color="danger" className="text-slate-900">
              Excluir Evento
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ))}
      <Button onPress={() => { setIsOpen(true) }} >{isEditing ? "Editar Evento" : "Novo Evento"}</Button>
      {/* Modal para criação/edição */}
      <Modal isOpen={isOpen} onClose={() => { fechaTudo() }}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isEditing ? "Editar evento" : "Novo Evento"}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Nome da Evento"
                  placeholder="Dê um nome para seu evento"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
                <Textarea
                  label="Descrição"
                  placeholder="Para que será essa evento?"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
                <Dropdown key={agendas.id}>
                  <DropdownTrigger>
                    <Button variant="ghost" className="w-full text-black" >{agendaId == null ? 'Escolha a agenda' : tituloAgenda}</Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {agendas.map((agenda, index) => {
                      inserirTituloAgenda(agenda.id, agenda.titulo)
                      return (
                        <DropdownItem onPress={() => {
                          setAgendaId(agenda.id)
                          setTituloAgenda(agenda.titulo)
                        }} className="text-slate-900"
                          key={index}>{agenda.titulo}</DropdownItem>
                      )
                    })}
                  </DropdownMenu>
                </Dropdown>
                <Input
                  type="datetime-local"
                  label="Data de Início"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />

                {/* Campo para data de término */}
                <Input
                  type="datetime-local"
                  label="Data de Término"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  fechaTudo()
                }}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleSave}>
                  {isEditing ? "Salvar" : "Criar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}