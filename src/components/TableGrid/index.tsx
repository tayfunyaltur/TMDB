import { Fragment, useState } from "react";
import "./index.scss";
import { TableGridProps } from "./type";
import Table from "./Table";
import {
  CgChevronDoubleLeft,
  CgChevronDoubleRight,
  CgChevronLeft,
  CgChevronRight,
} from "react-icons/cg";

const TableGrid = <T,>({
  data,
  columns,
  cardRenderer,
  isSeachable,
  searchKey,
  onSearch,
  isPaginated,
  page,
  pageCount,
  onPageChange,
  onEntityClick,
}: TableGridProps<T>) => {
  const [displayType, setDisplayType] = useState<"grid" | "table">("grid");
  const toggleDisplayType = () =>
    displayType === "grid" ? setDisplayType("table") : setDisplayType("grid");
  return (
    <Fragment>
      <div className="table_header">
        <div
          className="table_display_toggle"
          onClick={toggleDisplayType}
          data-testid="switch-button"
        >
          <div
            className={`indexer ${displayType === "table" && "indexer-right"}`}
            data-testid="switch-indexer"
          />
          <div>Grid</div>
          <div>Table</div>
        </div>
        {isSeachable && (
          <input
            value={searchKey || ""}
            onChange={(e) => {
              !!onSearch && onSearch(e.target.value);
            }}
          ></input>
        )}
        {isPaginated && (
          <div className="pagination">
            <CgChevronDoubleLeft
              onClick={() => onPageChange && onPageChange(1)}
            />
            <CgChevronLeft
              data-testid="prev-page-button"
              onClick={() =>
                onPageChange && page && page > 1 && onPageChange(page - 1)
              }
            />
            {page || 1} / {pageCount || 1}
            <CgChevronRight
              data-testid="next-page-button"
              onClick={() =>
                onPageChange &&
                page &&
                page < (pageCount || 1) &&
                onPageChange(page + 1)
              }
            />
            <CgChevronDoubleRight
              onClick={() => onPageChange && onPageChange(pageCount || 1)}
            />
          </div>
        )}
      </div>
      <Fragment>
        {displayType === "grid" && (
          <div className="table_grid">
            {data.map((datum: T) => cardRenderer(datum))}
          </div>
        )}
      </Fragment>
      <Fragment>
        {displayType === "table" && (
          <Table<T>
            data={data}
            columns={columns}
            onEntityClick={onEntityClick}
          />
        )}
      </Fragment>
    </Fragment>
  );
};

export default TableGrid;
