"use client";

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Radio, RadioGroup, useDisclosure } from "@nextui-org/react";

const cores = ["#FF5555", "#FFB254", "#F9FF51", "#7DFF63", "#54DAF8", "#5193FE", "#A963FF", "#FF6AFF", "#FF4FB0"]

export default function NovaAgendaModal2() {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [cor, setCor] = useState("");

    const handleSave = () => {
        console.log(titulo, descricao, cor)

        // Adicionar a chamada para enviar 

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