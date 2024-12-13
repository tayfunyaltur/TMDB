import { render, screen, fireEvent } from "@testing-library/react";
import TableGrid from ".";
import { describe, expect, it, vi } from "vitest";
import { Column } from "./type";

interface User {
  name: string;
  age: number;
}

describe("TableGrid Component", () => {
  const data: User[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
  ];

  const columns: Column<User>[] = [
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age" },
  ];

  const cardRenderer = (datum: User) => (
    <div key={datum.name} className="card">
      <p>{datum.name}</p>
      <p>{datum.age}</p>
    </div>
  );

  const onSearch = vi.fn();
  const onPageChange = vi.fn();
  const onEntityClick = vi.fn();

  it("should toggle between grid and table views", () => {
    render(
      <TableGrid
        data={data}
        columns={columns}
        cardRenderer={cardRenderer}
        isSeachable={false}
        searchKey=""
        onSearch={undefined}
        isPaginated={false}
        page={1}
        pageCount={1}
        onPageChange={undefined}
        onEntityClick={undefined}
      />
    );

    // Initially in grid view
    expect(screen.getByTestId("switch-indexer")).not.toHaveClass(
      "indexer-right"
    );

    // Toggle to table view
    fireEvent.click(screen.getByTestId("switch-button"));
    expect(screen.getByTestId("switch-indexer")).toHaveClass("indexer-right");
  });

  it("should render the grid correctly", () => {
    render(
      <TableGrid
        data={data}
        columns={columns}
        cardRenderer={cardRenderer}
        isSeachable={false}
        searchKey=""
        onSearch={undefined}
        isPaginated={false}
        page={1}
        pageCount={1}
        onPageChange={undefined}
        onEntityClick={undefined}
      />
    );

    // Check if grid is rendered
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("should render the table correctly", () => {
    render(
      <TableGrid
        data={data}
        columns={columns}
        cardRenderer={cardRenderer}
        isSeachable={false}
        searchKey=""
        onSearch={undefined}
        isPaginated={false}
        page={1}
        pageCount={1}
        onPageChange={undefined}
        onEntityClick={undefined}
      />
    );

    // Toggle to table view
    fireEvent.click(screen.getByText("Grid"));

    // Ensure table is rendered
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("should call onSearch when input is changed", () => {
    render(
      <TableGrid
        data={data}
        columns={columns}
        cardRenderer={cardRenderer}
        isSeachable={true}
        searchKey=""
        onSearch={onSearch}
        isPaginated={false}
        page={1}
        pageCount={1}
        onPageChange={undefined}
        onEntityClick={undefined}
      />
    );

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "Alice" } });

    expect(onSearch).toHaveBeenCalledWith("Alice");
  });

  it("should render pagination controls and handle page change", () => {
    render(
      <TableGrid
        data={data}
        columns={columns}
        cardRenderer={cardRenderer}
        isSeachable={false}
        searchKey=""
        onSearch={undefined}
        isPaginated={true}
        page={2}
        pageCount={3}
        onPageChange={onPageChange}
        onEntityClick={undefined}
      />
    );

    // Ensure pagination buttons are rendered
    expect(screen.getByText("2 / 3")).toBeInTheDocument();

    const nextPageButton = screen.getByTestId("next-page-button");
    fireEvent.click(nextPageButton);
    expect(onPageChange).toHaveBeenCalledWith(3);

    const prevPageButton = screen.getByTestId("prev-page-button");
    fireEvent.click(prevPageButton);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("should call onEntityClick when a row is clicked in table", () => {
    render(
      <TableGrid
        data={data}
        columns={columns}
        cardRenderer={cardRenderer}
        isSeachable={false}
        searchKey=""
        onSearch={undefined}
        isPaginated={false}
        page={1}
        pageCount={1}
        onPageChange={undefined}
        onEntityClick={onEntityClick}
      />
    );

    // Toggle to table view
    fireEvent.click(screen.getByText("Grid"));

    // Click on a row in the table
    fireEvent.click(screen.getByText("Alice"));

    expect(onEntityClick).toHaveBeenCalledWith(data[0]);
  });

  it("should call onEntityClick when a card is clicked in grid", () => {
    render(
      <TableGrid
        data={data}
        columns={columns}
        cardRenderer={cardRenderer}
        isSeachable={false}
        searchKey=""
        onSearch={undefined}
        isPaginated={false}
        page={1}
        pageCount={1}
        onPageChange={undefined}
        onEntityClick={onEntityClick}
      />
    );

    // Check if grid is rendered first
    expect(screen.getByText("Alice")).toBeInTheDocument();

    // Click on a card in the grid
    fireEvent.click(screen.getByText("Alice"));

    expect(onEntityClick).toHaveBeenCalledWith(data[0]);
  });
});
