import assert from 'assert/strict'
import pg from 'pg'
import BookService from '../../lib/books/book-service.js'
import * as schema from '../../lib/schema.js'
import UniqueConstraintViolationError from '../../lib/unique-constraint-violation-error.js'


describe('BookService', () => {

  let pool
  let bookService;


  before(() => {
    pool = new pg.Pool({
      database: 'postgres',
      user: 'postgres',
      password: 'pw',
      port: 5432
    })

    bookService = new BookService(pool);
  })

  after(async () => {
    await pool.end()
  })

  beforeEach(async function () {
      await pool.query(schema.CREATE_TABLE_SQL);
  });

  afterEach(async function () {
    await pool.query(schema.DROP_TABLE_SQL);
  });


  it('should connect to the database', async () => {
    const res = await pool.query('SELECT 1 as one')
    assert.deepEqual([{ one: 1 }], res.rows);

  })

  it('should retrieve all books', async function () {
    const result = await bookService.getAllBooks();
    assert.deepStrictEqual(result, []);
  });

  it('should add book', async function () {
    const book = { title: 'Refactoring', author: 'Martin Fowler' };
    await bookService.addBook(book);
    const result = await bookService.getAllBooks();

    assert.strictEqual(result.length, 1);
    assert.deepStrictEqual(result[0], book);
});

it('should throw an error when unique constraint is violated', async function () {
  const book = { title: 'Refactoring', author: 'Martin Fowler' };
  await bookService.addBook(book);
  try {
      await bookService.addBook(book);
  } catch (error) {
      assert(error instanceof UniqueConstraintViolationError);
  }
});


})
