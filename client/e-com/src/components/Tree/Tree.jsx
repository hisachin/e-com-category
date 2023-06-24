import React, { useState } from 'react';

import "./Tree.css";

function TreeNode({ node }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <li>
      <div className='' onClick={handleToggle}>
        {node.subCategories.length > 0 && (
          <span>{expanded ? '-' : '+'}</span>
        )}
        {node.name}
      </div>
      {expanded && node.subCategories.length > 0 && (
        <ul>
          {node.subCategories.map(subCategory => (
            <TreeNode key={subCategory.id} node={subCategory} />
          ))}
        </ul>
      )}
    </li>
  );
}

function Tree({ data }) {
  return (
    <div>
      <ul>
        {data.map(node => (
          <TreeNode key={node.id} node={node} />
        ))}
      </ul>
    </div>
  );
}

export default Tree;
