"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FC } from "react";

interface analyzeButtonProps {}

const AnalyzeButton: FC<analyzeButtonProps> = ({}) => {
  return (
    <>
      <Button>Analyze Feedback</Button>
    </>
  );
};

export default AnalyzeButton;
