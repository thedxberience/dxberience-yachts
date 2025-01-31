import React from "react";
import Image from "next/image";

const StarRatings = ({ star }) => {
  return (
    <div className="star-ratings flex gap-[9px] justify-start items-center">
      {Array(5)
        .fill()
        .map((_, i) =>
          i < star ? (
            <Image
              src="/star_filled.svg"
              alt="star"
              width={24}
              height={24}
              key={i}
            />
          ) : (
            <Image src="/star.svg" alt="star" width={24} height={24} key={i} />
          )
        )}
    </div>
  );
};

export default StarRatings;
