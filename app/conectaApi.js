// conectaApi.js

export async function listaProdutos() {
    const conexao = await fetch("http://localhost:3000/Produtos");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

export async function criaProduto(nome, valor, imagem) {
    const conexao = await fetch("http://localhost:3000/Produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            valor: valor,
            imagem: imagem,
            status: true,
        })
    });

    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

export const conectaApi = {
    listaProdutos,
    criaProduto,
};
