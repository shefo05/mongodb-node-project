import { db } from "../../DB/connection.js";

export const createCollectionExplicit = async () => {
  await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            description: "Title must be a string and is required",
            minLength: 1,
          },
        },
      },
    },
    validationLevel: "strict",
    validationAction: "error",
  });
};

export const createTitleIndex = async () => {
  return await db.collection("books").createIndex({ title: 1 });
};

export const addBookDocument = async (bookData) => {
  return await db.collection("books").insertOne(bookData);
};

export const addMultipleBooks = async (booksData) => {
  return await db.collection("books").insertMany(booksData);
};

export const updateBookByTitle = async (title, updatedYear) => {
  return await db
    .collection("books")
    .updateOne({ title }, { $set: { year: updatedYear } });
};

export const findBookByTitle = async (title) => {
  return await db.collection("books").findOne({ title });
};

export const findBooksByYear = async (min, max) => {
  return await db
    .collection("books")
    .find({
      year: {
        $gte: min,
        $lte: max,
      },
    })
    .toArray();
};

export const findBooksByGenres = async (genre) => {
  return await db
    .collection("books")
    .find({
      genres: genre,
    })
    .toArray();
};

export const findBooksWithSkipLimit = async (skip, limit) => {
  return await db
    .collection("books")
    .find({})
    .skip(skip)
    .limit(limit)
    .sort({ year: -1 })
    .toArray();
};

export const findBooksWithIntYear = async () => {
  return await db
    .collection("books")
    .find({
      year: { $type: "int" },
    })
    .toArray();
};

export const findBooksExcludeGenres = async (genres) => {
  return await db
    .collection("books")
    .find({
      genres: { $nin: genres },
    })
    .toArray();
};

export const deleteBooksBeforeYear = async (year) => {
  return await db.collection("books").deleteMany({
    year: { $lt: year },
  });
};

export const aggregateFilterSort = async (year) => {
  return await db
    .collection("books")
    .aggregate([{ $match: { year: { $gt: year } } }, { $sort: { year: -1 } }])
    .toArray();
};

export const aggregateFilterFields = async (year) => {
  return await db
    .collection("books")
    .aggregate([
      { $match: { year: { $gt: year } } },
      { $project: { _id: 0, title: 1, author: 1, year: 1 } },
    ])
    .toArray();
};

export const aggregateSeparateGenresFields = async (year) => {
  return await db
    .collection("books")
    .aggregate([
      { $unwind: "$genres" },
      { $project: { _id: 0, title: 1, author: 1, year: 1, genre: "$genres" } },
    ])
    .toArray();
};

export const aggregateJoinLogsCollection = async (year) => {
  return await db
    .collection("books")
    .aggregate([
      {
        $lookup: {
          from: "logs",
          localField: "_id",
          foreignField: "book_id",
          as: "logs",
        },
      },
    ])
    .toArray();
};