const express = require('express');
const router = express.Router();
const { authorize, ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/test1', async (req, res, next) => {
  try {
    res.render('test1', {
      layout: 'chart',
    });
  } catch (err) {
    console.error(err);
    res.render('error/500', {
      layout: 'error',
    });
  }
});

router.get('/test2', async (req, res, next) => {
  try {
    res.render('test2', {
      layout: 'chart',
    });
  } catch (err) {
    console.error(err);
    res.render('error/500', {
      layout: 'error',
    });
  }
});

router.get('/test3', async (req, res, next) => {
  try {
    res.render('test3', {
      layout: 'chart',
    });
  } catch (err) {
    console.error(err);
    res.render('error/500', {
      layout: 'error',
    });
  }
});

router.get('/test4', async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=100&type=json'
    );

    // console.log(response.data);
    res.render('test4', {
      data: response.data,
      layout: 'chart',
    });
  } catch (err) {
    console.error(err);
    res.render('error/500', {
      layout: 'error',
    });
  }
});

router.get('/test5', async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://canvasjs.com/data/gallery/javascript/server-matrics.json'
    );

    // console.log(response.data);
    res.render('test5', {
      data: response.data,
      layout: 'chart',
    });
  } catch (err) {
    console.error(err);
    res.render('error/500', {
      layout: 'error',
    });
  }
});

router.get('/test27', async (req, res, next) => {
  //   console.log(' testing axios');
  try {
    const response = await axios.get(
      'https://canvasjs.com/data/gallery/javascript/server-matrics.json'
    );
    // console.log(response);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
