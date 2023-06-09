import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Default = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Default;
