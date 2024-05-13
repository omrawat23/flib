// Sidebar.tsx
import React from 'react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
}

interface SidebarProps {
  categories: Category[];
}

const Sidebar: React.FC<SidebarProps> = ({ categories }) => {
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Link href={`/products/${category.id}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
