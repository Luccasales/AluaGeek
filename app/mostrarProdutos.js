// mostrarProdutos.js

import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");

async function atualizarProduto(idProduto) {
    const url = `http://localhost:3000/Produtos/${idProduto}`;

    try {
        const conexao = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: false })
        });

        if (!conexao.ok) {
            throw new Error('Erro ao atualizar o produto.');
        }
    } catch (error) {
        console.error('Erro ao atualizar o produto', error);
    }
}

function constroiCard(nome, valor, imagem, id) {
    const produto = document.createElement("li");
    produto.className = "produtos__item";
    produto.innerHTML = `
        <div class="card" data-id="${id}">
            <img src="${imagem}" alt="Imagem do produto" class="imagem">
            <div class="card__container__info">
                <p>${nome}</p>
                <div class="card__container__value">
                    <p>${valor}</p>
                    <img src="images/iconeLixo.png" alt="Ícone lixo" class="lixeira">
                </div>
            </div>
        </div>
    `;

    const lixeira = produto.querySelector('.lixeira');
    lixeira.addEventListener('click', async () => {
        const card = lixeira.closest('.card');
        const idProduto = card.getAttribute('data-id');
        card.remove();
        await atualizarProduto(idProduto);
    });

    return produto;
}

async function listaProdutos() {
    const listaApi = await conectaApi.listaProdutos();
    const statusProdutos = listaApi.filter(produto => produto.status);

    if (statusProdutos.length > 0) {
        statusProdutos.forEach(elemento => {
            lista.appendChild(constroiCard(elemento.nome, elemento.valor, elemento.imagem, elemento.id));
        });
    } else {
        const mensagem = document.createElement('li');
        mensagem.textContent = 'Nenhum produto cadastrado!';
        mensagem.style.color = '#5D04D9';
        mensagem.style.fontFamily = '"Press Start 2P", system-ui';
        mensagem.style.fontSize = '1.2rem';
        mensagem.style.fontWeight = '600';
        lista.appendChild(mensagem);
    }
}

listaProdutos();
