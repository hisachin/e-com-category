const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        path: {
            type: String,
            trim: true,
            unique: true
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);


categorySchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('path')) {
        if (!this.path) {
            this.path = this._id.toString();
        } else {
            this.path = `${this.path}.${this._id.toString()}`;
        }
    }
    next();
});

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
