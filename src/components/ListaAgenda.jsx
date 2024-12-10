"use client"

import { useState, useEffect } from "react"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"
import NovaAgendaModal from "./NovaAgendaModal"

export default function ListaAgenda() {
  
  const [agendas, setAgendas] = useState([]) // Lista de agendas recebida do backend
  const [modalProps, setModalProps] = useState({ isEditing: false, agenda: null }) // Controle do modal
  const [refresh, setRefresh] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Função para buscar a lista de agendas
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

  useEffect(() => {
    handleGetAgendaList()  // Faz a requisição ao backend quando o componente é montado
  }, [refresh])

  // Callback para atualizar a lista após salvar
  const atualizarListaAgendas = (novaAgenda) => {
    if (modalProps.isEditing) {
      // Atualiza uma agenda existente
      setAgendas((prevAgendas) =>
        prevAgendas.map((agenda) =>
          agenda.id === novaAgenda.id ? novaAgenda : agenda
        )
      )
    } else {
      // Adiciona uma nova agenda
      setAgendas((prevAgendas) => [...prevAgendas, novaAgenda])
    }

    setModalProps({ isEditing: false, agenda: null }) // Fecha o modal
  }

  // Função para lidar com ações do dropdown
  const handleAction = (key, agenda) => {
    console.log("rodou o handleAction")
    if (key === "edit") {
      return(
        <NovaAgendaModal isEditing={true} agenda={{ id: agenda.id, titulo: agenda.titulo, descricao: agenda.descricao, cor: agenda.cor }} onSave={handleSaveAgenda}/>
      ) // Abre o modal em modo de edição
    } else if (key === "delete") {
      // Lógica para excluir a agenda
      handleDeleteAgenda(agenda.id)
    }
  }

  // Função para excluir uma agenda
  const handleDeleteAgenda = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/agenda/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Erro ao excluir a agenda")

      // Atualiza a lista removendo a agenda excluída
      setAgendas((prevAgendas) => prevAgendas.filter((agenda) => agenda.id !== id))
    } catch (error) {
      console.error("Erro ao excluir a agenda:", error)
    }
  }

  const handleSaveAgenda = (data) => {
    console.log("Agenda salva:", data);
    setRefresh(!refresh)
  };

  return (
    <>
      {/* Renderiza a lista de agendas */}
      {agendas.map((agenda) => (
        <Dropdown key={agenda.id}>
          <DropdownTrigger>
            <Button variant="ghost" className="w-full text-white" >{agenda.titulo}</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Ações da Agenda"
            onAction={(key) => handleAction(key, agenda)}
          >
            <DropdownItem key="view" className="text-slate-900">Visualizar Eventos</DropdownItem>
            <DropdownItem key="edit" className="text-slate-900" 
            onPress={()=>{
              console.log("rodou a função")
              return(
                <NovaAgendaModal isEditing={true} agenda={{ id: agenda.id, titulo: agenda.titulo, descricao: agenda.descricao, cor: agenda.cor }} onSave={handleSaveAgenda}/>
              )
            }}>Editar Agenda</DropdownItem>
            <DropdownItem key="delete" color="danger" className="text-slate-900">
              Excluir Agenda
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ))}

      {/* Modal para criação/edição */}
      <NovaAgendaModal isOpen={()=>{setIsOpen(isOpen)}}isEditing={false} onSave={handleSaveAgenda} />
      <NovaAgendaModal
        isEditing={true}
        agenda={{ id: 1, titulo: "Teste", descricao: "Testando", cor: "#FF5555" }}
        onSave={handleSaveAgenda}
      />
    </>
  )
}