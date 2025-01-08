import { SingleNoteType, SingleTagType } from "@/app/Types";
import { useGlobalContext } from "@/ContextApi";
import {
  DeleteOutlineRounded,
  DeleteRounded,
  FavoriteBorderOutlined,
  Javascript,
  Message,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  materialLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import Modal from "../../ReusableComp/Modal";
import { Button } from "@mui/material";

const AllNotesSection = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const {
    allNotesObject: { allNotes },
    openContentObject: { openContentNote },
  } = useGlobalContext();

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },1000)
  },[])

  return (
    <div className="mt-5 flex h-[68vh]">
      <div
        className={`flex  ${
          openContentNote ? "!flex-col" : "flex-wrap"
        } gap-4 h-full overflow-y-scroll w-full p-4`}
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none" /* For Firefox */,
          msOverflowStyle: "none" /* For IE 10+ */,
        }}
      >
        {loading ? (
          <>
            <SingleNoteLoader />
            <SingleNoteLoader />
            <SingleNoteLoader />
            <SingleNoteLoader />
          </>
        ) : allNotes && allNotes.length === 0 ? (
          <div className="text-black mx-auto font-bold text-2xl">No Any Notes..........</div>
        ) : (
          allNotes.map((note, index) => (
            <div key={index}>
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
      } max-md:w-full 
       ${openContentNote ? "!w-full" : "w-[350px]"}  rounded-md py-3 `}
    >
      <NoteHeader
        title={note.title}
        favorite={note.isFavorite}
        allData={note}
      />
      <NoteDate date={note.creationDate} />
      <NoteTags tags={note.tags} />
      <NoteDescription desc={note.description} />
      <CodeBlock language={note.language} code={note.code} />
      <NoteFooter codeLang={note.language} id={note.id} />
    </div>
  );
}

function NoteHeader({
  title,
  favorite,
  allData,
}: {
  title: string;
  favorite: boolean;
  allData: SingleNoteType;
}) {
  const {
    openContentObject: { openContentNote, setOpenContentNote },
    selectedNoteContent: { setSelectedNote },
  } = useGlobalContext();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setOpenContentNote(true);
    setIsClicked(true);
    setSelectedNote(allData);

    // Optionally reset the effect after a delay
    setTimeout(() => setIsClicked(false), 1000);
  };

  return (
    <div className="flex justify-between mx-4">
      <span
        className={`font-bold w-[87%] cursor-pointer ${
          isClicked ? "text-purple-600" : ""
        } hover:text-purple-600`}
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
function NoteTags({ tags }: { tags: SingleTagType[] }) {
  return (
    <div className="text-slate-500 text-[11px] mx-4 flex-wrap flex gap-1 mt-4">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`bg-purple-100 text-purple-600 p-1 rounded-md px-2 ${
            index === tags.length - 1 ? "" : "mr-1"
          }`}
        >
          {tag.name}
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

function NoteFooter({ id,codeLang }: { id: string,codeLang:string }) {
  const {
    allNotesObject: { allNotes, setAllNotes },
    darkModeObject:{darkMode}
  } = useGlobalContext();

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleDeleteNote = () => {
    // Add your delete note logic here
    setOpenDeleteModal(false);

    const updatedNotes = allNotes.filter((note) => note.id !== id);
    setAllNotes(updatedNotes);
  };

  return (
    <div className="flex justify-between text-[13px] mx-4 mt-3 ">
      <div className={` ${darkMode[1].isSelected ? 'text-black':'text-slate-400'} flex gap-2 items-center`}>
        <Javascript sx={{ fontSize: 17 }} />
        {codeLang}
      </div>
      <DeleteOutlineRounded
        sx={{ fontSize: 17 }}
        className="cursor-pointer"
        onClick={() => setOpenDeleteModal(true)}
      />
      <Modal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        maxWidth={350}
      >
        <div className="mt-6 space-y-3">
          <hr />
          <div className="text-black  mb-5 text-[16px] text-center font-semibold px-10">
            Are You Sure You want to Delete Note?
          </div>
          <hr />
          <div className="float-right space-x-3">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteNote}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
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
