"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

interface Props {
  isPro: boolean;
}

export const OrgInfo = ({ isPro }: Props) => {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) return <OrgInfo.Skeleton />;
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-16 w-16">
        <Image
          fill
          src={organization?.imageUrl!}
          alt="Organization image"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="text-xl font-semibold">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground ">
          <CreditCard className="mr-1 h-4 w-4" /> {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};

OrgInfo.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-16 w-16">
        <Skeleton className="absolute h-full w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <div className="flex items-center">
          <Skeleton className="mr-2 h-4 w-4" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  );
};
