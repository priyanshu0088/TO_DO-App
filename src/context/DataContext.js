import { createContext, useEffect, useState } from "react";

// Create a context for data sharing
const DataContext = createContext();

// Create a provider component to wrap around the app and provide context values
export const DataProvider = ({ children }) => {
  // State for managing edit mode
  const [edit, setEdit] = useState({});
  
  // States for managing notification titles
  const [addNotificationTitle, setAddNotificationTitle] = useState("");
  const [editNotificationTitle, setEditNotificationTitle] = useState("");
  const [deleteNotificationTitle, setDeleteNotificationTitle] = useState("");

  // States for managing notification visibility
  const [addNotification, setAddNotification] = useState(false);
  const [editNotification, setEditNotification] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState(false);

  // State for managing the list of todo items
  const [data, setData] = useState([]);

  // State for managing the index of the item being edited
  const [index, setIndex] = useState(null);

  // useEffect hook to load todo items from localStorage on component mount
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("todoItems"));
    setData(items || []); // Set data state with items from localStorage or an empty array if none found
  }, []);

  return (
    // Provide the context values to children components
    <DataContext.Provider value={{
      data,
      setData,
      edit,
      setEdit,
      addNotificationTitle,
      editNotificationTitle,
      deleteNotificationTitle,
      setDeleteNotificationTitle,
      addNotification,
      editNotification,
      deleteNotification,
      setDeleteNotification,
      setAddNotificationTitle,
      setAddNotification,
      setEditNotificationTitle,
      setEditNotification,
      index,
      setIndex
      }}
    >
      {children} {/* Render child components */}
    </DataContext.Provider>
  );
};

// Export the context for use in other components
export default DataContext;
