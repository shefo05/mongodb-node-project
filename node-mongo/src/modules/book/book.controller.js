import { Router } from "express";
import {
  addBookDocument,
  addMultipleBooks,
  aggregateFilterFields,
  aggregateFilterSort,
  aggregateJoinLogsCollection,
  aggregateSeparateGenresFields,
  createCollectionExplicit,
  createTitleIndex,
  deleteBooksBeforeYear,
  findBookByTitle,
  findBooksByGenres,
  findBooksByYear,
  findBooksExcludeGenres,
  findBooksWithIntYear,
  findBooksWithSkipLimit,
  updateBookByTitle,
} from "./book.service.js";

const router = Router();

//////////////////////////////////////////////////////////////////

// 1 -

router.post("/collection", async (req, res, next) => {
  try {
    await createCollectionExplicit();

    res.status(201).json({
      message: "collection created succefully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//////////////////////////////////////////////////////////////////

// 4 -

router.post("/index", async (req, res, next) => {
  try {
    const result = await createTitleIndex();
    console.log(result);

    res.status(201).json({
      message: "index created successfully",
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//////////////////////////////////////////////////////////////////

// 5 -

router.post("/", async (req, res, next) => {
  try {
    const result = await addBookDocument(req.body);

    res
      .status(201)
      .json({ message: "book added successfully", success: true, result });
  } catch (error) {
    res.status(500).json({ mwssage: error.message, success: 500 });
  }
});

//////////////////////////////////////////////////////////////////

// 6 -

router.post("/batch", async (req, res, next) => {
  try {
    const result = await addMultipleBooks(req.body);
    console.log(req.body);

    res
      .status(201)
      .json({ message: "books added successfully", success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mwssage: error.message, success: 500 });
  }
});

//////////////////////////////////////////////////////////////////

// 8 -

router.patch("/:title", async (req, res, next) => {
  try {
    const result = await updateBookByTitle(req.params.title, req.body.year);

    res.status(200).json({
      message: "book updated successfully",
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

//////////////////////////////////////////////////////////////////

// 9 -

router.get("/title", async (req, res, next) => {
  try {
    const book = await findBookByTitle(req.query.title);

    if (!book) throw new Error("book not found", { cause: 404 });
    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(error.cause || 500).json({
      message: error.message,
      success: false,
    });
  }
});

//////////////////////////////////////////////////////////////////

// 10 -

router.get("/year-range", async (req, res, next) => {
  try {
    const min = parseInt(req.query.min);
    const max = parseInt(req.query.max);

    const books = await findBooksByYear(min, max);
    if (books == []) throw new Error("no books found", { cause: 404 });
    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(error.cause || 500).json({
      message: error.message,
      success: false,
    });
  }
});

//////////////////////////////////////////////////////////////////

// 11 -

router.get("/genre", async (req, res, next) => {
  try {
    const books = await findBooksByGenres(req.query.genre);
    if (books == []) throw new Error("no books found", { cause: 404 });
    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(error.cause || 500).json({
      message: error.message,
      success: false,
    });
  }
});

//////////////////////////////////////////////////////////////////

// 12 -

router.get("/skip-limit", async (req, res, next) => {
  try {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);

    const books = await findBooksWithSkipLimit(skip, limit);
    if (books == []) throw new Error("no books found", { cause: 404 });
    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(error.cause || 500).json({
      message: error.message,
      success: false,
    });
  }
});

//////////////////////////////////////////////////////////////////

// 13 -

router.get("/year-integer", async (req, res, next) => {
  try {
    const books = await findBooksWithIntYear();
    if (books == []) throw new Error("no books found", { cause: 404 });
    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(error.cause || 500).json({
      message: error.message,
      success: false,
    });
  }
});

//////////////////////////////////////////////////////////////////

// 14 -

router.get("/exclude-genres", async (req, res, next) => {
  try {
    const genresToArray = req.query.genres.split(",").map((g) => g.trim());
    const books = await findBooksExcludeGenres(genresToArray);
    if (books == []) throw new Error("no books found", { cause: 404 });
    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(error.cause || 500).json({
      message: error.message,
      success: false,
    });
  }
});

//////////////////////////////////////////////////////////////////

// 15 -

router.delete("/before-year", async (req, res, next) => {
  try {
    const year = parseInt(req.query.year);
    const result = await deleteBooksBeforeYear(year);

    res.status(200).json({
      message: "books deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

//////////////////////////////////////////////////////////////////

// 16 -

router.get("/aggregate1", async (req, res, next) => {
  try {
    const year = parseInt(req.query.year);
    const books = await aggregateFilterSort(year);

    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

//////////////////////////////////////////////////////////////////

// 17 -

router.get("/aggregate2", async (req, res, next) => {
  try {
    const year = parseInt(req.query.year);
    const books = await aggregateFilterFields(year);

    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

//////////////////////////////////////////////////////////////////

// 18 -

router.get("/aggregate3", async (req, res, next) => {
  try {
    const books = await aggregateSeparateGenresFields();

    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

//////////////////////////////////////////////////////////////////

// 19 -

router.get("/aggregate4", async (req, res, next) => {
  try {
    const books = await aggregateJoinLogsCollection();

    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});


export default router;
