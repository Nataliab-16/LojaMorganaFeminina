export interface ClienteI {
    id: number;
    nome: string;
    email: string;
    senha: string;
    endereco: string;
    telefone?: string;
    criadoEm: Date;
    atualizadoEm?: Date;
}
