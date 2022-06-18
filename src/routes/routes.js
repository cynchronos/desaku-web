const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const beritaController = require('../controllers/beritaController');
const loginController = require('../controllers/loginController');
const dashboardHomeController = require('../controllers/dashboard/dashboardHomeController')
const dashboardBeritaController = require('../controllers/dashboard/dashboardBeritaController')
const urlEncoded = express.urlencoded({ extended: true });

// User Routes
router.get('/', homeController.index);

router.get('/tentang-desaku/sekilas', homeController.about);

router.get('/berita', beritaController.index);

router.get('/berita/:slug', beritaController.details)

// Dashboard Routes
router.get('/login-dashboard', loginController.index);

// router.post('/login-dashboard/user/add', loginController.add);

router.post('/login-dashboard', urlEncoded, loginController.auth);

router.get('/dashboard', loginController.verifyLogin, dashboardHomeController.index);

router.get('/dashboard/berita', loginController.verifyLogin, dashboardBeritaController.index);

router.get('/dashboard/berita/tambah', loginController.verifyLogin, dashboardBeritaController.create);

router.post('/dashboard/berita', dashboardBeritaController.store);

router.get('/dashboard/berita/edit/:_id', loginController.verifyLogin, dashboardBeritaController.edit);

router.put('/dashboard/berita', loginController.verifyLogin, dashboardBeritaController.update);

router.delete('/dashboard/berita', loginController.verifyLogin, dashboardBeritaController.destroy);

router.get('/dashboard/logout', loginController.logout)

module.exports = { router };