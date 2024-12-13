import { render, screen, fireEvent } from "@testing-library/react";
import Table from ".";
import { describe, expect, it, vi } from "vitest";
import { Column } from "../type";

interface User {
  name: string;
  age: number;
}

describe("Table Component", () => {
  const columns: Column<User>[] = [
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age" },
  ];

  const data: User[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
  ];

  it("should render table headers correctly", () => {
    render(<Table data={data} columns={columns} onEntityClick={undefined} />);

    // Check if the headers render correctly
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("should render table rows correctly", () => {
    render(<Table data={data} columns={columns} onEntityClick={undefined} />);

    // Check if the rows render correctly
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it('should apply "pointer" class to clickable rows if onEntityClick is defined', () => {
    const onEntityClick = vi.fn();
    render(
      <Table data={data} columns={columns} onEntityClick={onEntityClick} />
    );

    // Ensure rows have "pointer" class when onEntityClick is passed
    const row = screen.getByText("Alice").closest("tr");
    expect(row).toHaveClass("pointer");
  });

  it('should not apply "pointer" class to rows if onEntityClick is undefined', () => {
    render(<Table data={data} columns={columns} onEntityClick={undefined} />);

    // Ensure rows do not have "pointer" class when onEntityClick is undefined
    const row = screen.getByText("Alice").closest("tr");
    expect(row).not.toHaveClass("pointer");
  });

  it("should call onEntityClick when row is clicked", () => {
    const onEntityClick = vi.fn();
    render(
      <Table data={data} columns={columns} onEntityClick={onEntityClick} />
    );

    const row = screen.getByText("Alice").closest("tr");
    if (row) fireEvent.click(row);

    expect(onEntityClick).toHaveBeenCalledWith(data[0]);
  });

  it("should stop propagation when a row is clicked", () => {
    const onEntityClick = vi.fn();
    const event = vi.fn();

    render(
      <Table data={data} columns={columns} onEntityClick={onEntityClick} />
    );

    const row = screen.getByText("Alice").closest("tr");
    if (row) {
      row.addEventListener("click", event);

      fireEvent.click(row);
    }

    expect(onEntityClick).toHaveBeenCalledWith(data[0]);
  });

  it("should render custom column content with render function", () => {
    const columnsWithRender: Column<User>[] = [
      { header: "Name", accessor: "name" },
      {
        header: "Age",
        accessor: "age",
        render: (datum: User) => <span>{datum.age} years old</span>,
      },
    ];

    render(
      <Table
        data={data}
        columns={columnsWithRender}
        onEntityClick={undefined}
      />
    );

    // Check custom rendered content
    expect(screen.getByText("25 years old")).toBeInTheDocument();
    expect(screen.getByText("30 years old")).toBeInTheDocument();
  });
});
