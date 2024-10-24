'use client'
import { useEffect, useState } from "react";
import { RoupaI } from "@/utils/types/roupas";
import { InputPesquisa } from "@/components/InputPesquisa";
import { Toaster } from "sonner";
import { Card } from "@/components/Card";
import { useClienteStore } from "@/context/clientes";


export default function Home() {
  const { logaCliente } = useClienteStore()
  const [roupas, setRoupas] = useState<RoupaI[]>([])
  useEffect(() => {
    async function buscaDados(){
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/roupas`)
      const dados = await response.json()
      setRoupas(dados)}
      buscaDados()

      async function buscaCliente(idCliente: string){
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`)
        if (response.status==200){
          const dados = await response.json()
          logaCliente(dados)
        }}
  
  
      if (localStorage.getItem("client_key")){
        const idClienteLocal = localStorage.getItem("client_key") as string
        buscaCliente(idClienteLocal)
      }
  
  }
  , [])

  const listaRoupas = roupas.map( roupa => (
    <Card data={roupa} key={roupa.id}/>
) )

  return (
    <main>
      <main>
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xxl p-4">
        <InputPesquisa setRoupas={setRoupas}/>
      </div>
      <section className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaRoupas}
        </div>
      </section>
      <Toaster position="top-center" richColors />
    </main>
    </main>
  );
}
