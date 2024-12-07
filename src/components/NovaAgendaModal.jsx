"use client";

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Radio, RadioGroup, useDisclosure } from "@nextui-org/react";

const cores = ["#FF5555", "#FFB254", "#F9FF51", "#7DFF63", "#54DAF8", "#5193FE", "#A963FF", "#FF6AFF", "#FF4FB0"]

export default function NovaAgendaModal() {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [cor, setCor] = useState("");

    const handleSave = async () => {
        console.log(titulo, descricao, cor)

        const response = await fetch('http://localhost:4000/agenda/', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({titulo, descricao, cor})
          })
      
            if(response?.ok){
              const data = await response.json()
              console.log(data) 
            } else {
              const data = await response.json()
              console.log(data) 
              alert(data.error)
            }
    }

    return (
        <>
            <div>
                <Button onPress={onOpen}>Nova Agenda</Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
            <>
                    <ModalHeader className="flex flex-col gap-1">Nova Agenda</ModalHeader>
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
                        <RadioGroup
                            label="Cor da Agenda"
                            orientation="horizontal"
                            value={cor}
                            onValueChange={setCor}
                        >
                            {cores.map((corOpcao) => (
                               <> <Radio
                                    key={corOpcao}
                                    value={corOpcao}
                                    color="default"
                                    className="w-8 h-8 p-0 m-1"
                                >
                                   
                                </Radio>
                                 <div
                                 style={{
                                     backgroundColor: corOpcao,
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
                            Salvar
                        </Button>
                    </ModalFooter>
                    </>
          )}
                </ModalContent>
            </Modal>
        </>
    );
}