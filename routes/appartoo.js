const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const appartooCtrl = require('../controllers/appartoo');

router.get('/',  appartooCtrl.getAllSchtroumpf);
router.get('/profil', auth,  appartooCtrl.getOneSchtroumpf);
router.put('/profile', auth, appartooCtrl.modifySchtroumpf);
router.put('/deletefriend/:friendid', auth, appartooCtrl.deleteFriend);
router.put('/addfriend/:friendid', auth, appartooCtrl.addFriend);

module.exports = router;