import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import { environmentVariable } from "../../components/Environment";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
//import { useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as moment from "moment";
//import { todosListCount } from "../../components/Redux/Reducer";
import useFetch from "../../components/FetchEditData";

function Index() {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      // gettodoData();
      //getTodosData();
      //getCustomHook();
    }
    // console.log(moment(new Date()).month(2).format("YYYY-MM-DD, h:mm:ss"));
    //getTodosData();
  }, []);
  // function gettodoData() {
  //   fetch(`${environmentVariable}/todos/${id}`)
  //     .then((res) => res.json())
  //     .then((response) => {
  //       setTodoData(response);
  //       const Target = moment(response.target).format("YYYY-MM-DD");
  //       //const Target=response.target;
  //       // let date = Target.split(" ");

  //       //console.log(date);
  //       //setTodoData({ ...response, target: date[0] });
  //       setTodoData({ ...response, target: Target });
  //       //console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  const [responseData] = useFetch(`${environmentVariable}/todos/${id}`);
  // function getCustomHook() {
  //   console.log(responseData);
  const initialValue = {
    title: "",
    completed: false,
    target: "",
    createdAt: "",
    updatedAt: "",
  };
  // let updatedData = {};
  // if (responseData) {
  //   const Target = moment(responseData.target).format("YYYY-MM-DD");
  //   updatedData = { ...responseData, target: Target };
  //   //   setTodoData({ ...responseData, target: Target });
  //   // } else {
  //   //   //const Target = moment(data.target).format("YYYY-MM-DD");
  //   //   setTodoData({ ...responseData });
  // } else {
  //   updatedData = initialValue;
  // }
  //}
  // const dispatch = useDispatch();

  // function getTodosData() {
  //   let todoData = async () => {
  //     const response = await fetch(`${environmentVariable}/todos`);
  //     const data = await response.json();
  //     dispatch(todosListCount(data));

  //     console.log(data);
  //   };
  //   todoData();
  // }

  const [todoData, setTodoData] = useState(initialValue);
  const navigate = useNavigate();

  //console.log(id);

  function onChangeInputData(event) {
    let text = event.target.value;
    console.log(text);
    setTodoData({ ...todoData, [event.target.name]: text });
  }
  function onChangeCheckboxData(event) {
    setTodoData({ ...todoData, [event.target.name]: !todoData.completed });
  }

  const formik = useFormik({
    initialValues: todoData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      target: Yup.string()
        .min(3, "Too Short!")

        .required("Required"),
    }),
    onSubmit: (values) => {
      // same shape as initial values
      console.log(JSON.stringify(values));

      if (!id) {
        // const createdDate = new Date();
        // const updatedDate = new Date();

        // let date = createdDate.getDate();
        // let Month = createdDate.getMonth() + 1;
        // let year = createdDate.getFullYear();
        // let minutes = createdDate.getMinutes();
        // let hours = createdDate.getHours();
        // let seconds = createdDate.getMilliseconds();

        // let date1 = updatedDate.getDate();
        // let Month1 = updatedDate.getMonth() + 1;
        // let year1 = updatedDate.getFullYear();
        // let minutes1 = updatedDate.getMinutes();
        // let hours1 = updatedDate.getHours();
        // let seconds1 = updatedDate.getMilliseconds();

        // let formattedcreatedDate = `${year}-${Month}-${date} ${hours}:${minutes}:${seconds}`;
        // let formattedupdatedDate = `${year1}-${Month1}-${date1} ${hours1}:${minutes1}:${seconds1}`;

        let finalDate = moment().format("YYYY-MM-DD h:mm:ss");

        const Totaldata = {
          ...values,
          createdAt: finalDate,
          updatedAt: finalDate,
        };

        // let options = {
        //   method: "post",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(Totaldata),
        // };

        axios
          .post("http://localhost:3001/todos", Totaldata)
          .then((res) => {
            console.log(res);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const updatedDate = new Date();

        // let date1 = updatedDate.getDate();
        // let Month1 = updatedDate.getMonth() + 1;
        // let year1 = updatedDate.getFullYear();
        // let minutes1 = updatedDate.getMinutes();
        // let hours1 = updatedDate.getHours();
        // let seconds1 = updatedDate.getMilliseconds();

        // const seconds2 = Math.floor(seconds1 % 60);
        // let finalSeconds = "";
        // if (seconds2 < 10) {
        //   finalSeconds = `0${seconds2}`;
        // } else {
        //   finalSeconds = seconds2;
        // }
        // const minutes = Math.floor(minutes1 / 60);
        // let finalMinutes = "";
        // if (minutes < 10) {
        //   finalMinutes = `0${minutes}`;
        // } else {
        //   finalMinutes = minutes;
        // }

        //const finalSeconds = moment().second(seconds1);
        let finalDate = moment().format("YYYY-MM-DD h:mm:ss");

        //let formattedupdatedDate = `${year1}-${Month1}-${date1} ${hours1}:${minutes1}:${seconds1}`;
        const Totaldata = {
          ...values,

          updatedAt: finalDate,
        };

        // let options = {
        //   method: "post",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(Totaldata),
        // };

        axios
          .put(`http://localhost:3001/todos/${id}`, Totaldata)
          .then((res) => {
            //console.log(res);
            navigate("/");
          });
      }
    },
  });

  // function onSubmitForm(event) {
  //   event.preventDefault();

  //   // let date = createdDate.getDate();
  //   // let Month = createdDate.getMonth() + 1;
  //   // let year = createdDate.getFullYear();
  //   // let minutes = createdDate.getMinutes();
  //   // let hours = createdDate.getHours();
  //   // let seconds = createdDate.getMilliseconds();

  //   // let date1 = updatedDate.getDate();
  //   // let Month1 = updatedDate.getMonth() + 1;
  //   // let year1 = updatedDate.getFullYear();
  //   // let minutes1 = updatedDate.getMinutes();
  //   // let hours1 = updatedDate.getHours();
  //   // let seconds1 = updatedDate.getMilliseconds();

  //   // let formattedcreatedDate = `${year}-${Month}-${date} ${hours}:${minutes}:${seconds}`;
  //   // let formattedupdatedDate = `${year1}-${Month1}-${date1} ${hours1}:${minutes1}:${seconds1}`;
  //   if (!id) {
  //     const createdDate = new Date();
  //     const updatedDate = new Date();

  //     let date = createdDate.getDate();
  //     let Month = createdDate.getMonth() + 1;
  //     let year = createdDate.getFullYear();
  //     let minutes = createdDate.getMinutes();
  //     let hours = createdDate.getHours();
  //     let seconds = createdDate.getMilliseconds();

  //     let date1 = updatedDate.getDate();
  //     let Month1 = updatedDate.getMonth() + 1;
  //     let year1 = updatedDate.getFullYear();
  //     let minutes1 = updatedDate.getMinutes();
  //     let hours1 = updatedDate.getHours();
  //     let seconds1 = updatedDate.getMilliseconds();

  //     let formattedcreatedDate = `${year}-${Month}-${date} ${hours}:${minutes}:${seconds}`;
  //     let formattedupdatedDate = `${year1}-${Month1}-${date1} ${hours1}:${minutes1}:${seconds1}`;

  //     const Totaldata = {
  //       ...todoData,
  //       createdAt: formattedcreatedDate,
  //       updatedAt: formattedupdatedDate,
  //     };

  //     // let options = {
  //     //   method: "post",
  //     //   headers: { "Content-Type": "application/json" },
  //     //   body: JSON.stringify(Totaldata),
  //     // };

  //     axios
  //       .post("http://localhost:3001/todos", Totaldata)
  //       .then((res) => {
  //         console.log(res);
  //         navigate("/");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     const updatedDate = new Date();

  //     let date1 = updatedDate.getDate();
  //     let Month1 = updatedDate.getMonth() + 1;
  //     let year1 = updatedDate.getFullYear();
  //     let minutes1 = updatedDate.getMinutes();
  //     let hours1 = updatedDate.getHours();
  //     let seconds1 = updatedDate.getMilliseconds();

  //     let formattedupdatedDate = `${year1}-${Month1}-${date1} ${hours1}:${minutes1}:${seconds1}`;
  //     const Totaldata = {
  //       ...todoData,

  //       updatedAt: formattedupdatedDate,
  //     };

  //     // let options = {
  //     //   method: "post",
  //     //   headers: { "Content-Type": "application/json" },
  //     //   body: JSON.stringify(Totaldata),
  //     // };

  //     axios.put(`http://localhost:3001/todos/${id}`, Totaldata).then((res) => {
  //       //console.log(res);
  //       navigate("/");
  //     });
  //   }
  // }

  //const chechboxValue = todoData.completed ? checked : "";
  return (
    <Container className="mt-5 pt-4">
      <Form className="mt-5" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Todo"
            name="title"
            value={formik.values.title}
            onChange={(event) => onChangeInputData(event)}
          />
          <Form.Text className="text-danger">
            {formik.touched.title && formik.errors.title ? (
              <div className="text-danger">{formik.errors.title}</div>
            ) : null}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            name="completed"
            label="Completed"
            checked={todoData.completed}
            onChange={(event) => onChangeCheckboxData(event)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Target</Form.Label>
          <Form.Control
            type="date"
            name="target"
            value={formik.values.target}
            placeholder="Select Target"
            onChange={(event) => onChangeInputData(event)}
          />
          <Form.Text className="text-danger">
            {formik.touched.target && formik.errors.target ? (
              <div className="text-danger">{formik.errors.target}</div>
            ) : null}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Index;
