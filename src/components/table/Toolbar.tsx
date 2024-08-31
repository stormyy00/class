"use client";
import { useState } from "react";
import Input from "../Input";
import { useToast } from "@/hooks/use-toast";
import { course } from "@/types/index";
import { useSelectedCourses } from "../Context";
interface ToolbarProps {
  // other props if needed
  courses: course[];
}
const Toolbar = ({
  page,
  filters,
  setFilters,
  data,
  setData,
  tags,
  getFilteredSelectedRowModel,
  toggleAllRowsSelected,
  setLoading,
  searchableItems,
  searchParams,
  setMeta,
  meta,
  courses
}: ToolbarProps) => {
    const { toast } = useToast();
    const { setSelectedCourses } = useSelectedCourses();
  const selectedRows = getFilteredSelectedRowModel();
  const [search, setSearch] = useState({
    search: "name",
  });
//   console.log("inpiut",  meta().rows.filter((row) => row.getIsSelected()),)
  const handleChange = () => {
    console.log("OnClick",  meta().rows.filter((row) => row.getIsSelected()),)
    const selectedData = meta().rows.filter(row => row.getIsSelected()).map(row => row.original);
    setSelectedCourses(selectedData);

  }

  const rows = selectedRows.rows.map(({ original }) => original);

  const value = filters.find(({ id }) => id === search.search)?.value || "";

  const onChange = (id, value) =>
    setFilters((prev) =>
      prev.filter(({ id }) => id !== search.search).concat({ id, value }),
    );
  return (
    <div className="my-2 flex w-full gap-3">
      <button
        onClick={() => {
        handleChange();
          toast({
            description: "Courses Added",
          });
        }}
        className="whitespace-nowrap rounded-xl bg-green-500 px-12 py-2 duration-300 hover:scale-95"
      >
        Add courses
      </button>
      <div className="my-1 flex w-full items-center rounded-md bg-gray-100">
        <Input
          label="search"
          classes="w-full"
          placeholder="Search"
          showLabel={false}
          maxLength={100}
          clear={true}
          value={value}
          onChangeFn={(e) => onChange(search.search, e.target.value)}
          clearFn={() => onChange(search.search, "")}
        />
      </div>
    </div>
  );
};

export default Toolbar;
