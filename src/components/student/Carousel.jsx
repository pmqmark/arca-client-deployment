import React from "react";
import { Carousel } from "@material-tailwind/react";

const Carousels = ({ banner }) => {
  return (
    <Carousel className="w-full rounded-xl h-[500px]">
      {banner.map((items,i) => (
        <img key={i} src={items?.imag} alt={`banner${items?.id}`} className="h-full w-full object-cover" />
      ))}
    </Carousel>
  );
};

export default Carousels;
