require("dotenv").config();
const axios = require("axios").default;
const port = process.env.PORT || 3001;

class Crud {
  constructor(props) {
    this.db = props.db;
    this.table = props.table;
    this.data = props.data;
    this.ref = props.ref;
  }
  static async create(db, table, data) {
    const tables = ["department", "role", "employee"];
    if (!tables.includes(table)) res.status(404).end();
    const columns = Object.keys(data);
    const placeholders = columns.map((v) => "?").toString();
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    await db.promise().query(query, [...Object.values(data)]);
    const returnData = await axios.get(`http://localhost:${port}/${table}`);
    return returnData.data;
  }
  static async delete(db, table, id, ref) {
    if (ref === "true") {
      const managerQuery = `UPDATE ${table} SET manager_id = null WHERE manager_id = ?`;
      await db.promise().query(managerQuery, [id]);
    }
    const query = `DELETE FROM ${table} WHERE id = ?`;
    const [rows] = await db.promise().query(query, [id]);
    return rows;
  }
  static async update(db, table, data) {
    const tables = ["department", "role", "employee"];
    if (!tables.includes(table)) res.status(404).end();
    const columns = Object.keys(data.new);
    const placeholders = columns.map((v) => "?").toString();
    const query = `UPDATE ${table} SET ${columns} = (${placeholders}) WHERE id = ?`;
    await db.promise().query(query, [...Object.values(data.new), data.id]);
    const returnData = await axios.get(`http://localhost:${port}/${table}`);
    return returnData.data;
  }
}

module.exports = Crud;
