import { ReactNode } from "react";
import OrgControl from "./_components/org-control";

interface Props {
  children: ReactNode;
}

const OrganizationLayout = ({ children }: Props) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationLayout;
