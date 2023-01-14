import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import tw from "twin.macro";

const SearchContainer = tw.div`
  mb-3
  mt-3
  flex
  items-center
`;

const SearchText = tw.h2`
  text-xl
  mr-6
`;

const Input = tw.input`
  h-8
`;

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <SearchContainer>
      <SearchText className="SearchText">Wyszukaj:</SearchText>
      <Input className="FilterInput"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </SearchContainer>
  );
}