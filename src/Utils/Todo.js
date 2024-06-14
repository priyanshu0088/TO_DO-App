import React, { useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import TasksOptions from "./TasksOptions";
import { FaCheck } from "react-icons/fa6";

const Todo = ({
  i,                          // Index of the task in the list
  val,                        // Task object containing title, description, etc.
  data,                       // Array of all tasks
  setData,                    // Function to update the tasks data
  setEdit,                    // Function to set the task to be edited
  setDeleteNotificationTitle, // Function to set the title for delete notification
  setDeleteNotification,      // Function to control delete notification visibility
  setTaskDetails,             // Function to set task details for viewing
}) => {
  const [openOptions, setOpenOptions] = useState(false); // State to manage options menu visibility
  const menuRef = useRef(); // Ref to detect clicks outside options menu

  useEffect(() => {
    // Function to handle click outside options menu
    let handleClickOutside = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenOptions(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between gap-4 max-w-full items-center text-white bg-purple-800 rounded-2xl px-6 py-5 max-sm:py-4 max-sm:px-4">
      {val.check && (
        <div className="bg-purple-500 p-4 max-sm:p-2 rounded-xl">
          <FaCheck className="text-4xl" />
        </div>
      )}

      <div className="w-full">
        <div
          className={`flex justify-between gap-10 items-center ${
            val.description ? "mb-3 max-sm:mb-1" : "mb-0"
          }`}
        >
          <h2 className={`${val.check ? "line-through" : null} font-bold text-lg displayInput max-sm:text-sm`}>
            {val.title}
          </h2>
          <p className={`${val.check ? "line-through" : null} min-w-[110px] max-sm:text-xs font-light text-gray-200`}>
            {val.currentTime}
          </p>
        </div>
        <p className={`${val.check ? "line-through" : null} text-base max-sm:text-sm ${!val.description && "hidden"}`}>
          {val.description}
        </p>

        <div className={`flex gap-2 items-center flex-wrap ${!val.catagory.length && "hidden"}`}>
          {val.catagory.map((c, index) => (
            <h4
              className="bg-purple-600 rounded-2xl text-sm max-sm:text-xs px-3 flex items-center font-medium gap-1 py-1 max-sm:py-0"
              key={index}
            >
              <span className="text-xl max-sm:text-lg">{c.emoji}</span> {c.catagory}
            </h4>
          ))}
        </div>
      </div>

      <div ref={menuRef} className="relative">
        <SlOptionsVertical
          onClick={() => setOpenOptions(!openOptions)}
          className="text-lg cursor-pointer"
        />

        {/* Render TasksOptions component if openOptions is true */}
        <div className={`${openOptions ? "animationActive" : "animationInactive"}`}>
          {openOptions && (
            <TasksOptions
              index={i}
              val={val}
              data={data}
              setData={setData}
              setEdit={setEdit}
              setDeleteNotificationTitle={setDeleteNotificationTitle}
              setDeleteNotification={setDeleteNotification}
              setTaskDetails={setTaskDetails}
              setOpenOptions={setOpenOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
