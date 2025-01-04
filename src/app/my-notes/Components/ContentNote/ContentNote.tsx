import { SingleNoteType } from "@/app/Types";
import { useGlobalContext } from "@/ContextApi";
import {
  CloseRounded,
  DeleteForeverOutlined,
  EditOutlined,
  StyleOutlined,
  TitleOutlined,
} from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

const ContentNote = () => {
  const {
    openContentObject: { openContentNote, setOpenContentNote },
    mobileView: { isMobile },
    selectedNoteContent: { selectedNote, setSelectedNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const [singleNote, setSingleNote] = useState<SingleNoteType | null>(null);

  useEffect(() => {
    if (openContentNote) {
      if (selectedNote) setSingleNote(selectedNote);
    }
  }, [openContentNote, selectedNote]);
  console.log(isNewNote,'isnew note')

  useEffect(() => {
    if (isNewNote) {
      if (singleNote && singleNote.title !== "") {
        setAllNotes([...allNotes, singleNote]);
        setIsNewNote(false);
      }
    }
  }, [singleNote]);

  return (
    <div
      className={`border 
        ${isMobile ? "w-4/5" : "w-1/2"}
        z-50 bg-white p-3 rounded-lg text-black 
        ${openContentNote ? "block" : "hidden"} ${
        isMobile
          ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          : ""
      }`}
    >
      <CloseRounded
        className="float-right mr-3 mt-3 cursor-pointer "
        sx={{ fontSize: 24 }}
        onClick={() => {
          setOpenContentNote(false);
          setSelectedNote(null);
          setIsNewNote(false);
        }}
      />
      {singleNote && (
        <>
          <ContentNoteHeader
            singleNote={singleNote}
            setSingleNote={setSingleNote}
          />
          <ContentTags singleNote={singleNote} setSingleNote={setSingleNote} />
        </>
      )}
    </div>
  );
};

const ContentNoteHeader = ({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
}) => {
  const {
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [hover, setHover] = useState<boolean>(false);

  const onUpdateTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //create new singleNote

    const newSingleNote = { ...singleNote, title: event.target.value };
    setSingleNote(newSingleNote);

    //updating the allnote with new singlenote
    const newAllNotes = allNotes.map((note) => {
      if (note.id === singleNote.id) {
        return newSingleNote;
      }
      return note;
    });
    setAllNotes(newAllNotes);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="mt-3 flex">
      <TitleOutlined
        sx={{ fontSize: 21 }}
        className={`${hover ? "text-purple-600" : "text-slate-400"} mr-3 mt-1`}
      />
      <textarea
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        ref={textareaRef}
        placeholder="New Title..."
        value={singleNote.title}
        onChange={onUpdateTitle}
        onKeyDown={handleKeyDown}
        className="font-bold text-xl outline-none resize-none h-auto overflow-hidden w-full text-black"
      />
    </div>
  );
};

function ContentTags({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
}) {
  const [hover, setHover] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const {
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const onUpdateTag = () => {
    const newTag = prompt("Enter a new tag:");
    if (newTag) {
      const newTagName = {
        ...singleNote,
        tags: [...singleNote.tags, newTag],
      };
      setSingleNote(newTagName);

      //updating the allnote with new singlenote
      const newAllNotes = allNotes.map((note) => {
        if (note.id === singleNote.id) {
          return newTagName;
        }
        return note;
      });
      setAllNotes(newAllNotes);
    }
  };

  const handleDeleteTag = (tag:string)=>{
    const updatedTags = singleNote.tags.filter((prevTag, index) => prevTag!== tag);
    const newSingleNote = {...singleNote, tags: updatedTags };
    setSingleNote(newSingleNote);
    //updating the allnote with new singlenote
    const newAllNotes = allNotes.map((note) => {
      if (note.id === singleNote.id) {
        return newSingleNote;
      }
      return note;
    });
    setAllNotes(newAllNotes);
  }

  return (
    <div className="flex text-[13px] items-center gap-2 bg-primary-1000">
      <StyleOutlined
        sx={{ fontSize: 19 }}
        className={`${
          hover ? "text-purple-600" : "text-slate-400"
        } mr-3 mt-1 cursor-pointer`}
      />
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className=""
      >
        {singleNote.tags.map((tag, index) => (
          <span
            key={index}
            className={`bg-purple-100 text-purple-600 p-1 rounded-md px-2 ${
              index === singleNote.tags.length - 1 ? "" : "mr-1"
            }`}
          >
            {tag}
            <DeleteForeverOutlined
              onClick={()=>handleDeleteTag(tag)}
              className="ml-2 cursor-pointer"
              sx={{ fontSize: 13 }}
            />
          </span>
        ))}
      </div>
      {
        <button
          onClick={onUpdateTag}
          className="bg-purple-600 p-1 rounded-md px-3 flex gap-1 items-center text-white cursor-pointer"
        >
          <EditOutlined sx={{ fontSize: 18 }} />
        </button>
      }
    </div>
  );
}

export default ContentNote;
