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
    cardContainer.innerHTML = "";
    const langStyles = {
        "JavaScript": { bg: "#f0db4f", color: "#000" },
        "Python": { bg: "#306998", color: "#fff" },
        "Java": { bg: "#b07219", color: "#fff" },
        "C++": { bg: "#00599C", color: "#fff" },
        "C#": { bg: "#178600", color: "#fff" },
        "PHP": { bg: "#7477a1", color: "#fff" }
    };

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");

        const estilo = langStyles[dado.nome] || { bg: "#6b7280", color: "#fff" };
        const inicial = (dado.nome && dado.nome.charAt(0)) || "";
        const temIcone = dado.icon && dado.icon.length;
        const iconHtml = temIcone
            ? `<img src="${dado.icon}" alt="Ícone do ${dado.nome}" class="card-icon">`
            : `<span class="lang-icon" aria-hidden="true" style="background:${estilo.bg}; color:${estilo.color};">${inicial}</span>`;

        article.innerHTML = `
        <h2>${iconHtml}${dado.nome}</h2>
        <p>${dado.data_criacao}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

carregarDados();
