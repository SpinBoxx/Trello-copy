import { auth } from "@clerk/nextjs";

interface Props {
  params: {
    organizationId: string;
  };
}

const OrganizationPage = ({ params }: Props) => {
  const { userId, orgId } = auth();
  return <div>Test</div>;
};

export default OrganizationPage;
