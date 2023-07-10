import Button from "@mui/material/Button";
import { useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState([]);

  const handleSubmit = async () => {
    const value = inputRef.current?.value;

    const response = await fetch("/api/edit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });
    const data = await response.json();
    console.log(data);
  };

  const loadData = async () => {
    const response = await fetch("/api/edit-form", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setData(data);
  };

  return (
    <div className="text-center grid place-items-center">
      <input className="py-2 px-5 mt-10 mb-5" ref={inputRef} type="text" />
      <Button onClick={handleSubmit}>submit</Button>

      <Button onClick={loadData}>load data</Button>
      <div className="w-1/2 ">
      {data.map((item: any, index: number) => {
        return <div className={`text-center py-10 hover:cursor-pointer ${index%2==0 && 'bg-[#2e2e2e] text-white hover:bg-black'}`} key={index}>{item.titleOfBook}</div>;
      })}
      </div>
    </div>
  );
}
