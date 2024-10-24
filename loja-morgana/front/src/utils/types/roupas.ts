export interface RoupaI {
    id: number;
    nome: string;
    descricao: string;
    tamanho: 'PP' | 'P' | 'M' | 'G' | 'GG'; 
    cor: string;
    preco: number;
    foto: string;
    estoque: number;
    marca: { 
        id: number;
        nome: string; // Nome da marca
    };
}
