"use client";

import { StripeRedirectAction } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useProModalStore } from "@/stores/use-pro-modal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: Props) => {
  const router = useRouter();
  const proModal = useProModalStore();
  const { execute, isLoading } = useAction(StripeRedirectAction, {
    onSuccess: (data) => {
      router.push(data.redirectUrl);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };
  return (
    <Button variant="primary" onClick={onClick} disabled={isLoading}>
      {isPro ? <span>Manage subscription</span> : <span>Upgrade to pro</span>}
    </Button>
  );
};

export default SubscriptionButton;
