"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen p-24">
        <h1 className="text-5xl font-bold lg:text-8xl text-primary">
          Experimenting with{" "}
          <span className="text-transparent bg-gradient-to-r bg-clip-text from-yellow-500 via-purple-500 to-red-500 animate-text">
            MindsDB
          </span>
        </h1>
        <h2 className="mt-5 text-xl lg:text-3xl text-slate-500">
          Trying to integrate MindsDB with Next.Js
        </h2>
        <h2 className="mt-5 text-xl lg:text-3xl text-slate-500">
          This is also my submission for{" "}
          <a
            href="https://mindsdb.com/hackerminds-ai-app-challenge"
            target="_blank"
          >
            {" "}
            MindsDB HackerMinds AI App Challenge
          </a>{" "}
          hosted by MindDB
        </h2>
        <Link href="/dashboard">
          <Button className="mt-5">Get Stated</Button>
        </Link>
      </main>
    </>
  );
};

export default page;
