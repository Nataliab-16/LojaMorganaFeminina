"use client"
import { RoupaI } from "@/utils/types/roupas";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Detalhes() {
    const params = useParams()

    const [roupas, setRoupa] = useState<RoupaI>()
    useEffect(() => {
      async function buscaDados(){
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/roupas/${params.roupa_id}`)
        const dados = await response.json()
        setRoupa(dados)
    }
        buscaDados()
    }, [])

    return (
      <section className="flex mt-10 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl bg-pinkm">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg" 
           src={roupas?.foto} alt="Foto da roupa"/>
          <div className="flex flex-col justify-between p-4 leading-normal">

            <h5 className="poppins-bold mb-2 text-2xl font-bold tracking-tight focus:ring-pink-300 dark:text-white">
                {roupas?.nome} 
                </h5>

                <h5 className="poppins-regular mb-2 text-2xl font-bold tracking-tight focus:ring-pink-300 dark:text-white">
                 Tamanho: {roupas?.tamanho}
                </h5>

                <h5 className="poppins-regular mb-2 text-2xl font-bold tracking-tight focus:ring-pink-300 dark:text-white">
                 Cor: {roupas?.cor}
                </h5>

                <h5 className="poppins-bold mb-2 text-2xl font-bold tracking-tight focus:ring-pink-300 dark:text-white">
                    Preço R$: {Number(roupas?.preco)
                    .toLocaleString("pt-br", {minimumFractionDigits: 2})} 
                </h5>

              <p className="poppins-regular mb-3 font-normal focus:ring-pink-300 dark:text-white">
                {roupas?.descricao}
                </p>
       </div>
  </section>

    )
}