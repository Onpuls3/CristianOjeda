import {pool} from './database.js';

class librosController{
    async getAll(req, res) {
        const [result] = await pool.query(`SELECT * FROM libros`);
        res.json(result);
    }

    async add(req, res){
        const libros = req.body;
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, año-publicacion, ISBN) VALUES(?, ?, ?, ?, ?)`, [libros.nombre, libros.autor, libros.categoria, libros.año-publicacion, libros.ISBN]);
        res.json({"id insertado": result.insertId});
    }

    async delete(req, res){
        const libros = req.body;
        const [result] = await pool.query(`DELETE FROM libros WHERE id=(?)`, [libros.id]);
        res.json({"Registros eliminados": result.affectedRows});
    }

    async update(req, res){
        const libros = req.body;
        const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), año-publicacion=(?), ISBN=(?) WHERE id=(?)`, [libros.nombre, libros.autor, libros.categoria, libros.año-publicacion, libros.ISBN, libros,id]);
        res.json({"Registros actualizados": result.changedRows});
    }

}

export const libros = new librosController();