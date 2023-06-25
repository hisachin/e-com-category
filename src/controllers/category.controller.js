const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { buildTreeHierarchy } = require('../utils/helperFunctions');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.queryCategories();
  const categoryTreeData = buildTreeHierarchy(categories,null);
  res.send({
    data: categoryTreeData
  });
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  res.send(await buildTreeHierarchy(category, null));
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req.params.categoryId, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  let result = await categoryService.deleteCategoryById(req.params.categoryId);
  if(!result){
    return res.status(httpStatus.NOT_FOUND).send({"message" : "CategoryId is not found."});
  }
  return res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
