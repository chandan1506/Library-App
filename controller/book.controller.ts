import { Request, Response } from 'express';
import { BookModel } from '../model/bookModel';

const createBookCreator = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body)
  try {
    const new_book = new BookModel(body);
    await new_book.save();
    res.status(200).json(new_book);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

const createBookViewer = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const new_book = new BookModel(body);
    await new_book.save();
    res.status(200).json(new_book);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getBooks = async (req: Request, res: Response) => {
  const Id = req.params.id;
  const body = req.body;
  const book = await BookModel.findOne({ _id: Id });
  const userID_in_book = book?.userID;
  const userID_making_req = req.body.userID;

  try {
    if (userID_making_req !== userID_in_book) {
      res.status(401).json({ message: 'You are not authorized' });
    } else {
      const allBook = await BookModel.find({ _id: Id });
      res.status(200).json(allBook);
    }
  } catch (err) {
    res.json({ err: err.message });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  const { old, new: isNew } = req.query;
  let query = {};
  if (old === '1') {
    query = { createdAt: { $lte: new Date(Date.now() - 10 * 60 * 1000) } };
  }
  if (isNew === '1') {
    query = { createdAt: { $gt: new Date(Date.now() - 10 * 60 * 1000) } };
  }
  try {
    const result = await BookModel.find(query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export { getBooks, createBookCreator, getAllBooks, createBookViewer };
