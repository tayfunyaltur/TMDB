import Button from "./components/Button";
import "./styles/index.scss";

type _typeType = "primary" | "secondary" | "ghost";
type _sizeType = "xs" | "sm" | "md" | "lg" | "xl";

function App() {
  return (
    <main className="mainBg">
      {(["primary", "secondary", "ghost"] as Array<_typeType>).map((_type) => {
        return (
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            {(["xs", "sm", "md", "lg", "xl"] as Array<_sizeType>).map(
              (_size) => (
                <Button type={_type} size={_size}>{`${_type} ${_size}`}</Button>
              )
            )}
          </div>
        );
      })}
    </main>
  );
}

export default App;
