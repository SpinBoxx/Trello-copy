"use client";

import { StripeRedirectAction } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import { useProModalStore } from "@/stores/use-pro-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ProModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useProModalStore();
  const { execute, isLoading } = useAction(StripeRedirectAction, {
    onSuccess: (data) => {
      router.push(data.redirectUrl);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="relative flex aspect-video items-center justify-center">
          <Image
            alt="Hero logo"
            src={"/hero.svg"}
            className="object-cover"
            fill
          />
        </div>
        <div className="mx-auto space-y-6 p-6 text-neutral-800">
          <h2 className="text-xl font-semibold">
            Upgrade to Taskify Pro Today
          </h2>
          <p className="text-sm font-semibold text-neutral-600">
            Explore the best of Taskify
          </p>
          <div className="pl-3">
            <ul className="list-disc text-sm">
              <li>Unlimited boards</li>
              <li className="text-neutral-500">Advanced checklists</li>
              <li className="text-neutral-500">Admin and security features</li>
              <li className="text-neutral-500">And more !</li>
            </ul>
          </div>
          <Button
            disabled={isLoading}
            onClick={onClick}
            className="w-full"
            variant="primary"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
