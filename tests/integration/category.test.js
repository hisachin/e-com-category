const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const Category = require('../../src/models/category.model');
const { setupTestDB } = require('../setup');

setupTestDB();


describe('Category Routes', () => {
    describe('POST v1/categories', () => {
        let newCategory;

        beforeEach(() => {
            newCategory = {
                name: 'Men'
            }
        });

        it('should return 400 if name is missing', async () => {
            delete newCategory.name; // Missing name

            const res = await request(app)
                .post('/v1/categories')
                .send(newCategory)
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body.message).toBe('Category name is a required.');
        });

        it('should return 400 if name is empty', async () => {
            newCategory.name = ''; // Empty name

            const res = await request(app)
                .post('/v1/categories')
                .send(newCategory)
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body.message).toBe('Category name cannot be an empty.');
        });

        it('should return 400 if name is too small', async () => {
            newCategory.name = 'ca' // minimum length

            const res = await request(app)
                .post('/v1/categories')
                .send(newCategory)
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body.message).toBe('Category name should have a minimum length of 3.');
        });

        it('should return 400 if name is too long', async () => {
            newCategory.name = 'cat'.repeat(20); // Name exceeds the maximum length

            const res = await request(app)
                .post('/v1/categories')
                .send(newCategory)
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body.message).toBe('Category name should have a maximum length of 30.');
        });

        it('should return 400 if name is not a string', async () => {
            newCategory.name = 123; // Invalid name type (number)

            const res = await request(app)
                .post('/v1/categories')
                .send(newCategory)
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body.message).toBe('Category name must be a string.');
        });

        it('should return 201 and successfully create a new category', async () => {
            const res = await request(app)
                .post('/v1/categories')
                .send(newCategory)
                .expect(httpStatus.CREATED);


            expect(res.body).toEqual({
                id: expect.anything(),
                name: newCategory.name,
                path: expect.anything()
            });

            const category = await Category.findById(res.body.id);

            expect(category).toBeDefined();
            expect(category).toMatchObject({
                name: newCategory.name
            });
        });
    });

    describe('GET v1/categories', () => {
        it('should return 200', async () => {
            const res = await request(app)
                .get('/v1/categories')
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                data: expect.any(Array)
            });
        });
    });

    describe('Update v1/categories',() => {
        let newCategory;
        let createCategory;

        beforeEach(async () => {
            newCategory = {
                name: 'Men'
            }

            createCategory = await request(app)
                .post('/v1/categories')
                .send(newCategory)
                .expect(httpStatus.CREATED);
        });

        it('should return 400 if name is missing', async () => {
            delete newCategory.name; // Missing name

            const res = await request(app)
                .put(`/v1/categories/${createCategory.body.id}`)
                .send(newCategory)
                .expect(httpStatus.BAD_REQUEST);
            

            expect(res.body.message).toBe('Category name is a required.');
        });

        it('should return 400 if name is empty', async () => {
            newCategory.name = ''; // Empty name

            const res = await request(app)
                .put(`/v1/categories/${createCategory.body.id}`)
                .send(newCategory)
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body.message).toBe('Category name cannot be an empty.');
        });

        it('should return 400 if name is too small', async () => {
            newCategory.name = 'ca' // minimum length

            const res = await request(app)
                .put(`/v1/categories/${createCategory.body.id}`)
                .send(newCategory)
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body.message).toBe('Category name should have a minimum length of 3.');
        });

        it('should return 400 if name is too long', async () => {
            newCategory.name = 'cat'.repeat(20); // Name exceeds the maximum length

            const res = await request(app)
                .put(`/v1/categories/${createCategory.body.id}`)
                .send(newCategory)
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body.message).toBe('Category name should have a maximum length of 30.');
        });

        it('should return 400 if name is not a string', async () => {
            newCategory.name = 123; // Invalid name type (number)

            const res = await request(app)
                .put(`/v1/categories/${createCategory.body.id}`)
                .send(newCategory)
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body.message).toBe('Category name must be a string.');
        });

        it('should return 404 if category does not exist', async () => {
            let categoryId = "6497ce8c831ec4";  // invalid mongodb Id
            newCategory.name = "test1";

            const res = await request(app)
                .put(`/v1/categories/${categoryId}`)
                .send(newCategory)
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body.message).toBe("CategoryId is not a valid Id.");
        });

        it('should return 200 and successfully update the category', async () => {
            newCategory.name = "test1"; // updated category name

            const res = await request(app)
                .put(`/v1/categories/${createCategory.body.id}`)
                .send(newCategory)
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                id: createCategory.body.id,
                name: newCategory.name,
                path: expect.anything()
            });

            const category = await Category.findById(createCategory.body.id);

            expect(category).toBeDefined();
            expect(category).toMatchObject({
                name: newCategory.name,
                id : createCategory.body.id
            });
        });
    });

    describe('Delete v1/categories', () => {
        let newCategory;

        beforeEach(() => {
            newCategory = {
                name: 'Dummy'
            }
        });

        it('should return 404 if category does not exist', async () => {
            let categoryId = "6497ce8c831ec4000f1be01e";

            const res = await request(app)
                .delete(`/v1/categories/${categoryId}`)
                .send()
                .expect(httpStatus.NOT_FOUND);

            expect(res.body.message).toBe("CategoryId is not found.");
        });

        it('should return 404 if category does not exist', async () => {
            let categoryId = "6497ce8c831ec4";  // invalid mongodb Id

            const res = await request(app)
                .delete(`/v1/categories/${categoryId}`)
                .send()
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body.message).toBe("CategoryId is not a valid Id.");
        });

        it('should return 204 and successfully delete the category', async () => {

            const res = await request(app)
                .post('/v1/categories')
                .send(newCategory)
                .expect(httpStatus.CREATED);

            await request(app)
                .delete(`/v1/categories/${res.body.id}`)
                .send()
                .expect(httpStatus.NO_CONTENT);

            const category = await Category.findById(res.body.id);

            expect(category).toBeNull();
        });
    });
});