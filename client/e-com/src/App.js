import { useEffect, useState } from "react";
import axios from "axios";
import Tree from "./components/tree/Tree";
import AddCategory from "./components/add-category/addCategory";
import EditCategory from "./components/edit-category/editCategory";

import "./App.css";

function App() {
  const [categories,setCategories] = useState([]);
  const [showAddCategory,setShowAddCategory] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
  const [category , setCategory] = useState(null);

  /**
   * Get All Categories
   */
  const getCategories = async () => {
    try{
      const response = await axios.get('http://localhost:3001/v1/categories');
      setCategories(response.data.data);
    }catch(e){
      console.error(e);
    }
  };

  useEffect(() => {
    getCategories();
  },[categories,category]);


  /**
   *  handle the category delete operation
   * @param {string} categoryId 
   * @returns null
   */
  const handleCategoryDeleteOperation = async (categoryId) => {
    try{
      const response = await axios.delete(`http://localhost:3001/v1/categories/${categoryId}`);
      alert("Category has been deleted successfully.");
      getCategories();
    }catch(e){
      if(e.response){
        alert(`${e.response.data.message}`);
        return;
      }

      alert("An Error occured.");
      
    }
  }

  /**
   * handle add category operation
   */
  const handleAddCategoryOperation = () => {
    setShowAddCategory(true);
    setShowEdit(false);
  }

  /**
   * handle edit category operation
   * @param {object} category 
   */
  const handleCategoryEditOperation = async (category) => {
    setShowEdit(true);  
    setShowAddCategory(false);
    setCategory(category);
  }

  return (
    <div className="e-com-app flex">
      <div className="show-category">
        <h1>Categories</h1>
        <button className="add-category-btn" onClick={handleAddCategoryOperation}>Add New Category</button>
        {categories.length && 
          <Tree data={categories} onEdit={handleCategoryEditOperation} onDelete={handleCategoryDeleteOperation}/>
        }
        {!categories.length && 
          <p>No category found</p>
        }
      </div>
      <div className="edit-category">
        {showEdit && 
          <EditCategory categoryData={category} setShowEdit={setShowEdit} />
        }
      </div>
      <div className="add-category">
        {showAddCategory && 
          <AddCategory setShowAddCategory={setShowAddCategory} />
        }
      </div>
    </div>
  );
}

export default App;
