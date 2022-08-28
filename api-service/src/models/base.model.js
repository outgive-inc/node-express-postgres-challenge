const db = require('../config/database.connection');
const { v4: uuidv4 } = require('uuid');

class BaseModel {
    table
    model
    
    all = async() => {
        
        let query = {text: `SELECT * FROM ${this.table} ORDER BY completed ASC`}
        return db.query(query)
        .then(res => res.rows)
        .catch(e => console.error(e.stack))
    }
    
     findById = async(id) => {
        let query = {text: `SELECT * FROM ${this.table} WHERE id = $1`, values: [id]}
        return db.query(query)
        .then(res => (res.rows.length) ? res.rows[0] : null)
        .catch(e => console.error(e.stack))
    }
    
     insert = async(record) => {
        record[`${this.primary_key}`] = uuidv4()
        let placeholders = Object.keys(record).map((key, index) => `$${index+1} `).join(", ")
        let queryText = `INSERT INTO ${this.table} (${Object.keys(record).map(key => `${key}`).join(", ")}) VALUES(${placeholders}) RETURNING *`;
        let queryValues = [...Object.values(record)]
        
        let query = {text: queryText, values: queryValues};
      
        return db.query(query)
        .then(res => (res.rows.length) ? res.rows[0] : null)
        .catch(e => console.error(e.stack))
    }
    
    update = async(record, id) => {
        let columns = Object.keys(record).map((key, index) => `${key} = $${index+1}`).join(", ")
        var length = Object.keys(record).length;
        let queryValues = [...Object.values(record), id]
        let queryText = `UPDATE ${this.table} SET ${columns} WHERE ${this.primary_key} = $${length+1} RETURNING *`
      
        let query = {text: queryText, values: queryValues};
    
        return db.query(query)
        .then(res => (res.rows.length) ? res.rows[0] : null)
        .catch(e => console.error(e.stack))
    }
    
    destroy = async(id) => {
        console.log(id)
        let queryText = `DELETE FROM ${this.table} WHERE ${this.primary_key} = $1` 
        let query = {text: queryText, values: [id]};
    
        return db.query(query)
        .then(res => res.rowCount)
        .catch(e => console.error(e.stack))
    }
}

module.exports = BaseModel