import NotImplementedError from '../not-implemented-error.js'
import UniqueConstraintViolationError from '../unique-constraint-violation-error.js'

export default class BookService {
  static UNIQUE_VIOLATION_ERROR_CODE = 23505
  #pool = null

  constructor(pool) {
    this.#pool = pool
  }

  async getAllBooks() {
    const result = await this.#pool.query('SELECT title, author FROM books');
    return result.rows;
  }

  async addBook(book) {
    try {
      await this.#pool.query('INSERT INTO BOOKS (title, author) VALUES ($1, $2)', [book.title, book.author]);
    } catch (error) {
      
      if (error.code == BookService.UNIQUE_VIOLATION_ERROR_CODE) {
        console.log("Raja - Error Code: " + error.code);
        throw new UniqueConstraintViolationError(error.detail);
      } else {
        throw error;
      }
    }
  }

  async getBookByTitle() {
    throw new NotImplementedError()
  }
}
