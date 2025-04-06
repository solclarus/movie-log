"use client";

import { Star } from "lucide-react";
import { useState } from "react";

type RatingProps = {
  value: number;
  onChange: (value: number) => void;
  max: number;
  id?: string;
};

export function Rating({ value, onChange, max = 5, id }: RatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="flex" id={id}>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= (hoverValue || value);

        return (
          <Star
            key={i}
            className={`h-6 w-6 cursor-pointer ${
              isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(0)}
            onClick={() => onChange(starValue)}
          />
        );
      })}
    </div>
  );
}
