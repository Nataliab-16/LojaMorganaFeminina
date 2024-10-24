"use client"
import Link from "next/link";
import { InputPesquisa } from "./InputPesquisa";
import {useClienteStore} from "@/context/clientes"
import { useRouter } from "next/router";

export function Header() {
    const {cliente, deslogaCliente} = useClienteStore()
    const router = useRouter()
   
   
    function sairCliente() {
           deslogaCliente()
     if(localStorage.getItem("client_key")){localStorage.removeItem("client_key")}
           router.push("/login")
       }
   
    return (
        <nav className="bg-pinkm border-gray-200">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="./logo.png" className="h-20" alt="Logo loja" />
                </Link>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                { cliente.id ?
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <span className="text-sm text-gray-500 dark:text-white hover:underline">{cliente.nome}</span>
                        <span className="cursor-pointer font-semibold  text-blue-600 dark:text-blue-500 hover:underline" onClick={sairCliente}>Sair</span>
                    </div>
                    :
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <span className="text-sm text-gray-500 dark:text-white hover:underline">(Identifique-se)</span>
                        <Link href="/login" className="font-semibold  text-blue-600 dark:text-blue-500 hover:underline">Entrar</Link>   </div>}
                </div>
            </div>
        </nav>
    )
}