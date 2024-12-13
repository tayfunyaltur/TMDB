import "./index.scss";
import { ReactNode } from "react";
import { TableProps } from "../type";

const Table = <T,>({ data, columns, onEntityClick }: TableProps<T>) => {
  return (
    <table className="display_table">
      <thead>
        <tr>
          {columns.map((_col, index) => (
            <th key={`head-${index}`}>
              {(_col.header as string) ?? (_col.accessor as string)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((datum, index) => (
          <tr
            key={`row-${index}`}
            className={onEntityClick && "pointer"}
            onClick={(e) => {
              if (onEntityClick) {
                e.stopPropagation();
                onEntityClick(datum);
              }
            }}
          >
            {columns.map((column, _index) => (
              <td
                key={`col-${_index}`}
                className={column.onClick && "pointer"}
                onClick={(e) => {
                  if (column.onClick) {
                    e.stopPropagation();
                  }
                }}
              >
                {!!column.render
                  ? column.render(datum)
                  : (datum[column.accessor] as ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
