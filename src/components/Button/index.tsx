import "./index.scss";
import { PropsWithChildren } from "react";

interface ButtonProps {
  type?: "primary" | "secondary" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: (e: React.MouseEvent) => void;
}

const Button = ({
  type,
  size,
  children,
  onClick,
}: PropsWithChildren<ButtonProps>) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!!onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`button button-${type || "primary"} button-${size || "xs"}`}
    >
      {children}
    </button>
  );
};

export default Button;
