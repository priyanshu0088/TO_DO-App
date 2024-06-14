import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircle, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CatagoryBtn from "./CatagoryBtn";
import { v4 as uuidv4 } from "uuid";
import { catagory } from "../constants/Data";

// FormInputs component for handling task creation
const FormInputs = ({
  data, // Array of existing tasks
  setData, // Function to update the tasks data
  setAddNotification, // Function to set add notification state
  setAddNotificationTitle // Function to set add notification title
}) => {
  // State variables for managing form inputs and errors
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [emptyInputError, setEmptyInputError] = useState(false);
  const [nameCountError, setNameCountError] = useState("");
  const [descriptionCountError, setDescriptionCountError] = useState("");
  const [CategoryOpen, setCategoryOpen] = useState(false);
  const [selectedCatagory, setSelectedCatagory] = useState([]);
  const [maxSelectedError, setMaxSelectedError] = useState(false);

  const navigate = useNavigate(); // Navigation hook

  // Prevent form submission on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Handle task name input change
  const handleName = (e) => {
    let title = e.target.value;
    setTaskName(title);

    if (title.length > 35) {
      setNameCountError("Name should be less than or equal to 30 characters");
    } else {
      setNameCountError("");
    }
  };

  // Handle task description input change
  const handleDescription = (e) => {
    let description = e.target.value;
    setTaskDescription(description);

    if (description.length > 250) {
      setDescriptionCountError("Description should be less than or equal to 200 characters");
    } else {
      setDescriptionCountError("");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    let hours = now.getHours();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = (hours % 12 || 12).toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${date}/${month}/${year} ,${hours}:${minutes} ${amOrPm}`;

    const id = uuidv4();
    const title = taskName;
    const description = taskDescription;
    const check = false;

    // Check for empty task name input
    if (taskName === "") {
      setEmptyInputError(true);
      setTimeout(() => {
        setEmptyInputError(false);
      }, 4000);
    } else {
      const newTask = {
        id,
        title,
        description,
        currentTime,
        check,
        catagory: selectedCatagory,
      };

      // Save new task to localStorage and update state
      localStorage.setItem("todoItems", JSON.stringify([...data, newTask]));
      setData([...data, newTask]);
      setTaskName("");
      setTaskDescription("");
      setEmptyInputError(false);
      navigate("/");

      // Show add notification
      setAddNotificationTitle(taskName);
      setAddNotification(true);
      setTimeout(() => {
        setAddNotification(false);
        setAddNotificationTitle("");
      }, 4000);
    }
  };

  // Handle category selection
  const handleSelected = (catagoryObj) => {
    const isCategorySelected = selectedCatagory.some(
      (val) => val.id === catagoryObj.id
    );

    if (isCategorySelected) {
      const updatedCatagories = selectedCatagory.filter(
        (val) => val.id !== catagoryObj.id
      );
      setSelectedCatagory(updatedCatagories);
    } else {
      if (selectedCatagory.length < 3) {
        setMaxSelectedError(false);
        setSelectedCatagory([...selectedCatagory, catagoryObj]);
      } else {
        setMaxSelectedError(true);
        setTimeout(() => {
          setMaxSelectedError(false);
        }, 4000);
      }
    }
  };

  const catagoryRef = useRef();

  // Close category dropdown when clicking outside of it
  useEffect(() => {
    const handleCatagoryTouch = (e) => {
      if (!catagoryRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleCatagoryTouch);

    return () => document.removeEventListener("mousedown", handleCatagoryTouch);
  }, []);

  return (
    <div className="py-10">
      <form onSubmit={handleSubmit} className="max-w-[600px] m-auto">
        <div>
          <label
            className={`text-sm max-sm:text-xs ${
              nameCountError ? "text-red-500" : "text-purple-200"
            }`}
            htmlFor="taskName"
          >
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            placeholder="Enter task name"
            value={taskName}
            onChange={handleName}
            onKeyDown={handleKeyDown}
            className={`w-full h-14 max-sm:h-12 ${
              nameCountError ? "border-red-500 border-2" : "border-none"
            } rounded-xl p-4 text-base max-sm:placeholder:text-sm mt-1 outline-none`}
          />
          <p className="text-red-500 text-base max-sm:text-xs mt-1">
            {nameCountError}
          </p>
        </div>
        <div className="mt-7 max-sm:mt-4">
          <label
            className={`text-sm max-sm:text-xs ${
              descriptionCountError ? "text-red-500" : "text-purple-200"
            }`}
            htmlFor="taskDescription"
          >
            Task Description
          </label>
          <textarea
            id="taskDescription"
            placeholder="Enter task description"
            value={taskDescription}
            onChange={handleDescription}
            className={`resize-none ${
              descriptionCountError ? "border-red-500 border-2" : "border-none"
            } w-full rounded-xl p-4 max-sm:p-3 mt-1 text-base max-sm:placeholder:text-sm h-48 max-sm:h-36 outline-none`}
          ></textarea>
          <p className="text-red-500 text-base max-sm:text-xs">
            {descriptionCountError}
          </p>
        </div>

        <div ref={catagoryRef} className="mt-7 max-sm:mt-4">
          <label className="text-sm max-sm:text-xs text-purple-200">
            Category
          </label>

          <div
            onClick={() => setCategoryOpen(!CategoryOpen)}
            className="bg-white flex gap-7 cursor-pointer justify-between min-h-14 max-sm:min-h-12 px-3 py-3 max-sm:px-2 max-sm:py-2 items-center max-sm:text-xs rounded-xl w-full mt-1"
          >
            <div className="flex gap-2 flex-wrap items-center">
              {selectedCatagory.map((val, index) => (
                <div
                  key={index}
                  className="bg-purple-500 text-white text-sm max-sm:text-xs flex items-center gap-1 px-3 py-2 max-sm:py-2 font-medium rounded-lg"
                >
                  <span className="text-xl max-sm:text-sm">{val.emoji}</span>
                  {val.catagory}
                </div>
              ))}
            </div>

            <div className="ms-auto">
              {CategoryOpen ? (
                <IoIosArrowUp className="text-2xl max-sm:text-xl" />
              ) : (
                <IoIosArrowDown className="text-2xl max-sm:text-xl" />
              )}
            </div>
          </div>
          {CategoryOpen && (
            <div className="mt-3">
              <ul className="p-2 bg-purple-400 flex flex-col gap-2 max-sm:gap-1 rounded-xl">
                <li className="my-2 px-3 text-white max-sm:text-sm">
                  Select max (3 Categories)
                </li>
                {catagory.map((val, index) => (
                  <CatagoryBtn
                    key={index}
                    val={val}
                    selectedCatagory={selectedCatagory}
                    handleSelected={handleSelected}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <button
            disabled={nameCountError || descriptionCountError}
            type="submit"
            className={`${
              nameCountError || descriptionCountError
                ? "bg-purple-700 cursor-not-allowed text-purple-400"
                : "hover:bg-purple-800 text-white"
            } transition text-xl font-bold bg-purple-400 p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full`}
          >
            Create Task
          </button>
        </div>
      </form>

      {emptyInputError && (
        <div className="max-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[5px] flex items-center gap-2 border-red-600 fixed bottom-8 left-[50%] -translate-x-[50%]">
          <IoIosCloseCircle className="text-2xl max-sm:text-xl text-red-500" />
          <h2 className="max-md:text-xs text-sm text-slate-600 font-semibold">
            Please enter a task name
          </h2>
        </div>
      )}

      {maxSelectedError && (
        <div className="max-sm:w-[320px] px-3 py-2 max-sm:px-2 max-sm:py-1 rounded-md bg-white border-l-[5px] flex items-center gap-2 border-red-600 fixed bottom-8 left-[50%] -translate-x-[50%]">
          <IoIosCloseCircle className="text-3xl max-sm:text-2xl text-red-500" />
          <h2 className="max-md:text-xs text-sm text-slate-600 font-semibold">
            You cannot add more than 3 catagories
          </h2>
        </div>
      )}
    </div>
  );
};

export default FormInputs;
