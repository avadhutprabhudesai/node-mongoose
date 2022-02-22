/* eslint-disable @babel/no-invalid-this */
const { setupDB } = require('../../test-setup');
const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Curruculum
 *    - constructor
      - add()
      - Types()
      - path()
      - pathType()
      - _id
      - auto coercion
      - instance methods
      - static methods
      - query helpers
 */

setupDB('test');

let User, userSchema;
beforeEach(() => {
  userSchema = new Schema({
    firstName: String,
    lastName: String,
  });
});
afterEach(() => {
  if (mongoose.modelNames().includes('user')) {
    mongoose.deleteModel('user');
  }
});
describe('Exploring Mongoose Schemas', () => {
  it('creates the Schema with constructor', async () => {
    const personSchema = new Schema({
      name: String,
      age: Number,
    });

    expect(personSchema.path('name') instanceof Schema.Types.String).toBe(true);
  });

  it('adds fields to the schema with add() method', async () => {
    userSchema.add({
      age: Number,
    });

    userSchema.add({
      city: String,
    });
    expect(userSchema.pathType('city')).toBe('real');
  });

  it('returns the SchemaType with unary path() funtion', () => {
    expect(
      userSchema.path('firstName') instanceof Schema.Types.String
    ).toBeTruthy();
  });
  it('sets the SchemaType with binary path() function', () => {
    userSchema.add({ city: Number });
    expect(userSchema.path('city') instanceof Schema.Types.Number).toBeTruthy();

    userSchema.path('city', String);
    expect(userSchema.path('city') instanceof Schema.Types.String).toBeTruthy();
  });

  it('returns the SchemaType (real | nested | virtual | adhocOrUndefined) with pathType funtion', () => {
    userSchema.virtual('name').get(function () {
      return `${this.firstName} ${this.lastName}`;
    });
    expect(userSchema.pathType('firstName')).toBe('real');
    expect(userSchema.pathType('name')).toBe('virtual');
    expect(userSchema.pathType('nonexistent')).toBe('adhocOrUndefined');
  });
  it('adds an _id of Types ObjectId', () => {
    expect(userSchema.path('_id') instanceof Schema.Types.ObjectId).toEqual(
      true
    );
  });
  it('performs JS coercion on the values passed on through Model', () => {
    userSchema.add({
      age: Number,
    });
    User = mongoose.model('user', userSchema);
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      age: '30', //Notice a string value is being passed to a Number field
    });
    expect(typeof user.age).toBe('number');
  });
  it('adds an instance method to the Model via methods prop', () => {
    userSchema.methods.fullName = function () {
      return `${this.firstName} ${this.lastName}`;
    };
    User = mongoose.model('user', userSchema);
    const u = new User({
      firstName: 'John',
      lastName: 'Doe',
    });
    expect(u.fullName()).toBe('John Doe');
  });
});
