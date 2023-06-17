import { type ReactNode } from "react";
import Navbar from "../elements/Navbar";

interface Props {
  children: ReactNode;
}

const Default = ({ children }: Props) => {
  return (
    <div className="w-full h-full bg-[url('/cosmicwaves_background.png')] bg-cover relative">
      <Navbar />
      {children}
    </div>
  );
};

export default Default;
