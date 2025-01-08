import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useGlobalContext } from "@/ContextApi";
import { FreeMode } from "swiper/modules";
import { AddOutlined } from "@mui/icons-material";

export default function SwiperSelection() {
  const {
    darkModeObject: { darkMode },
    allTagsObject: { allTags },
  } = useGlobalContext();
  const [currentTag, setCurrentTag] = useState("All");

  return (
    <div
      className={`${
        !darkMode[1].isSelected ? "bg-slate-800 text-white " : "bg-white"
      } p-3 rounded-lg flex gap-5`}
    >
      <div className="overflow-x-auto w-full">
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode={true}
          className="mySwiper"
          modules={[FreeMode]}
        >

          <div className="w-[80vw]">
            {allTags.map((tag) => {
              return (
                <SwiperSlide
                  key={tag.id} // Use the unique ID of the tag as the key
                  onClick={() => setCurrentTag(tag.name)} // Attach click handler directly to SwiperSlide
                  className={`w-20 ${
                    currentTag === tag.name
                      ? "bg-purple-600 p-1 rounded-md text-white"
                      : "text-slate-400"
                  }`}
                >
                  {tag.name}
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
      <button className="bg-purple-600 p-1 rounded-md px-3 flex gap-1 items-center text-white">
        <AddOutlined sx={{ fontSize: 18 }} />
        <span>Tag</span>
      </button>

      {/* Add your custom controls here */}
    </div>
  );
}
