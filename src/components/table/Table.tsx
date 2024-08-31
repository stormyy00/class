"use client";
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
      <div className="flex flex-col justify-between overflow-y-scroll rounded-lg bg-white drop-shadow-[20px_15px_35px_rgba(0,0,0,0.25)]">
        <div className="h-full">
          <div className="rounded-t-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white">
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
                        className={`mx-2 rotate-90 text-gray-200 hover:cursor-pointer ${
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
                        className="mx-2 text-white hover:cursor-pointer"
                      />
                    )}
                    {column.getIsSorted() === "desc" && (
                      <SortDesc
                        onClick={column.getToggleSortingHandler()}
                        data-cy={`${column.columnDef.header}-sorting-asc`}
                        className="mx-2 text-white hover:cursor-pointer"
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
                  <p className="w-full bg-white py-8 text-center">{empty}</p>
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
                  ),
                )}
              </>
            )}
          </>
        </div>
        <div className="flex w-full items-center justify-end rounded-b-lg bg-white p-4 text-lg">
          <div className="mx-2">{getRowModel().rows.length} row(s)</div>
          <button
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
            className="disabled:text-hackathon-gray-200 mx-2"
          >
            <ChevronLeft />
          </button>
          <div>
            Page {getState().pagination.pageIndex + 1} of {getPageCount()}
          </div>
          <button
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
            className="disabled:text-hackathon-gray-200 mx-2"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
