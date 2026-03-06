const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  password: 'mysecretpassword',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
});

app.use(express.static('public'));

app.post('/deltagere', async (req, res) => {
    const data = req.body;
    console.log('Lagrer deltager: ', data)
    const query = 'INSERT INTO users (name) VALUES ($1)';
    const values = [data.name];
    await pool.query(query, values);
    console.log('Lagret deltager: ', data)
    res.send('Data lagret');
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.get('/deltagere-2', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    let html = "<h1>Deltagere</h1><ul>";
    for (const row of result.rows) {
        html += "<li>" + row.name + "</li>";
    }
    html += "</ul>";
    res.send(html);
});

app.get('/bilmerker', async (req, res) => {
    const result = await pool.query('SELECT * FROM bilmerker');
    let html = "<h1>Bilmerker</h1><ul>";
    for (const row of result.rows) {
        html += "<li>" + row.merke + "</li>";
    }
    html += "</ul>";
    res.send(html);
});

app.get('/deltagere-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

app.get('/bilmerker-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM bilmerker');
    res.json(result.rows);
});

app.get('/skuespillere-og-filmer', async (req, res) => {
    const { rows } = await pool.query(`
        SELECT skuespillere.navn, filmer.tittel 
        FROM skuespiller_i_film
        JOIN skuespillere ON skuespiller_i_film.skuespiller_id = skuespillere.id
        JOIN filmer ON skuespiller_i_film.film_id = filmer.id
    `);

    res.send(`
        <table border="1">
            ${rows.map(r => `<tr><td>${r.navn}</td><td>${r.tittel}</td></tr>`).join('')}
        </table>
    `);
});

app.get('/skuespillere-og-filmer-json', async (req, res) => {
    const { rows } = await pool.query(`
        SELECT skuespillere.navn, filmer.tittel 
        FROM skuespiller_i_film
        JOIN skuespillere ON skuespiller_i_film.skuespiller_id = skuespillere.id
        JOIN filmer ON skuespiller_i_film.film_id = filmer.id
    `);

    res.json(rows);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});