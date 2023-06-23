const Joi = require('joi');
const { objectId } = require('./custom.validation');

//function to validate the requestion before creating category
const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
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
    categoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      path: Joi.string()
    })
    .min(1),
};


//function to validate the requestion before deleting the category
const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
