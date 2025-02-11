const campoPesquisa = document.getElementById('campoPesquisa');
const resultadoPesquisa = document.getElementById('resultadoPesquisa');

// Adiciona um evento de "input" ao campo de pesquisa
campoPesquisa.addEventListener('input', function () {
    const termoPesquisa = campoPesquisa.value.trim(); // Remove espaços em branco no início e no fim

    if (termoPesquisa.length >= 3) { // Só busca se o usuário digitar pelo menos 3 caracteres
        buscarFilme(termoPesquisa);
    } else {
        resultadoPesquisa.innerHTML = ''; // Limpa os resultados se o campo estiver vazio ou com menos de 3 caracteres
    }
});

async function buscarFilme(nomeFilme) {
    const apiKey = 'SUA_CHAVE_DE_API'; // Substitua pela sua chave da OMDb API
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(nomeFilme)}&apikey=${apiKey}`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.Response === 'True') {
            exibirResultados(dados.Search); // Exibe a lista de filmes
        } else {
            resultadoPesquisa.innerHTML = '<p style="color: red;">Nenhum filme encontrado.</p>';
        }
    } catch (erro) {
        resultadoPesquisa.innerHTML = '<p style="color: red;">Erro ao buscar filmes. Verifique sua conexão com a internet.</p>';
    }
}

function exibirResultados(filmes) {
    resultadoPesquisa.innerHTML = ''; // Limpa os resultados anteriores

    filmes.forEach(filme => {
        const filmeHTML = `
            <div class="filme">
                <h2>${filme.Title} (${filme.Year})</h2>
                <img src="${filme.Poster}" alt="${filme.Title}">
                <button onclick="detalhesFilme('${filme.imdbID}')">Ver Detalhes</button>
            </div>
        `;
        resultadoPesquisa.innerHTML += filmeHTML;
    });
}

async function detalhesFilme(imdbID) {
    const apiKey = ''; // Substitua pela sua chave da OMDb API
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.Response === 'True') {
            exibirDetalhes(dados);
        } else {
            resultadoPesquisa.innerHTML = '<p style="color: red;">Erro ao carregar detalhes do filme.</p>';
        }
    } catch (erro) {
        resultadoPesquisa.innerHTML = '<p style="color: red;">Erro ao buscar detalhes do filme.</p>';
    }
}

function exibirDetalhes(filme) {
    resultadoPesquisa.innerHTML = `
        <h2>${filme.Title} (${filme.Year})</h2>
        <img src="${filme.Poster}" alt="${filme.Title}">
        <p><strong>Diretor:</strong> ${filme.Director}</p>
        <p><strong>Atores:</strong> ${filme.Actors}</p>
        <p><strong>Gênero:</strong> ${filme.Genre}</p>
        <p><strong>Sinopse:</strong> ${filme.Plot}</p>
        <p><strong>Avaliação IMDb:</strong> ${filme.imdbRating}</p>
        <button onclick="voltarParaResultados()">Voltar</button>
    `;
}

function voltarParaResultados() {
    const termoPesquisa = campoPesquisa.value.trim();
    buscarFilme(termoPesquisa); // Volta para a lista de resultados
}

function exibirResultados(filmes) {
    resultadoPesquisa.innerHTML = filmes.map(filme => `
        <div class="filme">
            <h3>${filme.Title} (${filme.Year})</h3>
            <img src="${filme.Poster}" alt="${filme.Title}">
            <button onclick="adicionarWishlist('${filme.imdbID}', '${filme.Title}', '${filme.Year}', '${filme.Poster}')">
                Adicionar à Wishlist
            </button>
        </div>
    `).join('');
}

// Elementos da Wishlist
const btnWishlist = document.getElementById('btn-wishlist');
const sidebar = document.getElementById('wishlist-sidebar');
const overlay = document.getElementById('overlay');
const fecharSidebar = document.querySelector('.fechar-sidebar');

// Controle da Sidebar
function toggleWishlist() {
    sidebar.classList.toggle('ativa');
    overlay.classList.toggle('ativa');
}

btnWishlist.addEventListener('click', toggleWishlist);
fecharSidebar.addEventListener('click', toggleWishlist);
overlay.addEventListener('click', toggleWishlist);

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('ativa')) {
        toggleWishlist();
    }
});

// Função para exibir wishlist (mantenha sua função existente)
function exibirWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const conteudoWishlist = document.getElementById('conteudo-wishlist');
    
    conteudoWishlist.innerHTML = wishlist.map(filme => `
        <div class="item-wishlist">
            <img src="${filme.poster}" alt="${filme.titulo}" class="poster-miniatura">
            <div class="info-wishlist">
                <h4>${filme.titulo} (${filme.ano})</h4>
                <button onclick="removerWishlist('${filme.imdbID}')">Remover</button>
            </div>
        </div>
    `).join('');
}