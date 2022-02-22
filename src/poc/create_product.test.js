const Product = require('../models/product');
const { setupDB } = require('../../test-setup');

// Setup a Test Database
setupDB('product_test');

/**
 * Create
 *  - save()
 *  - create()
 *  - insertMany()
 */

describe('Creating records', () => {
  it('creates one record with save()', async () => {
    const p = new Product({
      name: 'The Alchemist',
      price: 12.99,
      tags: ['inspiration', 'fiction', 'bestseller', 'novel'],
      info: {
        publication: 'Rafter',
        edition: 2,
      },
      authors: [
        {
          name: 'John Doe',
        },
        {
          name: 'John Smith',
        },
        {
          name: 'Peter Dunken',
        },
      ],
    });

    const book = await p.save();

    expect(book.price).toBe(12.99);
  });

  it('creates multiple records with create()', async () => {
    const books = await Product.create([
      {
        name: 'The Alchemist',
        price: 12.99,
        tags: ['inspiration', 'fiction', 'bestseller', 'novel'],
        info: {
          publication: 'Rafter',
          edition: 2,
        },
        authors: [
          {
            name: 'John Doe',
          },
          {
            name: 'John Smith',
          },
          {
            name: 'Peter Dunken',
          },
        ],
      },
      {
        name: 'Digital Fortress',
        price: 111.99,
        tags: ['suspense', 'crime'],
        info: {
          publication: 'Willey',
          edition: 3,
        },
        authors: [
          {
            name: 'Bob Jones',
          },
          {
            name: 'Dicky Moe',
          },
          {
            name: 'Vasco Gama',
          },
        ],
      },
    ]);
    expect(books.length).toBe(2);
    expect(books[0].price).toBe(12.99);
    expect(books[1].info.edition).toBe(3);
  });

  it('creates multiple records with insertMany()', async () => {
    const books = await Product.insertMany([
      {
        name: 'Bloodline',
        price: 45,
        tags: ['suspense', 'thriller', 'megaseller'],
        info: {
          publication: 'Mary',
          edition: 6,
        },
        authors: [
          {
            name: 'Sydney Sheldon',
          },
          {
            name: 'Jane Doe',
          },
          {
            name: 'Charles Dicken',
          },
        ],
      },
      {
        name: 'Code',
        price: 20,
        tags: ['science fiction', 'love'],
        info: {
          publication: 'Marley',
          edition: 10,
        },
        authors: [
          {
            name: 'Jack Marsh',
          },
          {
            name: 'Adam Gilchrist',
          },
          {
            name: 'Goliath',
          },
        ],
      },
    ]);
    expect(books.length).toBe(2);
    expect(books[0].price).toBe(45);
    expect(books[1].info.edition).toBe(10);
  });
});
