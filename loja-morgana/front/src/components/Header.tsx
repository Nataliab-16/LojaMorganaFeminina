import Link from "next/link";
import { InputPesquisa } from "./InputPesquisa";


export function Header() {
    return (
        <nav className="bg-pinkm border-gray-200">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="./logo.png" className="h-20" alt="Logo loja" />
                </Link>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <Link href="/login" className="poppins-medium  text-white dark:text-white hover:underline">Realizar Login</Link>
                </div>
            </div>
        </nav>
    )
}