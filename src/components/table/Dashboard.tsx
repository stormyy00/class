"use client";
import { useState, useEffect } from "react";
import Table from "./Table";
import Toolbar from "./Toolbar";
import { getCourses } from "@/server/queries/queries";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
const Dashboard = ({ title, columns, page, tags, Dropdown, empty }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const classes = await getCourses();
        setData(classes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const {
    getHeaderGroups,
    getRowModel,
    getFilteredSelectedRowModel,
    toggleAllRowsSelected,
    getState,
    previousPage,
    getCanPreviousPage,
    nextPage,
    getCanNextPage,
    getPageCount,
  } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setSelected,
    enableRowSelection: true,
    state: {
      rowSelection: selected,
      columnFilters: filters,
    },
  });
  console.log(
    "select",
    getRowModel().rows.filter((row) => row.getIsSelected()),
  );

  return (
    <div className="flex h-full w-full items-center justify-center md:w-9/12">
      <title>{title}</title>

      <div className="bg-blue-page z-0 flex h-screen w-full items-start justify-center px-4 py-12 lg:py-0">
        <div className="w-full">
          <div className="my-2 flex w-full items-center justify-between text-4xl font-bold">
            <p className="bg-gradient-to-r from-gray-600 to-blue-500 bg-clip-text text-transparent">
              {title}
            </p>
          </div>
          <Toolbar
            meta={getRowModel}
            // setMeta={setMeta}
            // searchParams={searchParams}
            page={page}
            filters={filters}
            setFilters={setFilters}
            data={data}
            setData={setData}
            tags={tags}
            getFilteredSelectedRowModel={getFilteredSelectedRowModel}
            toggleAllRowsSelected={toggleAllRowsSelected}
            setLoading={setLoading}
            // searchableItems={searchableItems}
          />
          <Table
            getHeaderGroups={getHeaderGroups}
            getRowModel={getRowModel}
            getState={getState}
            previousPage={previousPage}
            getCanPreviousPage={getCanPreviousPage}
            nextPage={nextPage}
            getCanNextPage={getCanNextPage}
            getPageCount={getPageCount}
            Dropdown={Dropdown}
            empty={empty}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
