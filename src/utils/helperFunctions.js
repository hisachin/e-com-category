/**
 * Create a tree using the provided data
 * @param {Array} data
 * @param {String} parentId
 * @returns {Tree}
 */
const buildTreeHierarchy = (data, parentId) => {
    const filteredData = data.filter(category => {
        if (parentId === null) {
            return !category.path.includes('.');
        } else {
            return category.path.startsWith(parentId.toString());
        }
    });

    const dataTreeHierarchy = filteredData.map(category => {
        const subCategories = buildTreeHierarchy(data, category.path + '.');
        return {
            id: category._id.toString(),
            name: category.name,
            subCategories
        };
    });

    return dataTreeHierarchy;
};

module.exports = {
    buildTreeHierarchy
}