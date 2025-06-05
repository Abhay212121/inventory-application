#! /usr/bin/env node
require('dotenv').config();
const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS items(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    item_name VARCHAR (250),
    item_quantity INTEGER,
    category_id INTEGER
);

CREATE TABLE IF NOT EXISTS category(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR(250)
);

INSERT INTO category(category_name) VALUES ('Mobile phones'), ('Laptops'), ('TVs');

INSERT INTO items(item_name,item_quantity,category_id) Values ('motorola edge 30',2,1),('samsung m30',5,1),('HP pavilion',7,2),('Dell legion',1,2),('LG',11,3);
`

async function main() {
    console.log('seeding....')
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING
    })
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log("done")
}

main()