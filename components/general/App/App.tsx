import { useState } from "react";
import Table from "../Table/Table";

export default function MiniDrawer() {
  const [rows, setRows] = useState([]);
  const [rowData, setRowData] = useState([]);


  return (
    <>
      <Table rows={rows}/>
    </>
  );
}
