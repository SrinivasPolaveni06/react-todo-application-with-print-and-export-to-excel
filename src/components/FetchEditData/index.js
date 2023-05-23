import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState();
  console.log(data, "data");
  //   let data = null;
  //   const Fetched = async () => {
  //     //   await fetch(url)
  //     //     .then((res) => res.json())
  //     //     .then((data) => {
  //     //       console.log(data);
  //     //       setData(data);
  //     //     });
  //     const response = await fetch(url);
  //     data = await response.json();
  //     //console.log(data);
  //     //setData(data);
  //   };
  //   Fetched();
  //let checking = "";

  useEffect(() => {
    const Fetched = async () => {
      const response = await fetch(url);
      const data1 = await response.json();
      console.log(data1);
      setData(data1);
    };
    Fetched();
  }, [url]);

  return [data];
};

export default useFetch;
