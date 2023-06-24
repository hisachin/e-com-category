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

    describe('Delete v1/categories', () => {
        let newCategory;

        beforeEach(() => {
            newCategory = {
                name: 'Dummy'
            }
        });

        it('should return 204', async () => {

            const res = await request(app)
                .post('/v1/categories')
                .send(newCategory)
                .expect(httpStatus.CREATED);

            await request(app)
                .delete(`/v1/categories/${res.body.id}`)
                .send()
                .expect(httpStatus.NO_CONTENT)
        });
    });
});