import { SingleNoteType } from "@/app/Types";
import { useGlobalContext } from "@/ContextApi";
import {
  DeleteRounded,
  FavoriteBorderOutlined,
  Javascript,
} from "@mui/icons-material";
import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  materialLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const AllNotesSection = () => {
  const {
    allNotesObject: { allNotes },
  } = useGlobalContext();
  console.log(allNotes);

  return (
    <div className="mt-5 flex h-[68vh]">
      <div
        className="flex flex-wrap gap-4 h-full overflow-y-scroll w-full p-4"
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none" /* For Firefox */,
          msOverflowStyle: "none" /* For IE 10+ */,
        }}
      >
        {allNotes && allNotes.length == 0 ? (
          <>
            <SingleNoteLoader />
            <SingleNoteLoader />
            <SingleNoteLoader />
            <SingleNoteLoader />
          </>
        ) : (
          allNotes.map((note, index) => (
            <div key={index} className="w-[350px]">
              <SingleNote note={note} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllNotesSection;

function SingleNote({ note }: { note: SingleNoteType }) {
  const {
    darkModeObject: { darkMode },
    openContentObject: { openContentNote },
  } = useGlobalContext();

  return (
    <div
      key={note.id}
      className={`${
        !darkMode[1].isSelected
          ? "bg-slate-800 text-white"
          : "bg-white text-slate-400"
      } max-md:w-full ${
        openContentNote ? "w-full" : "w-[350px]"
      }  rounded-md py-3 `}
    >
      <NoteHeader title={note.title} favorite={note.isFavorite} />
      <NoteDate date={note.creationDate} />
      <NoteTags tags={note.tags} />
      <NoteDescription desc={note.description} />
      <CodeBlock language={note.language} code={note.code} />
      <NoteFooter />
    </div>
  );
}

function NoteHeader({ title, favorite }: { title: string; favorite: boolean }) {
  const {
    openContentObject: { openContentNote, setOpenContentNote },
  } = useGlobalContext();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setOpenContentNote(true);
    setIsClicked(true);

    // Optionally reset the effect after a delay
    setTimeout(() => setIsClicked(false), 1000);
  };

  return (
    <div className="flex justify-between mx-4">
      <span
        className={`font-bold w-[87%] cursor-pointer ${
          isClicked ? "text-purple-600" : ""
        }`}
        onClick={handleClick}
      >
        {title}
      </span>

      <FavoriteBorderOutlined
        className={`${
          favorite ? "text-red-600" : "text-slate-400"
        }    cursor-pointer`}
      />
    </div>
  );
}
function NoteDate({ date }: { date: string }) {
  return (
    <div className="text-slate-500 text-[11px] flex gap-1 font-light mx-4 mt-1">
      <span className="">{date}</span>
    </div>
  );
}
function NoteDescription({ desc }: { desc: string }) {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    <div
      className={`${
        !darkMode[1].isSelected ? "text-slate-300" : ""
      } text-slate-500 text-[12px] mt-4 mx-4`}
    >
      {desc}
    </div>
  );
}
function NoteTags({ tags }: { tags: string[] }) {
  return (
    <div className="text-slate-500 text-[11px] mx-4 flex-wrap flex gap-1 mt-4">
      <span className="bg-purple-100 text-purple-600 p-1 rounded-md px-2">
        JavaScript
      </span>
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`bg-purple-100 text-purple-600 p-1 rounded-md px-2 ${
            index === tags.length - 1 ? "" : "mr-1"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
function CodeBlock({ language, code }: { language: string; code: string }) {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div className={`rounded-md overflow-hidden text-[14px] mt-4 mx-4`}>
      <SyntaxHighlighter
        language={language || "javascript"}
        style={!darkMode[1].isSelected ? oneDark : docco}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function NoteFooter() {
  return (
    <div className="flex justify-between text-[13px] text-slate-500 mx-4 mt-3">
      <div className="flex gap-2 items-center">
        <Javascript sx={{ fontSize: 17 }} />
        JavaScript
      </div>
      <DeleteRounded sx={{ fontSize: 17 }} className="cursor-pointer" />
    </div>
  );
}

function SingleNoteLoader() {
  const {
    darkModeObject: { darkMode },
    openContentObject: { openContentNote },
  } = useGlobalContext();
  return (
    <>
      <div
        className={`animate-pulse ${
          !darkMode[1].isSelected ? "bg-slate-300" : "bg-gray-200"
        } rounded-md py-3 max-md:w-full ${
          openContentNote ? "w-full" : "w-[350px]"
        }`}
      >
        <div className="h-6 bg-slate-300 rounded mx-4 mb-4"></div>
        <div className="h-4 bg-slate-300 rounded mx-4 mb-2"></div>
        <div className="flex flex-wrap gap-2 mx-4 mt-4">
          <div className="h-5 w-16 bg-purple-200 rounded"></div>
          <div className="h-5 w-20 bg-purple-200 rounded"></div>
          <div className="h-5 w-12 bg-purple-200 rounded"></div>
        </div>
        <div className="h-16 bg-slate-300 rounded mx-4 mt-4"></div>
        <div className="h-5 w-24 bg-slate-300 rounded mx-4 mt-3"></div>
      </div>
    </>
  );
}
