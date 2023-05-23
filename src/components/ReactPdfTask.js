import { height } from "@mui/system";
import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ReactPdfTask = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Todo-Data",
    onAfterPrint: () => alert("Print Success"),
  });
  return (
    <>
      <div
        ref={componentRef}
        style={{ width: "100%", height: window.innerHeight }}
      >
        ReactPdfTask
      </div>
      <button onClick={handlePrint}>Print</button>
    </>
  );
};

export default ReactPdfTask;
