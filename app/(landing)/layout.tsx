import { ReactNode } from "react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

interface Props {
  children: ReactNode;
}

const LandingLayout = ({ children }: Props) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="h-full bg-slate-200 pb-20 pt-40">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
