const { buildTreeHierarchy } = require("../../src/utils/helperFunctions");
const { categoryData, expectedCategoryOutput } = require("../fixtures/helperFunctions.fixture");

describe('buildTreeHierarchy test', () => {
    it('should return the correct tree hierarchy', () => {
        // Call the function
        const result = buildTreeHierarchy(categoryData, null);

        // Assert the result
        expect(result).toEqual(expectedCategoryOutput);
    });
});