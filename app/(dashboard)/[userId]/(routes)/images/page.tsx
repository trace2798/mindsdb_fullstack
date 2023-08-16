import { FC } from "react";
import ImageForm from "./components/image-form";

interface ImagePage {}

const ImagePage = async ({ params }: { params: { billboardId: string } }) => {
  return (
    <>
      <div>Image page</div>
      <ImageForm />
    </>
  );
};

export default ImagePage;
