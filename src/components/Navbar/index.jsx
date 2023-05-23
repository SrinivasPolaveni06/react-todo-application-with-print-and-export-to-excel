import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { environmentVariable } from "../../components/Environment";
import { todosListCount } from "../Redux/Reducer";
import { getTodosList } from "../Redux/Reducer";
import "./index.css";

const Index = () => {
  const { todosCount } = useSelector((value) => value.todosCountSlice);
  // const [tableData, setData] = useState([]);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   //getTodosData();
  //   dispatch(getTodosList());
  // }, []);
  // function getTodosData() {
  //   let todoData = async () => {
  //     const response = await fetch(`${environmentVariable}/todos`);
  //     const data = await response.json();
  //     //setData(data);
  //     dispatch(getTodosList());
  //     //console.log(data);
  //   };
  //   todoData();
  // }

  return (
    <>
      <Navbar fixed="top" bg="light" variant="warning" className="navbar-card">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold text-dark">
            Todos App
          </Navbar.Brand>
          <Nav className="ms-auto">
            <NavLink
              to="/"
              className="fw-bold text-decoration-none text-dark me-3"
            >
              Home
            </NavLink>
            <NavLink
              to="/todo"
              className="fw-bold text-decoration-none  text-dark me-3"
            >
              Todo <Badge bg="danger">{todosCount}</Badge>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Index;
