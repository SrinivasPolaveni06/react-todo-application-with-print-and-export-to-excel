import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { environmentVariable } from "../../components/Environment";
import TodoItem from "../../components/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { todosListCount } from "../../components/Redux/Reducer";
import Button from "react-bootstrap/Button";
import GridTableData from "../../components/GridTableData";
//import TablePagination from "@mui/material/TablePagination";
import { TablePagination } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { userContext } from "../../components/ContextApp";
import { useContext } from "react";
import "./index.css";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { getTodosList } from "../../components/Redux/Reducer";

const Index = () => {
  const [tableData, setData] = useState([]);
  const [grid, setGrid] = useState(false);
  const dispatch = useDispatch();
  const [searchingData, setSearchingData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [actions, setActionsData] = useState(false);
  const { theame, setTheame } = useContext(userContext);
  const { todosList, todosCount } = useSelector(
    (value) => value.todosCountSlice
  );

  const theameSelector = theame ? "darkTheame" : " whiteTheame";
  const btnColor = theame ? "text-white" : "";

  function onChangeTheame() {
    setTheame(!theame);
  }

  useEffect(() => {
    //dispatch(getTodosList());
    getTodosData();
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function onSearchUsers(event) {
    const text = event.target.value;
    //setSearch(text);
    usersFiltering(text);
  }

  function usersFiltering(text) {
    //console.log(text);
    const searchedDataList = searchingData.filter(
      (eachUser) =>
        eachUser.title.toLowerCase().includes(text.toLowerCase()) === true
    );
    if (searchedDataList.length <= 5) {
      setData(searchedDataList);
      setRowsPerPage(5);
      setPage(0);
    } else {
      setData(searchedDataList);
    }
  }

  function getTodosData() {
    let todoData = async () => {
      const response = await fetch(`${environmentVariable}/todos`);
      const data = await response.json();
      setData(data);
      setSearchingData(data);
      //dispatch(todosListCount(data));
      //console.log(data);
    };
    todoData();
  }

  function onChangeGrid() {
    setGrid(!grid);
  }

  function onChangeactions() {
    setActionsData(true);
  }
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Todo-Data",
    onAfterPrint: () => alert("Print Success"),
  });
  const stylename = grid ? "table-grid mt-2" : "mt-2";
  return (
    <Container className={theameSelector}>
      <Container className="mt-5 d-flex justify-content-end">
        <Button
          variant="text"
          className={`btnSize ${btnColor}`}
          onClick={() => onChangeTheame()}
        >
          {theame ? `Set White Theame ` : `Set Dark Theame`}
        </Button>
      </Container>
      <Container className="mt-3 mb-3 d-flex justify-content-between">
        <Paper
          component="form"
          sx={{
            p: "1px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
          className=" bg-secondary "
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by title"
            inputProps={{ "aria-label": "search users" }}
            onChange={(event) => onSearchUsers(event)}
            className="text-white"
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon className="text-white" />
          </IconButton>
        </Paper>
        <div>
          <button className="btn btn-primary" onClick={handlePrint}>
            Print
          </button>
          <DownloadTableExcel
            filename="Todos table"
            sheet="todos"
            currentTableRef={componentRef.current}
          >
            <button
              className="btn btn-primary ms-3 me-3"
              onClick={() => onChangeactions()}
            >
              Export Excel
            </button>
          </DownloadTableExcel>
          <Button variant="primary" onClick={() => onChangeGrid()}>
            {grid ? `Show as Table` : `Show as Grid`}
          </Button>
        </div>
      </Container>

      {grid ? (
        <GridTableData tableData={todosList} />
      ) : (
        <>
          <div ref={componentRef} className="print">
            <Table
              bordered
              hover
              className={`${stylename} ${theameSelector}`}
              ref={componentRef}
            >
              <thead className="text-center">
                <tr className={stylename}>
                  <th className={stylename}>Id</th>
                  <th className={stylename}>Titles</th>
                  <th className={stylename}>Completed</th>
                  <th className={stylename}>Target Date</th>
                  <th className={stylename}>Created At</th>
                  <th className={stylename}>Updated At</th>
                  <th className={stylename}>Actions</th>
                </tr>
              </thead>
              {todosList.length > 0 ? (
                <tbody className="text-center">
                  {todosList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((eachTodo) => (
                      <TodoItem
                        key={eachTodo.id}
                        eachTodo={eachTodo}
                        relode={getTodosData}
                        stylename={stylename}
                      />
                    ))}
                </tbody>
              ) : (
                <tbody className="text-center">
                  <tr>
                    <td className={`${stylename} not-found `} colSpan="7">
                      No Data Found
                    </td>
                  </tr>
                </tbody>
              )}
            </Table>
          </div>

          <TablePagination
            rowsPerPageOptions={[5, 15, 100]}
            component="div"
            count={todosList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className={`${theameSelector} mt-1`}
          />
        </>
      )}
    </Container>
  );
};

export default Index;
