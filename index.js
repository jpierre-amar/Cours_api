/**
 * API Express.js pour la gestion des utilisateurs
 * 
 * Cette application fournit une API REST simple pour interroger une base de données PostgreSQL.
 * Elle utilise Express.js comme framework web et le client PostgreSQL (pg) pour la connexion à la base de données.
 * 
 * @module index
 * @requires pg
 * @requires express
 */

import { Client } from 'pg'
import express from 'express'

/**
 * Configuration du client PostgreSQL
 * Les paramètres de connexion sont récupérés depuis les variables d'environnement :
 * - DB_HOST: Adresse du serveur PostgreSQL
 * - DB_PORT: Port du serveur PostgreSQL
 * - DB_USER: Nom d'utilisateur pour la connexion
 * - DB_PASSWORD: Mot de passe pour la connexion
 * - DB_NAME: Nom de la base de données
 */
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

/**
 * Instance de l'application Express
 */
const app = express()

/**
 * Port sur lequel l'application écoute
 * @constant {number}
 */
const port = 3000

// Configuration des middlewares Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Route racine de l'API
 * @route GET /
 * @returns {string} Message d'information indiquant d'utiliser /users pour accéder aux utilisateurs
 */
app.get('/', (req, res) => {
    res.send('Route raçine, pour les users, aller sur /users')
})

/**
 * Route pour récupérer la liste de tous les utilisateurs
 * @route GET /users
 * @returns {Array<Object>} Tableau contenant tous les utilisateurs de la base de données
 * @throws {Error} Erreur si la connexion à la base de données échoue
 */
app.get('/users', async (req, res) => {
    await client.connect()
    const result = await client.query('SELECT * FROM "user"')
    await client.end()
    console.log(result.rows)
    res.send(result.rows)
})

/**
 * Démarre le serveur Express sur le port configuré
 */
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })