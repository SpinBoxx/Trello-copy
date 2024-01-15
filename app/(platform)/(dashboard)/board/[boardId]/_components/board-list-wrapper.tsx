import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const BoardListWrapper = ({ children }: Props) => {
  return <li className="h-full w-72 shrink-0 select-none">{children}</li>;
};

export default BoardListWrapper;
