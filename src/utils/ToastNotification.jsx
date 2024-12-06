import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastNotification() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // you can replace this with actual logic for detecting darkMode
    // example: if darkMode is saved in localStorage or comes from a context
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={darkMode ? 'dark' : 'light'} // dynamically set theme based on darkMode
      />
    </>
  );
}

export const showToast = (msg, type = 'success') => {
  toast[type](msg); // dynamically show a toast with the specified type
};
