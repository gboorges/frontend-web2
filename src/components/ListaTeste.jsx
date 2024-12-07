"use client"

import {Listbox, ListboxItem} from "@nextui-org/react"
import { useState } from 'react'
import { useEffect } from 'react'

export const ListboxWrapper = ({children}) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200">
    {children}
  </div>
);

export default function ListaTeste() {
    const [titulo, setTitulo] = useState('')
    const [cor, setCor] = useState('')
    const [descricao, setDescricao] = useState('')
    const [agendas, setAgendas] = useState([])  // Lista de agendas que será recebida do backend
    const [selectedAgendas, setSelectedAgendas] = useState([])

    const handleGetAgendaList = async () => {
        const response = await fetch('http://localhost:4000/agenda/list', {
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
    <ListboxWrapper>
      <Listbox aria-label="Dynamic Actions" items={selectedAgendas} onAction={(key) => alert(key)}>
        {agendas.map((agenda) => (
          <ListboxItem key={agenda.id} value={agenda.id}>
            {agenda.name}
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
}