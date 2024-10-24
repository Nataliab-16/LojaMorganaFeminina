import { RoupaI } from "@/utils/types/roupas";
import Link from "next/link";

export function Card({data}: {data: RoupaI}) {
    return (
        <div className="mb-6 max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
     <Link  href= {`/detalhes/${data.id}`}>
         <img className="poppins-semibold rounded-t-lg text-pinkm" 
         src={data.foto} 
         alt={`Imagem da peça ${data.nome}`} />
         </Link>
            <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-pinkm">{data.nome} - {data.marca.nome}</h5>
                <p className="mb-3 font-normal text-black poppins-bold text-2xl">R${Number(data.preco).toLocaleString("pt-br", {minimumFractionDigits: 2})}</p>
                <p className=" text-sm mb-3 font-normal text-gray-700 dark:text-gray-400 truncate">{data.descricao}</p>

                <Link  href= {`/detalhes/${data.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium bg-pinkm text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-pink-300">
                    Ver Detalhes
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>

    )
}