import { isSubcriptionValid } from "@/services/subscription";
import { OrgInfo } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import SubscriptionButton from "./_components/subcription-button";

const BillingPage = async () => {
  const isPro = await isSubcriptionValid();

  return (
    <div className="w-full">
      <OrgInfo isPro={isPro} />
      <Separator className="my-2" />
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default BillingPage;
