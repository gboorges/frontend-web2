"use client"

import React, { useState, useEffect } from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Radio, RadioGroup, useDisclosure } from "@nextui-org/react"

const cores = ["#FF5555", "#FFB254", "#F9FF51", "#7DFF63", "#54DAF8", "#5193FE", "#A963FF", "#FF6AFF", "#FF4FB0"]

export default function NovaAgendaModal({ isEditing, agenda, onSave }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const [titulo, setTitulo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [cor, setCor] = useState("")

    // Traz os dados da agenda selecionada para abrir o modal em modo de edição
    useEffect(() => {
        if (isOpen && isEditing && agenda) {
          setTitulo(agenda.titulo || "");
          setDescricao(agenda.descricao || "");
          setCor(agenda.cor || "");
        } else if (isOpen && !isEditing) {
          setTitulo("");
          setDescricao("");
          setCor("");
        }
      }, [isOpen, isEditing, agenda])

    const handleSave = async () => {
        console.log(titulo, descricao, cor)

        let response = null 
        await fetch(
                isEditing
                    ? `http://localhost:4000/agenda/${agenda.id}` // Endpoint EditAgenda
                    : "http://localhost:4000/agenda/", // Endpoint CreateAgenda
                {
                    method: isEditing ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                },
            ).then((req) => {
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

    return (
        <>
            <Button onPress={onOpen}>{isEditing ? "Editar Agenda" : "Nova Agenda"}</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
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
                                    {cores.map((cor) => (
                                        <> <Radio
                                            key={cor}
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
                                        </>
                                    ))}
                                </RadioGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
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