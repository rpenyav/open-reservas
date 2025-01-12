import { HTMLAttributes } from "react";
import "./TypingLoader.css";

interface Props {
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export const TypingLoader = ({ className }: Props) => {
  return (
    <div className={`typing ${className}`}>
      <span className="circle scaling"></span>
      <span className="circle scaling"></span>
      <span className="circle scaling"></span>
    </div>
  );
};
