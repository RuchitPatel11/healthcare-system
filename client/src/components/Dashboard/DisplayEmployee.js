import React, { useEffect, useState } from "react";
import { emp_data } from "./EmployeeData";

const DisplayEmployee = () => {
  const [sort, setSort] = useState();
  const [data, setData] = useState(emp_data);
  const [filter, setFilter] = useState();
  const [query, setQuery] = useState();

  useEffect(() => {
    function sortData(a, b) {
      if (a.name < b.name) {
        return sort === "descending" ? -1 : 1;
      }
      if (a.name > b.name) {
        return sort === "ascending" ? -1 : 1;
      }
      return 0;
    }
    if (!sort) return;
    setData(emp_data.sort(sortData));
  }, [sort]);

  useEffect(() => {
    const filteredData = emp_data.filter((employee) => {
      return employee.designation === filter;
    });
    if (!filter) return;
    setData(filteredData);
  }, [filter]);

  const handleClick = () => {
    if (query.length > 0) {
      setData(
        data.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.repoting_head.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setData(data);
    }
  };

  return (
    <div className="flex flex-col gap-5 m-10">
      <div className="flex gap-10">
        <div className="flex items-center gap-1 px-5">
          <span className="fa-solid fa-arrow-down-a-z"></span>
          <label htmlFor="sortby" className="text-secondary">
            Sort By Employee Name:
          </label>
          <select
            id="sortby"
            className="p-2 bg-white border focus:outline-none"
            onChange={(e) => {
              setSort(e.target.value);
            }}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              Select
            </option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>

        <div className="flex items-center gap-1 px-5">
          <span className="fa-solid fa-filter"></span>
          <label htmlFor="sortby" className="text-secondary">
            Filter By Designation:
          </label>
          <select
            id="sortby"
            className="p-2 bg-white border focus:outline-none"
            defaultValue=""
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Senior software developer">
              Senior software developer
            </option>
            <option value="Junior software developer">
              Junior software developer
            </option>
            <option value="Team lead">Team Lead</option>
            <option value="Project manager">Project Manager</option>
          </select>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="relative flex items-center justify-end text-lg border-2 w-96 text-secondary border-secondary">
          <input
            type="search"
            id="search"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            name="search"
            className="block w-full px-4 py-1 shadow-sm pl-11 text-md focus:outline-none"
            placeholder="Search by name"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <span className="fa-solid fa-magnifying-glass"></span>
          </div>
        </div>
        <button
          type="submit"
          className="py-2 px-7 bg-success"
          onClick={handleClick}
        >
          Search
        </button>
      </div>

      <table className="">
        <thead className="text-lg font-bold bg-slate-300">
          <tr>
            <td>Employee Name</td>
            <td>Designation</td>
            <td>Reporting Head</td>
          </tr>
        </thead>
        {data.map((item, index) => {
          return (
            <tbody className="" key={index}>
              <tr>
                <td>{item.name}</td>
                <td>{item.designation}</td>
                <td>{item.repoting_head}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default DisplayEmployee;
