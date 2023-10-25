import {pool} from './database.js';

class librosController{
    async getAll(req, res) {
        const [result] = await pool.query(`SELECT * FROM libros`);
        res.json(result);
    }

    async add(req, res){
        const libros = req.body;
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, fechaPublicacion, ISBN) VALUES(?, ?, ?, ?, ?)`, [libros.nombre, libros.autor, libros.categoria, libros.fechaPublicacion, libros.ISBN]);
        res.json({"id insertado": result.insertId});
    }

    async delete(req, res){
        try{
        const libros = req.body;
        const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`, [libros.ISBN]);
        if(result.affectedRows <=0) return res.status(404).json({message:"Libro no encontrado"});
        res.json({"Registros eliminados": result.affectedRows});
        } catch (error) {
            return res.status(500).json({message:"No se puede eliminar el libro"});
        }
    }

    async update(req, res){
        const libros = req.body;
        const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), fechaPublicacion=(?), ISBN=(?) WHERE id=(?)`, [libros.nombre, libros.autor, libros.categoria, libros.fechaPublicacion, libros.ISBN, libros.id]);
        res.json({"Registros actualizados": result.changedRows});
    }

}

export const libros = new librosController();