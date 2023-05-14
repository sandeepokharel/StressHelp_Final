const express = require('express');
const router = express.Router();
// const { authorize, ensureAuth, ensureGuest } = require('../middleware/auth');
const { get_data } = require('../controllers/kubios');
const { authorize, ensureAuth, ensureGuest } = require('../middleware/auth');
const all_results = require('./data/all_results.json');

// Offline data
//GET http://localhost:3000/kubios/test10
router.get('/test10', async (req, res, next) => {
  try {
    res.render('test10', {
      data: all_results,
      layout: 'chart',
    });
  } catch (err) {
    console.error(err);
    res.render('error/500', {
      layout: 'error',
    });
  }
});

// Data from kubios
//GET http://localhost:3000/kubios/test11
router.get('/test11', async (req, res, next) => {
  try {
    const response = await get_data();
    // console.log(response);
    res.render('test11', {
      data: response,
      layout: 'chart',
    });
  } catch (err) {
    console.error(err);
    res.render('error/500', {
      layout: 'error',
    });
  }
});

// Data from kubios + multiple charts
//GET http://localhost:3000/kubios/test12
router.get('/test12', async (req, res, next) => {
  try {
    const response = await get_data();
    // console.log(response);
    res.render('test12', {
      data: response,
      layout: 'chart',
    });
  } catch (err) {
    console.error(err);
    res.render('error/500', {
      layout: 'error',
    });
  }
});

// Protected + Data from kubios + multiple charts
//GET http://localhost:3000/kubios/test13
router.get(
  '/test13',
  ensureAuth,
  authorize('patient'),
  async (req, res, next) => {
    try {
      const response = await get_data();
      // console.log(response);
      res.render('test13', {
        data: response,
        layout: 'chart',
      });
    } catch (err) {
      console.error(err);
      res.render('error/500', {
        layout: 'error',
      });
    }
  }
);

module.exports = router;
