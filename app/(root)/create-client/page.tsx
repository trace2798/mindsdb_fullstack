"use client";

import { useEffect } from "react";

import { useClientModal } from "@/hooks/use-client-modal";

const SetupPage = () => {
  const onOpen = useClientModal((state) => state.onOpen);
  const isOpen = useClientModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
