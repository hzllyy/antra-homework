import items from './data.jsx';
import { useState, useEffect } from 'react';
import './App.css';

export default function DoubleSelect() {
  
  const categories = [...new Set(items.map((item) => item.category))];

  const [selectedCategory, setSelectedCategory] = useState("fruit");
  const [selectedItem, setSelectedItem] = useState("apple");

  const filteredItems = items.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    setSelectedItem(filteredItems[0]?.name || "");
  }, [selectedCategory]);

  return (
    <>
     <h1 className="item__header">{selectedItem}</h1>
     <form>
      <label htmlFor="select__category">category: </label>
      <select 
        id="select__category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => 
          <option value={category} key={category}>{category}</option>
        )}
      </select>

      <label htmlFor="category__item">item: </label>
      <select 
        id="category__item"
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
      >
        {filteredItems.map((item) => (
          <option key={item.name}>{item.name}</option>
        ))}
      </select>

     </form>
    </>
  )
}