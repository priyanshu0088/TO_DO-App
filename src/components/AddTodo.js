import React, { useContext } from "react";
import TopNav from "../Utils/TopNav";
import FormInputs from "../Utils/FormInputs";
import DataContext from "../context/DataContext";

const AddTodo = () => {
  // Accessing context to manage state
  const { data, setData, setAddNotification, setAddNotificationTitle } = useContext(DataContext);

  return (
    <div className="w-full relative min-h-screen bg-purple-600">
      <div className="max-w-[1300px] px-10 max-md:px-5 m-auto">
        {/* Top navigation component */}
        <TopNav title={"Add New Todo"} />
        
        {/* Form for adding new todo items */}
        <FormInputs
          data={data}
          setData={setData}
          setAddNotification={setAddNotification}
          setAddNotificationTitle={setAddNotificationTitle}
        />
      </div>
    </div>
  );
};

export default AddTodo;
