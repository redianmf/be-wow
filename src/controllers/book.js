// Import db connection
const db = require('../database/connection');

// Controllers
const { books, users } = require('../../models');

exports.getBooks = async (req, res) => {
    try {
      const booksData = await books.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'book_id', 'admin_id'],
        },
      });
  
      res.send({
        status: 'success',
        data : {
            books: booksData,
        }
      });
  
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };

exports.getBook = async (req, res) => {
    const {id} = req.params;

    try {
      const bookData = await books.findOne({
        where: {
            id,
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'book_id', 'admin_id'],
        },
      });
  
      res.send({
        status: 'success',
        data : {
            book: bookData,
        }
      });
  
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
};

exports.addBook = async (req, res) => {
    try {
      const { ...data } = req.body;
  
      const newBook = await books.create({
        ...data,
        bookFile: process.env.BOOK_IMG_PATH + req.file.filename,
        admin_id: req.user.id,
      });

      const book = await books.findOne({
          where: {
              id: newBook.id,
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'book_id', 'admin_id'],
          }
      })
  
      res.send({
        status: 'success',
        data: {
          book,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: 'failed',
        message: 'Server Error',
      });
    }
};

exports.deleteBook = async (req, res) => {
    const {id} = req.params;

    try {
      await books.destroy({
        where: {
            id,
        },
      });
  
      res.send({
        status: 'success',
        data : {
            id,
        }
      });
  
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
};

exports.editBook = async (req, res) => {
    const {...data} = req.body;
    const {id} = req.params;

    try {
    const bookData = {
        ...data,
        bookFile: process.env.BOOK_IMG_PATH + req.file.filename,
    }

    await books.update(bookData, {
        where: {
            id,
        },
    });

    const newData = await books.findOne({
        where: {
            id,
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'book_id', 'admin_id'],
        },
      });
  
      res.send({
        status: 'success',
        data : {
           book: newData,
        }
    });
  
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
};