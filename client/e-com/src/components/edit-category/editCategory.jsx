import { useState } from "react";
import axios from "axios";

function EditCategory({categoryData,setShowEdit}) {
    const [category, setCategory] = useState(categoryData);


    /**
     * update category name from input field
     * @param {string} newCategoryName 
     */
    const handleCategoryNameChange = (newCategoryName) => {
        setCategory({ ...category, name: newCategoryName });
    }

    /**
     * handle the submit form
     * @returns null
     */
    const handleEdit = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/v1/categories/${category.id}`, { name: category.name });
            alert("Category has been updated successfully.");
            setShowEdit(false);
            setCategory(null);
        } catch (e) {
            if (e.response) {
                alert(`${e.response.data.message}`);
                return;
            }

        }
    }
    return (
        <div>
            <h4>Edit Category</h4>
            <input id="name" placeholder="Edit Category Name" value={category.name} onChange={(e) => handleCategoryNameChange(e.target.value)} />
            <br></br>
            <button type="button" onClick={handleEdit}>Submit</button>
        </div>
    )
}

export default EditCategory