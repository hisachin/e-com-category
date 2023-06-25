import { useState } from "react";
import axios from "axios";

function AddCategory({setShowAddCategory}) {
    const [category, setCategory] = useState({
        name:''
    });

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
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/v1/categories`, category);
            alert("Category has been created successfully.");
            setShowAddCategory(false);
        } catch (e) {
            if (e.response) {
                alert(`${e.response.data.message}`);
                return;
            }

        }
    }
    return (
        <div>
            <h4>Add Category</h4>
            <input id="name" placeholder="Category Name" value={category.name} onChange={(e) => handleCategoryNameChange(e.target.value)} />
            <br></br>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddCategory;