import React, { useState, useEffect, useMemo, useRef } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { GlobalFilter } from "../../mainComponents/globalFilter";
import tw from "twin.macro";
import "./shares.css";
import axios from "../../axios/axios";
import Footer from "../../mainComponents/Footer";
import Nav from "../../mainComponents/Navigation";

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

const SharesList = () => {
  const [shares, setShares] = useState([]);
  let [lastDate, setLastDate] = useState("2022-10-03"); //data najstarsza na sztyno - w razie błędu będzie zawsze działać
  //no chyba ze juz z bazy zostanie usuniete
  let [dataChange, setDataChange] = useState("");
  const [notFounderr, setNotFounderr] = useState("");
  const errRef = useRef();

  useEffect(() => {
    fetchLastDate().then((lastDate) => fetchShares(lastDate));
  }, [lastDate]);

  useEffect(() => {
    fetchLastDate().then((lastDate) => fetchShares(lastDate));
  }, [lastDate]);

  useEffect(() => {
    setNotFounderr("");
  }, [dataChange]);


  async function fetchLastDate() {
    let url = "http://localhost:3001/api/shares/update-time";
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

  async function fetchShares(lastDate) {
    //console.log(lastDate);
    let url = "http://localhost:3001/api/shares/effectiveDate/" + lastDate;
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data.shares);
        setShares(response.data.shares);
        if (!response.data.shares.length)
          setNotFounderr(
            "Takiej daty nie ma w bazie danych lub została źle wpisana"
          );
        else {
          setNotFounderr("");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 404)
          setNotFounderr(
            "Takiej daty nie ma w bazie danych lub została źle wpisana"
          );
        //alert(error);
      });
  }

  const currenciesData = useMemo(() => [...shares], [shares]);

  const currenciesColumns = useMemo(
    () =>
      shares[0]
        ? Object.keys(shares[0])
            .filter((key) => key !== "_id" && key !== "slug" && key !== "__v")
            .map((key) => {
              return { Header: key, accessor: key };
            })
        : [],
    [shares]
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
      <Nav />
      <h3 className="CurrenciesTitle">Kursy walut</h3>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <div className="DataChanger">
        <p className="CurrenciesDate">Najmłodsza data: {lastDate}</p>
        <input
          className="DataInput"
          placeholder="YYYY-MM-DD"
          onChange={(e) => {
            setDataChange(e.target.value);
          }}
        ></input>
        <button
          className="DataChangeButton"
          onClick={(e) => {
            fetchShares(dataChange);
          }}
        >
          Wyszukaj datę
        </button>
      </div>

      <Table className="tabele" {...getTableProps()}>
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
        <p ref={errRef} className={notFounderr ? "notFounderr" : "offscreen"}>
          {notFounderr}
        </p>
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
      <Footer />
    </>
  );
};

export default SharesList;
