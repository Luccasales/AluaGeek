import { conectaApi } from "./conectaApi.js";

const formulario = document.querySelector("[data-formulario]");

async function criarProduto(evento) {
    evento.preventDefault();

    const nome = document.getElementById("campoNome").value;
    const valor = document.getElementById("campoValor").value;
    const imagem = document.getElementById("campoImage").value;

    console.log("Dados do produto:", { nome, valor, imagem });

    try {
        await conectaApi.criaProduto(nome, valor, imagem);
        alert('Produto guardado com sucesso!');
        location.reload(); // Atualiza a página para refletir os novos produtos
    } catch (error) {
        console.error('Erro ao criar produto:', error);
    }
}

formulario.addEventListener("submit", evento => criarProduto(evento));

const limparButton = document.getElementById('limpar');
limparButton.addEventListener('click', () => {
    document.getElementById('campoNome').value = '';
    document.getElementById('campoValor').value = '';
    document.getElementById('campoImage').value = '';
    alert("Limpo");
});
