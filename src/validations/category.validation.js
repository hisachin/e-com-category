const Joi = require('joi');
const { objectId } = require('./custom.validation');

//function to validate the requestion before creating category
const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required().messages({
      'string.base': `Category name must be a string.`,
      'string.empty': `Category name cannot be an empty.`,
      'string.min': `Category name should have a minimum length of {#limit}.`,
      'string.max': `Category name should have a maximum length of {#limit}.`,
      'any.required': `Category name is a required.`
    }),
    path: Joi.string()
  }),
};

//function to validate the request before getting the categories
const getCategories = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

//function to validate the request before getting the single category by id
const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};


//function to validate the requestion before updating the category
const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(objectId).message("CategoryId is not a valid Id."),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().min(3).max(30).required().messages({
        'string.base': `Category name must be a string.`,
        'string.empty': `Category name cannot be an empty.`,
        'string.min': `Category name should have a minimum length of {#limit}.`,
        'string.max': `Category name should have a maximum length of {#limit}.`,
        'any.required': `Category name is a required.`
      }),
      path: Joi.string()
    })
    .min(1),
};


//function to validate the requestion before deleting the category
const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId).message("CategoryId is not a valid Id."),
  }),
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
