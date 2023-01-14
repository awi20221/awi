import React, { useState, useEffect, useMemo } from "react";
import "./Currencies.css";
import axios from "../../axios/axios";
import Footer from "../../mainComponents/Footer";
import Nav from "../../mainComponents/Navigation";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import tw from "twin.macro";
import { GlobalFilter } from "./globalFilter";

const Table = tw.table`
  table-fixed
  text-base
  text-gray-900
  w-full
`;

const TableHead = tw.thead`
  p-2
`;

const TableRow = tw.tr`
border
border-green-500
`;

const TableHeader = tw.th`
border
border-green-500
p-2
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
border
border-green-500
p-5
`;


const CurrenciesList = () => {
  const [currencies, setCurrencies] = useState([]);
  let [lastDate, setLastDate] = useState("2022-10-03"); //data najstarsza na sztyno - w razie błędu będzie zawsze działać
  //no chyba ze juz z bazy zostanie usuniete

  useEffect(() => {
    fetchLastDate().then((lastDate) => fetchCurrencies(lastDate));
  }, [lastDate]);

  async function fetchLastDate() {
    let url = "http://localhost:3001/api/currencies/update-time";
    await axios
      .get(url)
      .then((response) => {
        //console.log(response.data);
        setLastDate(response.data.effectiveDate);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
    return lastDate;
  }

  async function fetchCurrencies(lastDate) {
    //console.log(lastDate);
    let url = "http://localhost:3001/api/currencies/effectiveDate/" + lastDate;
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data.currencies);
        setCurrencies(response.data.currencies);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }

 /* const columns = useMemo(
    () => [
      {
        Header: "Waluta",
        accessor: "currency",
      },
      {
        Header: "Skrót",
        accessor: "code",
      },
      {
        Header: "Mid",
        accessor: "mid",
      },
      {
        Header: "Data",
        accessor: "effectiveDate",
      },
    ],
    []
  );*/

  const currenciesData = useMemo(() => [...currencies], [currencies]);

  const currenciesColumns = useMemo(
    () =>
      currencies[0]
        ? Object.keys(currencies[0])
            .filter((key) => key !== "_id" && key != "slug" && key != "__v")
            .map((key) => {
              return { Header: key, accessor: key };
            })
        : [],
    [currencies]
  );

  const tableInstance = useTable(
    {
      columns: currenciesColumns,
      data: currenciesData,
    },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  const isEven = (idx) => idx % 2 === 0;

  return (
    <>
    <Nav/>
    <h3 className="CurrenciesTitle">Kursy walut</h3>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <p className="CurrenciesDate">Data: {lastDate}</p>
      <Table className="tabele"{...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader 
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : " ⇵"}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);

            return (
              <TableRow
                {...row.getRowProps()}
                className={isEven(idx) ? "bg-green-400 bg-opacity-30" : ""}
              >
                {row.cells.map((cell, idx) => (
                  <TableData {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableData>
                  
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Footer/>
    </>
  );
};

export default CurrenciesList;

