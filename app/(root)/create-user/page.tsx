"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { useUserModal } from "@/hooks/use-user-modal";

const SetupPage = () => {
  const onOpen = useUserModal((state) => state.onOpen);
  const isOpen = useUserModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
