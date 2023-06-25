import React, { useState } from 'react';

import "./Tree.css";

function TreeNode({ node,onEdit,onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleCategoryDelete = (event, categoryId) => {
    event.stopPropagation();
    onDelete(categoryId);
  }

  const handleCategoryEdit = (event, category) => {
    event.stopPropagation();
    onEdit(category);
  }

  return (
    <li>
      <div className='flex' onClick={handleToggle}>
        {node.subCategories.length > 0 && (
          <div><span>{expanded ? '-' : '+'}</span></div>
        )}
        <div className='flex tree-name'>
          {node.name}
          <span className='icon delete-icon' title='delete' onClick={(e) => handleCategoryDelete(e, node.id)}>&#10006;</span>
          <span className='icon edit-icon' title='edit' onClick={(e) => handleCategoryEdit(e, node)}>&#9998;</span>
        </div>
      </div>
      {expanded && node.subCategories.length > 0 && (
        <ul>
          {node.subCategories.map(subCategory => (
            <TreeNode key={subCategory.id} node={subCategory} onEdit={onEdit}  onDelete={onDelete} />
          ))}
        </ul>
      )}
    </li>
  );
}

function Tree({ data,onEdit,onDelete }) {
  return (
    <div className='tree-container'>
      <ul>
        {data.map(node => (
          <TreeNode key={node.id} node={node} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

export default Tree;
