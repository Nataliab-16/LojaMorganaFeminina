"use client"
import {useForm} from "react-hook-form"
import { useRouter } from "next/navigation"

type Inputs = {
    email: string
    senha: string
    manter: boolean
}

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>()
    const router = useRouter()

    async function verificaLogin(data: Inputs){
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/login`, {
            headers: {
                "Content-Type":"application/json"
            },
            method: "POST",
            body: JSON.stringify({email:data.email, senha: data.senha})
        })
        
        if (response.status == 200) {
            const dados = await response.json()
            router.push("/")
        } 
    
    }

    return (
        <section className="">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Realize login na sua conta
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(verificaLogin)}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required {...register("email")}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required  {...register("senha")} />
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300"  {...register("manter")}>Lembre de mim</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Esqueceu a senha?</a>
                  </div>
                  <button type="submit" className="w-full text-white bg-pinkm hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Não tem conta ainda? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Cadastre-se</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    )
}