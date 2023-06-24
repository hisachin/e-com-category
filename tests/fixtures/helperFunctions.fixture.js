const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const categoryData = [
    {
        _id: new ObjectId("6495be601645f11ad6b9fffb"),
        name: 'Men',
        path: '6495be601645f11ad6b9fffb',
    },
    {
        _id: new ObjectId("6495be871645f11ad6b9ffff"),
        name: 'women',
        path: '6495be871645f11ad6b9ffff',
    },
    {
        _id: new ObjectId("6495df0019ba88f85e1b6311"),
        name: 'Clothing',
        path: '6495be871645f11ad6b9ffff.6495df0019ba88f85e1b6311'
    },
    {
        _id: new ObjectId("6495df1a19ba88f85e1b6314"),
        name: 'T-Shirts',
        path: '6495be871645f11ad6b9ffff.6495df1a19ba88f85e1b6314'
    },
    {
        _id: new ObjectId("6495e20a753e51d72aef2466"),
        name: 'Footwear',
        path: '6495be601645f11ad6b9fffb.6495e20a753e51d72aef2466'
    },
    {
        _id: new ObjectId("6495e377a3b24155d862c078"),
        name: 'Branded',
        path: '6495be601645f11ad6b9fffb.6495e20a753e51d72aef2466.6495e377a3b24155d862c078'
    }
];

const expectedCategoryOutput = [
    {
        "id": "6495be601645f11ad6b9fffb",
        "name": "Men",
        "subCategories": [
            {
                "id": "6495e20a753e51d72aef2466",
                "name": "Footwear",
                "subCategories": [
                    {
                        "id": "6495e377a3b24155d862c078",
                        "name": "Branded",
                        "subCategories": []
                    }
                ]
            }
        ]
    },
    {
        "id": "6495be871645f11ad6b9ffff",
        "name": "women",
        "subCategories": [
            {
                "id": "6495df0019ba88f85e1b6311",
                "name": "Clothing",
                "subCategories": []
            },
            {
                "id": "6495df1a19ba88f85e1b6314",
                "name": "T-Shirts",
                "subCategories": []
            }
        ]
    }
];

module.exports = {
    categoryData,
    expectedCategoryOutput
}