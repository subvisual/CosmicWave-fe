import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Default = ({ children }: Props) => {
  return <div className="bg-slate-300 h-full w-full">{children}</div>;
};

export default Default;
