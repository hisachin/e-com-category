const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody) => {
  return Category.create(categoryBody);
};

/**
 * Query for categories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async () => {
  const categories = await Category.find();
  return categories;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    return null;
  }

  const subCategories = await Category.find({ path: { $regex: `^${category.path}\.` } });
  return [category, ...subCategories];
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (categoryId, updateBody) => {
  return await Category.findByIdAndUpdate(categoryId, { $set: updateBody }, { new: true });
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    return;
  }

  const subCategories = await Category.find({ path: { $regex: `^${category.path}\.` } });
  
  if (subCategories && subCategories.length) {
    throw new ApiError(httpStatus.FORBIDDEN,'CategoryID can not be deleted');
  }

  return await Category.deleteOne({ _id: categoryId });
};

module.exports = {
  createCategory,
  queryCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
