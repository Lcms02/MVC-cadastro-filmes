const Filme = require('../models/filmeModel');
let filmes = [];

async function getFilmes(req, res) {
    filmes = await Filme.listarFilmes();
    res.render('filmes', { filmes });
}

async function addFilme(req, res) {
    const { titulo, sinopse, direcao, elenco} = req.body;
    const cartaz = req.file.originalname;

    const filme = new Filme(null, titulo, sinopse, direcao, elenco, cartaz);
    await filme.salvar();
    filmes.push(filme);
    res.redirect('/filme');
}

async function deleteFilme(req, res) {
    const { id } = req.body;
    await Filme.deleteFilme(id);
    res.redirect('/filme');
}

function updateFilme(req, res) {
    const { id, titulo, sinopse, direcao, elenco, cartaz } = req.body;
    filmes = filmes.map(filme => {
        if (filme.id == id) {
            filme.titulo = titulo;
            filme.sinopse = sinopse;
            filme.direcao = direcao;
            filme.elenco = elenco;
            filme.cartaz = cartaz;
        }
        return filme;
    });
    res.redirect('/filme');
}

module.exports = { getFilmes, addFilme, deleteFilme, updateFilme};
