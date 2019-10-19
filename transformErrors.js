const Immutable = require('immutable');

/**
 * Transform object while keeping the nested structure
 * @param {List|Map} error object to traverse and flatten leaves
 * @returns {List|Map} transformed object
 */
const transformToNested = error =>
  error
    .map(
      obj =>
        Immutable.Map.isMap(obj)
          ? transformToNested(obj)
          : transformToFlat(obj));

/**
 * Tranform object by flattening
 * @param {List|Map} error object to flatten
 * @returns {string} concatenated errors
 */
const transformToFlat = error =>
  error
    .toSet()
    .flatten()
    .map(str => `${str}.`)
    .join(' ');

/**
 * Transform error object to concatenated form
 * @param {object} errors original object to be transformed
 * @param {string[]} keys keys for which to preserve the nested structure
 * @returns {object} transformed object
 */
const transformErrors = (errors, ...keys) =>
  errors
    .map(
      (v, k) =>
        keys.includes(k)
          ? transformToNested(v)
          : transformToFlat(v))

module.exports = transformErrors
