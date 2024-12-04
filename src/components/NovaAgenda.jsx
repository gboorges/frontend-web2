"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";

export default function NovaAgenda() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} size="md" variant="ghost" radius="full" className="bg-gradient-to-tr from-teal-500 to-cyan-500 text-white shadow-lg">
                Nova Agenda
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}