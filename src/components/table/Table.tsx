"use client"
import { flexRender } from "@tanstack/react-table";
import Frame from "./Frame";

import {
    ChevronLeft,
    ChevronRight,
    SortAsc,
    SortDesc,
    ArrowRightLeft,
} from "lucide-react";
import Loading from "@/components/Loading";

const Table = ({
  getHeaderGroups,
  getRowModel,
  getState,
  previousPage,
  getCanPreviousPage,
  nextPage,
  getCanNextPage,
  getPageCount,
  Dropdown,
  empty,
  loading,
}) => {
    
//   const index = parseInt(searchParams.index ?? 1);
//   const size = parseInt(searchParams.size ?? 10);

//   const { first, last, total } = meta;

  return (
    <>
      <div className="bg-white overflow-y-scroll flex flex-col justify-between rounded-lg drop-shadow-[20px_15px_35px_rgba(0,0,0,0.25)]">
        <div className="h-full">
          <div 
          className="text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-lg"
          >
          {getHeaderGroups().map(({ headers, id }) => (
              <div key={id} className="flex items-center px-3 py-2">
                {headers.map(({ id, column, getContext }) => (
                  <div
                    key={id}
                    className={`${column.columnDef.meta?.width} flex items-center`}
                    data-cy="header"
                  >
                    {flexRender(column.columnDef.header, getContext())}
                    {column.getCanSort() && (
                      <ArrowRightLeft
                        className={`mx-2 rotate-90 hover:cursor-pointer text-gray-200 ${
                          column.getIsSorted() && "hidden"
                        }`}
                        data-cy={`${column.id}-sorting`}
                        onClick={column.getToggleSortingHandler()}
                      />
                    )}
                    {column.getIsSorted() === "asc" && (
                      <SortAsc
                        onClick={column.getToggleSortingHandler()}
                        data-cy={`${column.id}-sorting-desc`}
                        className="mx-2 hover:cursor-pointer text-white"
                      />
                    )}
                    {column.getIsSorted() === "desc" && (
                      <SortDesc
                        onClick={column.getToggleSortingHandler()}
                        data-cy={`${column.columnDef.header}-sorting-asc`}
                        className="mx-2 hover:cursor-pointer text-white"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <>
            {loading ? (
              <Loading />
            ) : (
              <>
                {getRowModel().rows.length === 0 && (
                  <p className="w-full text-center py-8 bg-white">{empty}</p>
                )}
                {getRowModel().rows.map(
                  ({ id, getVisibleCells, original, getIsSelected }) => (
                    <Frame
                      getIsSelected={getIsSelected}
                      key={id}
                      getVisibleCells={getVisibleCells}
                      Dropdown={Dropdown}
                      original={original}
                    />
                  )
                )}
              </>
            )}
          </>
        </div>
        <div className="flex justify-end items-center p-4 text-lg bg-white w-full rounded-b-lg">
          <div className="mx-2">{getRowModel().rows.length} row(s)</div>
          <button
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
            className="mx-2 disabled:text-hackathon-gray-200"
          >
            <ChevronLeft />
          </button>
          <div>
            Page {getState().pagination.pageIndex + 1} of {getPageCount()}
          </div>
          <button
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
            className="mx-2 disabled:text-hackathon-gray-200"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
