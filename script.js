const campoPesquisa = document.getElementById('campoPesquisa');
const botaoPesquisar = document.getElementById('botaoPesquisar');
const resultadoPesquisa = document.getElementById('resultadoPesquisa');

botaoPesquisar.addEventListener('click', function () {
    const termoPesquisa = campoPesquisa.value;

    if (termoPesquisa) {
        buscarFilme(termoPesquisa);
    } else {
        resultadoPesquisa.innerHTML = '<p style="color: red;">Por favor, digite o nome de um filme.</p>';
    }
});

async function buscarFilme(nomeFilme) {
    const apiKey = 'SUA_CHAVE_DE_API'; // Substitua pela sua chave da OMDb API
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(nomeFilme)}&apikey=${apiKey}`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.Response === 'True') {
            exibirResultado(dados);
        } else {
            resultadoPesquisa.innerHTML = '<p style="color: red;">Filme não encontrado. Tente novamente.</p>';
        }
    } catch (erro) {
        resultadoPesquisa.innerHTML = '<p style="color: red;">Erro ao buscar o filme. Verifique sua conexão com a internet.</p>';
    }
}

function exibirResultado(filme) {
    resultadoPesquisa.innerHTML = `
        <h2>${filme.Title} (${filme.Year})</h2>
        <img src="${filme.Poster}" alt="${filme.Title}">
        <p><strong>Diretor:</strong> ${filme.Director}</p>
        <p><strong>Atores:</strong> ${filme.Actors}</p>
        <p><strong>Gênero:</strong> ${filme.Genre}</p>
        <p><strong>Sinopse:</strong> ${filme.Plot}</p>
        <p><strong>Avaliação IMDb:</strong> ${filme.imdbRating}</p>
    `;
}