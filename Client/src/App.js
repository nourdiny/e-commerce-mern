import React from 'react';
import {RouterProvider} from "react-router-dom";
import {ContextProvider} from './context/ContextProvider.jsx';
import router from "./router.jsx";

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App
