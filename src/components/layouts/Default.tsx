import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Default = ({ children }: Props) => {
  return <div className="bg-black h-full w-full">{children}</div>;
};

export default Default;
