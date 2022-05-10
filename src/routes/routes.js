const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const beritaController = require('../controllers/beritaController');

router.get('/', homeController.index);

router.get('/tentang-desaku/sekilas', homeController.about);

router.get('/berita', beritaController.index);

router.post('/berita/add', beritaController.store);

router.get('/berita/:slug', beritaController.details)

module.exports = { router };