import { useEffect, useState } from "react";
import axios from "axios";
import Tree from "./components/Tree/Tree";

import "./App.css";

function App() {
  const [category,setCategory] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try{
        const response = await axios.get('http://localhost:3001/v1/categories');
        setCategory(response.data.data);
      }catch(e){
        console.error(e);
      }
    };

    getCategories();
  },[]);
  return (
    <div className="e-com-app">
      <h1>Categories</h1>
      {category.length && 
        <Tree data={category}/>
      }
      {!category.length && 
        <p>No category found</p>
      }
    </div>
  );
}

export default App;
