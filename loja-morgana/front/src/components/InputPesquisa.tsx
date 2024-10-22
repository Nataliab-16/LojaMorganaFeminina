import { useForm } from "react-hook-form"
import { RoupaI } from "@/utils/types/roupas"
import { toast } from "sonner"

type Inputs = {
    termo: string
}

type InputPesquisaProps = {
    setRoupas: React.Dispatch<React.SetStateAction<RoupaI[]>>
}

export function InputPesquisa({ setRoupas }: InputPesquisaProps) {
    const { register, reset, handleSubmit } = useForm<Inputs>()
    async function enviaPesquisa(data: Inputs) {
        if (data.termo.length < 2) {
            toast.warning("Digite no mínimo, 2 caracteres para pesquisa")
            return
        }
        const response = await
            fetch(`${process.env.NEXT_PUBLIC_URL_API}/roupas/pesquisa/${data.termo}`)
        const dados = await response.json()
        if (dados.length==0) {
            toast.warning("Nenhuma pesquisa encontrada")
        }
        setRoupas(dados)
        reset({termo:""})
    }
    async function mostraDestaques() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/roupas`)
        const dados = await response.json()
        setRoupas(dados)
        reset({termo: ""})
    }


    return  (
        <section className="w-full mt-3 px-4">
        <form className="flex w-full items-center gap-3" onSubmit={handleSubmit(enviaPesquisa)}>
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500 dark:placeholder-gray-400"
                    placeholder="Qual peça você procura?"
                    required
                    {...register("termo")}
                />
            </div>
            <button
                type="submit"
                className="text-white bg-pinkm focus:ring-1 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2"
            >
                Buscar
            </button>
            <button
                type="button"
                className="text-white bg-pinkm hover:bg-pinkm focus:outline-none focus:ring-1 focus:ring-pink-300 font-medium rounded-full text-sm px-5 py-2.5"
                onClick={mostraDestaques}
            >
                Roupas em destaque
            </button>
        </form>
    </section>
    )
}