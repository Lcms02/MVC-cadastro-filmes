const db = require('./db');
const md5 = require('md5');

class UserModel{
    constructor(id, nome, email, senha){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    static async autenticar(email, senha){
        let user = await db.query(`SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}'`);
        return user;
    }
}

module.exports = UserModel;