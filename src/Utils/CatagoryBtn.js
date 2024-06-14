import React, { useEffect, useState } from "react";

// CatagoryBtn component for rendering category buttons
const CatagoryBtn = ({ val, selectedCatagory, handleSelected }) => {
  // State to track if this category button is active (selected)
  const [activeCatagory, setActiveCatagory] = useState(false);

  // useEffect hook to check if the category is selected and update the active state
  useEffect(() => {
    const isSelected = selectedCatagory.some((v) => (
      v.catagory === val.catagory
    ));
    setActiveCatagory(isSelected); // Set active state based on selection
  }, [selectedCatagory, val.catagory]);

  return (
    <li
      onClick={(e) => {
        // Handle category selection when the list item is clicked
        handleSelected({
          id: val.id,
          catagory: val.catagory,
          emoji: val.emoji,
        });
      }}
      // Apply different styles based on whether the category is active
      className={`text-base max-sm:text-sm cursor-pointer flex items-center gap-2 font-medium text-white rounded-lg px-4 py-2 max-sm:py-1 ${
        activeCatagory 
          ? "bg-purple-600 border-purple-300 border-2"
          : "bg-purple-400"
      } `}
    >
      {/* Display the emoji and category name */}
      <span className="text-2xl max-sm:text-lg">{val.emoji}</span>
      {val.catagory}
    </li>
  );
};

export default CatagoryBtn;
