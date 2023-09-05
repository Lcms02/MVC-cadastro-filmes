const db = require('./db');

class Filme { 
    constructor(id, titulo, sinopse, direcao, elenco, cartaz) { 
    this.id = id; 
    this.titulo = titulo;
    this.sinopse = sinopse;
    this.direcao = direcao;
    this.elenco = elenco;
    this.cartaz = cartaz;
    } 

    static listarFilmes() {
        let filmes = db.query('SELECT * FROM filme ORDER BY titulo ASC');
        return filmes;
    }

    async salvar() {
        let res = await db.query(`INSERT INTO filme (filmeid, titulo, sinopse, direcao, elenco, cartaz) VALUES ('${this.id}', '${this.titulo}', '${this.sinopse}', '${this.direcao}', '${this.elenco}', '${this.cartaz}')`);
    }

    static async deleteFilme(id) {
        let res = await db.query(`DELETE FROM filme WHERE filmeid = '${id}'`);
    }
} 
    
module.exports = Filme;