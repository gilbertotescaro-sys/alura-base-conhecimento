let cardContainer = document.querySelector(".card-container");
let dados = [];

async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

function iniciarBusca() {
    let termo = document.querySelector("input").value.toLowerCase();
    let dadosFiltrados = dados.filter(dado => {
        return dado.nome.toLowerCase().includes(termo) || dado.descrição.toLowerCase().includes(termo);
    });
    cardContainer.innerHTML = "";
    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.ano}</p>
        <p>${dado.descrição}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

carregarDados();
