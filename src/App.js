import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Pages/Home";
import Nopage from "./Pages/Nopage";
import Todos from "./Pages/Todos";
import { useState } from "react";
import { userContext } from "./components/ContextApp";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTodosList } from "./components/Redux/Reducer";

function App() {
  const [theame, setTheame] = useState(false);
  const dispatch = useDispatch();

  //useEffect(() => {
  //getTodosData();
  dispatch(getTodosList());
  //}, []);
  return (
    <userContext.Provider value={{ theame, setTheame }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="todo" element={<Todos />} />
            <Route path="todo/:id" element={<Todos />} />
            <Route path="*" element={<Nopage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
