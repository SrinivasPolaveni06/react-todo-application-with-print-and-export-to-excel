import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalConfirm from "../ModalConfirm";
import "./index.css";

const Index = (props) => {
  const { eachTodo, relode, stylename } = props;
  const textColor = eachTodo.completed ? "textSuccess" : "";
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);

  function onEdit() {
    navigate(`/todo/${eachTodo.id}`);
  }

  function onDelete(id) {
    console.log(id);
    setVerify(!verify);
  }
  function handleModalClose() {
    setVerify(false);
  }

  return (
    <>
      <tr className={`${textColor} ${stylename}`}>
        <td className={stylename}>{eachTodo.id}</td>
        <td className={stylename}>{eachTodo.title}</td>
        <td className={stylename}>
          {eachTodo.completed ? "Done" : "Incomplete"}
        </td>
        <td className={stylename}>{eachTodo.target}</td>
        <td className={stylename}>{eachTodo.createdAt}</td>
        <td className={stylename}>{eachTodo.updatedAt}</td>

        <td className={stylename}>
          <Button variant="warning" size="sm" onClick={() => onEdit()}>
            <i className="bi bi-pencil-fill"></i>
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="ms-2"
            onClick={() => onDelete(eachTodo.id)}
          >
            <i className="bi bi-trash"></i>
          </Button>
        </td>
      </tr>
      {verify ? (
        <ModalConfirm
          verify={verify}
          id={eachTodo.id}
          handleModalClose={handleModalClose}
          relode={relode}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Index;
