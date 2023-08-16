"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface HeadingProps {
  title: string;
  description: string;
  buttonTitle?: string;
}

export const Heading = ({ title, description, buttonTitle }: HeadingProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="flex flex-col mt-5 mb-8 text-left md:items-center md:justify-between md:flex-row gap-x-3">
        <div>
          <h2 className="text-3xl font-bold text-primary">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button className="mt-5 w-fit md:mt-0" onClick={() => router.push(`${pathname}/history`)}>
          {buttonTitle}
        </Button>
      </div>
    </>
  );
};
