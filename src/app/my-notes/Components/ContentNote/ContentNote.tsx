import { useGlobalContext } from "@/ContextApi";
import React, { useState } from "react";

const ContentNote = () => {
  const {
    openContentObject: { openContentNote, setOpenContentNote },
    mobileView: { isMobile },
  } = useGlobalContext();
  return (
    <div
      className={`border w-1/2 bg-white p-3 rounded-lg text-black ${
        openContentNote ? "block" : "hidden"
      } ${isMobile ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2":""}`}
    >
      Content Note
      <div className="cursor-pointer" onClick={() => setOpenContentNote(false)}>
        close
      </div>
    </div>
  );
};

export default ContentNote;
