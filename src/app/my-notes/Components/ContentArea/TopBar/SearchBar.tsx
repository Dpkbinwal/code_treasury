import { SearchOutlined } from "@mui/icons-material";
import React from "react";
import { useGlobalContext } from "@/ContextApi";
import { v4 as uuidv4 } from 'uuid';


const SearchBar = () => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  // Determine color classes based on dark mode selection
  const bgColor = darkMode[0].isSelected ? "bg-gray-700" : "bg-slate-100";
  const textColor = darkMode[0].isSelected ? "text-white" : "text-slate-500";

  return (
    <div
      className={`relative pl-3 w-[50%] h-[38px] ${bgColor} rounded-3xl flex items-center gap-2`}
    >
      <SearchOutlined className={textColor} />
      <input
        placeholder="Search a code........"
        className={`w-[70%] outline-none text-sm ${bgColor} ${textColor}`}
      />
      <Btn />
    </div>
  );
};

function Btn() {
  return (
    <div className="absolute right-3 flex gap-2 rounded-3xl px-4 bg-purple-600 text-white items-center cursor-pointer select-none ">
      <AddNewSnippet />
    </div>
  );
}
export default SearchBar;

function AddNewSnippet() {
  const {
    openContentObject: { openContentNote, setOpenContentNote },
    allNotesObject: { allNotes, setAllNotes },
    selectedNoteContent: { selectedNote, setSelectedNote },
    isNewNoteObject:{isNewNote,setIsNewNote}
  } = useGlobalContext();

  const addNewSnippet = () => {
    const newSampleSnippet = {
      id: uuidv4(),
      code: "",
      title: "",
      description: "",
      tags: [],
      language: "",
      isFavorite: false,
      creationDate: new Date().toISOString().slice(0, 10),
    };
    setOpenContentNote(true);
    setSelectedNote(newSampleSnippet);
    setIsNewNote(true);
  };

  return (
    <div className="absolute flex gap-1 px-2 rounded-3xl max-md:px-1 bg-purple-600 p-1 text-[13px] text-white right-[6px] items-center cursor-pointer select-none">
      <div className="font-bold">+</div>
      <div className="max-md:hidden" onClick={addNewSnippet}>
        snippet
      </div>
    </div>
  );
}
