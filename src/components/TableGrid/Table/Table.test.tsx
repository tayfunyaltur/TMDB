// Table.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./";
import { describe, expect, it, vi } from "vitest";
import { Column } from "../type";

describe("Table Component", () => {
  interface User {
    name: string;
    age: number;
  }

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age", onClick: vi.fn() },
  ] as Column<User>[];

  const data = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
  ];

  it("should display 'Loading' when isLoading is true", () => {
    render(
      <Table
        data={[]}
        columns={columns}
        onEntityClick={vi.fn()}
        isLoading={true}
      />
    );

    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("should display 'Data Bulunamadi' when data is empty", () => {
    render(
      <Table
        data={[]}
        columns={columns}
        onEntityClick={vi.fn()}
        isLoading={false}
      />
    );

    expect(screen.getByText("Data Bulunamadi")).toBeInTheDocument();
  });

  it("should render table rows when data is provided", () => {
    render(
      <Table
        data={data}
        columns={columns}
        onEntityClick={vi.fn()}
        isLoading={false}
      />
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  it("should call onEntityClick when a row is clicked", () => {
    const onEntityClick = vi.fn();
    render(
      <Table
        data={data}
        columns={columns}
        onEntityClick={onEntityClick}
        isLoading={false}
      />
    );

    fireEvent.click(screen.getByText("John"));
    expect(onEntityClick).toHaveBeenCalledWith(data[0]);
  });
});
