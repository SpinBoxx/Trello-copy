"use client";

import CardModal from "@/components/modals/card-modal/card-modal";
import ProModal from "@/components/modals/pro-modal/pro-modal";

const ModalProvider = () => {
  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};

export default ModalProvider;
