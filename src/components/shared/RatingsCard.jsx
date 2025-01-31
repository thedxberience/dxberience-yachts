import React from "react";
import StarRatings from "./StarRatings";

const RatingsCard = ({ star, ratingAuthor, ratingDescription }) => {
  return (
    <div className="bg-primary rating-card p-5 max-w-full h-full lg:w-full">
      <div className="flex flex-col justify-start items-center gap-3 h-[300px] lg:h-full border-gray-300 border p-4">
        <StarRatings star={star} />
        <div className="rating-info h-full flex flex-col justify-between items-center text-white">
          <p className="text-center text-sm font-semibold">
            {ratingDescription}
          </p>
          <p className="rating-name text-lg font-sacramento">{ratingAuthor}</p>
        </div>
      </div>
    </div>
  );
};

export default RatingsCard;
