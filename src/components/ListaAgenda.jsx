"use client"
import { useState } from 'react'
import { useEffect } from 'react'
import { CheckboxGroup, Checkbox } from "@nextui-org/react"



export default function ListaAgenda() {

    const [titulo, setTitulo] = useState('')
    const [cor, setCor] = useState('')
    const [descricao, setDescricao] = useState('')
    const [agendas, setAgendas] = useState([])  // Lista de agendas que será recebida do backend
    const [selectedAgendas, setSelectedAgendas] = useState([])

    const handleGetAgendaList = async () => {
        const response = await fetch('http://localhost:4000/agenda', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: titulo, cor, descricao })
        })

        if (response?.ok) {
            const data = await response.json()
            console.log(data)
        } else {
            const data = await response.json()
            console.log(data)
            alert(data.error)
        }
    }

    useEffect(() => {
        handleGetAgendaList()  // Faz a requisição ao backend quando o componente é montado
    }, [])

    const handleCheckboxChange = (values) => {
        setSelectedAgendas(values)  // Atualiza o estado com as agendas selecionadas
    }



    return (
        <div>
            <CheckboxGroup value={selectedAgendas} onChange={handleCheckboxChange} defaultValue={["agenda1", "agenda2"]}>
                {agendas.map((agenda) => (
                    <Checkbox key={agenda.id} value={agenda.id}>{agenda.name}</Checkbox>
                ))}
            </CheckboxGroup>
        </div>

    )


}