import React, { useContext } from "react";
import { BiTask } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete, MdContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import DataContext from "../context/DataContext";

const TasksOptions = ({
  data,
  setData,
  val,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setOpenOptions,
  index
}) => {
  
  const { setIndex } = useContext(DataContext);

  // Handler to delete a task
  const handleDelete = (task) => {
    const updatedData = data.filter((item) => item.id !== task.id);
    setData(updatedData);
    localStorage.setItem("todoItems", JSON.stringify(updatedData));

    setDeleteNotificationTitle(task.title);
    setDeleteNotification(true);
    setOpenOptions(false);

    setTimeout(() => {
      setDeleteNotification(false);
      setDeleteNotificationTitle("");
    }, 4000);
  };

  // Handler to toggle the completion status of a task
  const handleCheck = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, check: !item.check } : item
    );
    setData(updatedData);
    setOpenOptions(false);
    localStorage.setItem("todoItems", JSON.stringify(updatedData));
  };

  // Handler to copy a task
  const handleCopy = (task) => {
    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    let hours = now.getHours();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = (hours % 12 || 12).toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const copyObj = {
      id: uuidv4(),
      title: task.title,
      description: task.description,
      check: false,
      currentTime: `${date}/${month}/${year} ,${hours}:${minutes} ${amOrPm}`,
      catagory: task.catagory,
    };

    setData([...data, copyObj]);
    setOpenOptions(false);
    localStorage.setItem("todoItems", JSON.stringify([...data, copyObj]));
  };

  return (
    <div className="absolute z-10 w-[215px] shadow bg-white top-8 left-0 max-xl:-left-48 p-3 rounded-2xl">
      <ul className="flex flex-col text-black">
        <li
          onClick={() => handleCheck(val.id)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 max-sm:py-2 px-2 rounded-md"
        >
          <FaCheck className="text-2xl max-sm:text-xl text-slate-700" />
          {val.check ? "Mark as not done" : "Mark as done"}
        </li>
        <li
          onClick={() => {
            setIndex(index);
            setEdit({
              id: val.id,
              title: val.title,
              description: val.description,
              check: val.check,
              currentTime: val.currentTime,
              catagory: val.catagory,
            });
          }}
        >
          <Link
            to="/edit"
            className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
          >
            <RiEdit2Fill className="text-2xl max-sm:text-xl text-slate-700" />
            Edit
          </Link>
        </li>
        <li
          onClick={() => handleCopy(val)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
        >
          <MdContentCopy className="text-2xl max-sm:text-xl text-slate-700" />
          Copy
        </li>
        <li
          onClick={() => handleDelete(val)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
        >
          <MdDelete className="text-2xl max-sm:text-xl text-slate-700" />
          Delete
        </li>
        <li>
          <Link
            to={`/todo/${val.id}`}
            className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
          >
            <BiTask className="text-2xl max-sm:text-xl text-slate-700" />
            Task details
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TasksOptions;
