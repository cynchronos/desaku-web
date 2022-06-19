const express = require('express');
require('express-router-group');
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
// Create Route Group

router.post('/login-dashboard', urlEncoded, loginController.auth);

router.group('/dashboard', loginController.verifyLogin, router => {

    router.get('/', dashboardHomeController.index);

    router.get('/berita', dashboardBeritaController.index);

    router.get('/berita/tambah', dashboardBeritaController.create);

    router.post('/berita', dashboardBeritaController.store);

    router.get('/berita/edit/:_id', dashboardBeritaController.edit);

    router.put('/berita', dashboardBeritaController.update);

    router.delete('/berita', dashboardBeritaController.destroy);

    router.get('/logout', loginController.logout)

});

module.exports = { router };