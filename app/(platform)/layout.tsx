import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PlatformLayout = ({ children }: Props) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default PlatformLayout;
