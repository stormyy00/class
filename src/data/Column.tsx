"use client"
import Checkbox from "@/components/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
// import {checkbox} from "@/types/index" 

type Col = {
  name: string;
  code: string;
  description: string;
  credits: number;
};

const generateSelect = () => ({
  id: "select",
  meta: {width: "w-1/12"},
  header: ({ table }) => (
    <Checkbox
      toggle={table.getIsAllRowsSelected()}
      onClick={table.getToggleAllRowsSelectedHandler()}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      toggle={row.getIsSelected()}
      onClick={row.getToggleSelectedHandler()}
    />
  ),
});


export const COLUMNS: ColumnDef<Col, string>[] = [
    generateSelect(), 
    {
      accessorKey: "name",  
      header: "Name",     
      meta: { width: "w-3/12" }, 
      enableColumnFilter: true,   
      filterFn: "includesString", 
      cell: (props) => <div>{props.getValue()}</div>, 
    },
    {
      accessorKey: "code", 
      header: "Code",
      meta: { width: "w-3/12" },
      filterFn: "includesString",
      cell: (props) => <div>{props.getValue()}</div>,
    },
    {
      accessorKey: "description",  
      header: "Description",
      meta: { width: "w-3/12" },
      filterFn: "includesString",
      cell: (props) => <div>{props.getValue()}</div>,
    },
    {
      accessorKey: "credits",  
      header: "Credits",
      meta: { width: "w-3/12" },
      cell: (props) => <div>{props.getValue()}</div>,
    },
  ];
  
// import { createColumnHelper } from "@tanstack/react-table";
// import Checkbox from "@/components/Checkbox";
// const columnHelper = createColumnHelper<any>();

// const createSelectionColumn = () => {
//     return columnHelper.display({
//       id: "select",
//       header: ({ table }) => (
//         <Checkbox
//           toggle={table.getIsAllRowsSelected()}
//           onClick={table.getToggleAllRowsSelectedHandler()}
//           color="bg-blue-500"
//         />
//       ),
//       cell: ({ row }) => (
//         <Checkbox
//           toggle={row.getIsSelected()}
//           onClick={row.getToggleSelectedHandler()}
//           color="bg-green-500"
//         />
//       ),
//       meta: { width: "w-1/12" }, 
//     });
//   };
  
  
// export const columns = [
//     createSelectionColumn(),
//     columnHelper.accessor("name", {
//       header: "Course Name",
//       meta: { width: "w-4/12" },
//       enableColumnFilter: true,   // Enables filtering on this column
//         filterFn: "includesString",
//       cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor("code", {
//       header: "Code",
//       meta: { width: "w-4/12" },
//       enableColumnFilter: true,   // Enables filtering on this column
//         filterFn: "includesString",
//       cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor("description", {
//         header: "Description",
//         meta: { width: "w-4/12" },
//         enableColumnFilter: true,   // Enables filtering on this column
//         filterFn: "includesString",
//         cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor("credits", {
//       header: "Credits",
//       meta: { width: "w-3/12" },
//       enableColumnFilter: true,   // Enables filtering on this column
//         filterFn: "includesString",
//       cell: (info) => info.getValue(),
//     }),
//     // Add more columns as needed
//   ];