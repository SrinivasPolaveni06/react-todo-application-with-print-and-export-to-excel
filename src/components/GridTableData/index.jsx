import React, { useState, useEffect } from "react";
import { environmentVariable } from "../Environment";
import { AgGridReact } from "ag-grid-react";
import { userContext } from "../../components/ContextApp";
import { useContext } from "react";
import "./index.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Index = (props) => {
  //   const [rowData] = useState([
  //     { make: "Toyota", model: "Celica", price: 35000 },
  //     { make: "Ford", model: "Mondeo", price: 32000 },
  //     { make: "Porsche", model: "Boxster", price: 72000 },
  //   ]);

  const { tableData } = props;

  const [columnDefs] = useState([
    { field: "id" },
    { field: "title" },
    { field: "completed" },
    { field: "target" },
    { field: "createdAt" },
    { field: "updatedAt" },
  ]);

  // const [tableData1, setData] = useState(tableData);
  // const [grid, setGrid] = useState(false);

  // useEffect(() => {
  //   getTodosData();
  // }, []);
  // function getTodosData() {
  //   // let todoData = async () => {
  //   //   const response = await fetch(`${environmentVariable}/todos`);
  //   //   const data = await response.json();

  //   getModifingData(tableData1);

  //   //   console.log(data);
  //   // };
  //   // todoData();
  // }

  let newData = tableData.map((eachData) => {
    const result = eachData.completed ? "Done" : "Incomplete";

    const modifiedData = {
      ...eachData,
      completed: result,
    };
    return modifiedData;
  });
  //setData(newData);

  return (
    <div className="ag-theme-alpine " style={{ height: 500, width: 1210 }}>
      <AgGridReact rowData={newData} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
};
export default Index;
