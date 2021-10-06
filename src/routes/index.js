//Import express
const express = require('express');
const users = require('../../models/users');

// Use express router
const router = express.Router();

// Import controllers
const { getUsers, deleteUser } = require('../controllers/user');
const { register,login, forgotPassword } = require('../controllers/auth');
const { getBooks, getBook, addBook, deleteBook, editBook} = require('../controllers/book');
const { addTransaction, editTransaction, getTransaction, getTransactions } = require('../controllers/transaction');
const { editProfile, getProfile } = require('../controllers/profile')

// Import middleware
const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

// Set Route
router.get('/users', getUsers);
router.delete('/user/:id', deleteUser);

router.post('/register', register);
router.get('/login', login);
router.patch('/forgot-password/:id', auth, forgotPassword);

router.get('/books', getBooks);
router.get('/book/:id', getBook);
router.post('/book', auth, uploadFile('image'), addBook);
router.patch('/book/:id', auth, uploadFile('image'), editBook);
router.delete('/book/:id', auth, deleteBook);

router.post('/transaction', auth, uploadFile('image'), addTransaction);
router.patch('/transaction/:id', auth, editTransaction);
router.get('/transaction/:id', auth, getTransaction);
router.get('/transactions', auth, getTransactions);

router.patch('/profile/:id', auth, uploadFile('image'), editProfile);
router.get('/profile/:id', auth, getProfile);

// Export module router
module.exports = router;
