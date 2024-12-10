"use client"

import { useState, useEffect } from "react"
import {  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input, Textarea, Radio, RadioGroup, } from "@nextui-org/react"
import NovaAgendaModal from "./NovaAgendaModal"


export default function ListaGeral() {
    const cores = ["#FF5555", "#FFB254", "#F9FF51", "#7DFF63", "#54DAF8", "#5193FE", "#A963FF", "#FF6AFF", "#FF4FB0"]
  const [agendas, setAgendas] = useState([]) // Lista de agendas recebida do backend
  const [modalProps, setModalProps] = useState({ isEditing: false, agenda: null }) // Controle do modal
  const [refresh, setRefresh] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [cor, setCor] = useState("")
  const [id, setId] = useState(0)

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
        setIsEditing(true)
        setIsOpen(true)

      // Abre o modal em modo de edição
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

  const handleSave = async () => {
    console.log(titulo, descricao, cor)
    const payload = {
        titulo,
        descricao,
        cor,
    };

    try {
        const response = await fetch(
            isEditing
                ? `http://localhost:4000/agenda/${id}` // Atualizar agenda
                : "http://localhost:4000/agenda/", // Criar nova agenda
            {
                method: isEditing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        console.log(response)

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)
         // Fecha o modal
    } catch (error) {
        console.error("Erro ao salvar agenda:", error);
    }
    fechaTudo()
}

function fechaTudo(){
    setId(0)
    setTitulo()
    setCor()
    setDescricao()
    setIsEditing(false)
    setIsOpen(false)
    setRefresh(!refresh)
}
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
              setTitulo(agenda.titulo)
              setDescricao(agenda.descricao)
              setCor(agenda.cor)
              setId(agenda.id)
            }}>Editar Agenda</DropdownItem>
            <DropdownItem key="delete" color="danger" className="text-slate-900">
              Excluir Agenda
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ))}
        <Button onPress={()=>{setIsOpen(true)}} >{isEditing ? "Editar Agenda" : "Nova Agenda"}</Button>
      {/* Modal para criação/edição */}
      <Modal isOpen={isOpen}  onClose={()=>{fechaTudo}}>
        <ModalContent>
            {() => (
                <>
                    <ModalHeader className="flex flex-col gap-1">
                        {isEditing ? "Editar Agenda" : "Nova Agenda"}
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            label="Nome da Agenda"
                            placeholder="Dê um nome para sua agenda"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                        <Textarea
                            label="Descrição"
                            placeholder="Para que será essa agenda?"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                        <RadioGroup label="Cor da Agenda" orientation="horizontal" value={cor} onValueChange={setCor}>
                            {cores.map((cor, index) => (
                                <div key={index} className="flex-row"> 
                                <Radio
                                    
                                    value={cor}
                                    color="default"
                                    className="w-8 h-8 p-0 m-1"
                                >
                                </Radio>
                                <div
                                    style={{
                                        backgroundColor: cor,
                                        width: "50px",
                                        height: "50px",
                                        //borderRadius: "",
                                    }}
                                />
                                </div>
                            ))}
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={()=>{
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