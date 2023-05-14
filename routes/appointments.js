const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Appointment = require('../models/appointmentModel');

router.get('/appointments', async (req, res) => {
  try {
    let user = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    console.log('ddd----',user);
    let query = user.is_admin == 'yes' ? {} :  {userId: user._id};
    const appointments = await Appointment.find(query)
    .populate('userId', 'name')
    .lean();
    console.log('app.',appointments);
    res.render('appointments', { appointments, is_admin : user.is_admin });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

 // edit appointment form
router.get('/appointments/edit/:id', ensureAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).lean();
    res.render('appointments/edit', { appointment });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// update appointment
router.put('/appointments/:id', ensureAuth, async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id).lean();

    if (!appointment) {
      return res.render('error/404');
    }

    appointment = await Appointment.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.redirect('/appointments');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// delete appointment
router.delete('/appointments/:id', ensureAuth, async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id).lean();

    if (!appointment) {
      return res.render('error/404');
    }

    await Appointment.remove({ _id: req.params.id });

    res.redirect('/appointments');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;
 