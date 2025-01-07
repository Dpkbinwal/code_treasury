import { SingleNoteType, SingleTagType } from "@/app/Types";
import { useGlobalContext } from "@/ContextApi";
import {
  BookOutlined,
  CloseRounded,
  CodeOutlined,
  ContentCopyOutlined,
  EditOutlined,
  JavascriptOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
  SearchOutlined,
  StyleOutlined,
  TitleOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { v4 as uuidv4 } from "uuid";
import { allLanguages } from "@/localData/Languages";

const ContentNote = () => {
  const {
    openContentObject: { openContentNote, setOpenContentNote },
    mobileView: { isMobile },
    selectedNoteContent: { selectedNote, setSelectedNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
    allNotesObject: { allNotes, setAllNotes },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const [singleNote, setSingleNote] = useState<SingleNoteType | null>(null);

  useEffect(() => {
    if (openContentNote) {
      if (selectedNote) setSingleNote(selectedNote);
    }
  }, [openContentNote, selectedNote]);

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

        ${
          !darkMode[1].isSelected
            ? "bg-slate-800 text-white"
            : "bg-white  text-slate-400"
        }

        ${isMobile ? "w-4/5" : "w-1/2"}
        z-50 p-3 rounded-lg 
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
        <div className="">
          <ContentNoteHeader
            singleNote={singleNote}
            setSingleNote={setSingleNote}
            darkMode={darkMode}
          />
          <ContentTags
            singleNote={singleNote}
            setSingleNote={setSingleNote}
            darkMode={darkMode}
          />
          <Description
            singleNote={singleNote}
            setSingleNote={setSingleNote}
            darkMode={darkMode}
          />
          <CodeBlock
            singleNote={singleNote}
            setSingleNote={setSingleNote}
            darkMode={darkMode}
          />
        </div>
      )}
    </div>
  );
};

const ContentNoteHeader = ({
  singleNote,
  setSingleNote,
  darkMode,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
  darkMode: { [key: number]: { isSelected: boolean } };
}) => {
  const {
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [hover, setHover] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  const onUpdateTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSingleNote = { ...singleNote, title: event.target.value }; // Create new object
    setSingleNote(newSingleNote);

    const newAllNotes = allNotes.map((note) => {
      if (note.id === singleNote.id) {
        return newSingleNote; // Replace with updated note
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
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        ref={textareaRef}
        placeholder="New Title..."
        value={singleNote.title}
        onChange={onUpdateTitle}
        onKeyDown={handleKeyDown}
        className={` ${
          !darkMode[1].isSelected
            ? "bg-slate-800 text-white"
            : "bg-white  text-slate-400"
        }
 font-bold text-xl outline-none resize-none h-auto overflow-hidden w-full text-black`}
      />
    </div>
  );
};

function ContentTags({
  singleNote,
  setSingleNote,
  darkMode,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
  darkMode: { [key: number]: { isSelected: boolean } };
}) {
  const [hover, setHover] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const {
    allNotesObject: { allNotes, setAllNotes },
    selectedTagsObject: { selectedTags, setSelectedTags },
  } = useGlobalContext();

  useEffect(() => {
    if (isOpened) {
      setHover(true);
    }
  }, [isOpened]);

  function onClickTag(tag: SingleTagType) {
    if (selectedTags.some((t) => t.name === tag.name)) {
      setSelectedTags(selectedTags.filter((t) => t.name !== tag.name)); // Fix: Correct filter logic
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  useEffect(() => {
    const newSingleNote = { ...singleNote, tags: selectedTags };
    const newAllNotes = allNotes.map((note) => {
      if (note.id === singleNote.id) return newSingleNote;
      return note;
    });
    setAllNotes(newAllNotes);
    setSingleNote(newSingleNote);
  }, [selectedTags]);

  return (
    <div className="flex text-[13px] items-center gap-2">
      <StyleOutlined
        sx={{ fontSize: 19 }}
        className={`${
          hover ? "text-purple-600" : "text-slate-400"
        } mr-3 mt-1 cursor-pointer`}
      />
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          if (!isOpened) setHover(false);
        }}
        className="relative"
      >
        <div
          className={`flex gap-2 items-center flex-wrap  ${
            !darkMode[1].isSelected
              ? "bg-slate-800 text-white"
              : "bg-white  text-slate-400"
          } `}
        >
          {singleNote.tags.length === 0 ? (
            <div
              className={`bg-purple-100 text-purple-600 p-1 rounded-md px-2 `}
            >
              Add Tag
            </div>
          ) : (
            singleNote.tags.map((tag, index) => (
              <span
                key={index}
                className={`bg-purple-100 text-purple-600 p-1 rounded-md px-2 ${
                  index === singleNote.tags.length - 1 ? "" : "mr-1"
                }`}
              >
                {tag.name}
              </span>
            ))
          )}
          {hover && (
            <EditOutlined
              sx={{ fontSize: 19 }}
              className="text-purple-600 cursor-pointer"
              onClick={() => {
                setIsOpened(!isOpened);
              }}
            />
          )}
        </div>
        {isOpened && <TagsMenu onClickTag={onClickTag} />}
      </div>
    </div>
  );
}

const TagsMenu = ({
  onClickTag,
}: {
  onClickTag: (tag: SingleTagType) => void;
}) => {
  const {
    allTagsObject: { allTags },
    selectedTagsObject: { selectedTags, setSelectedTags },
  } = useGlobalContext();

  return (
    <ul className="absolute z-50 h-[200px] overflow-y-scroll custom-scrollbar right-0 top-10 bg-slate-100 border p-3 rounded-md flex flex-col gap-3">
      {allTags.map((tag, ind) => (
        <li
          key={tag.id}
          onClick={() => onClickTag(tag)}
          className={`p-1 px-2 select-none cursor-pointer hover:bg-slate-300 text-slate-500 rounded-md transition-all 
            ${
              selectedTags.some(
                (t) =>
                  t.name.toLocaleLowerCase() === tag.name.toLocaleLowerCase()
              )
                ? "bg-slate-300"
                : ""
            }
            `}
        >
          {tag.name}
        </li>
      ))}
    </ul>
  );
};

const Description = ({
  singleNote,
  setSingleNote,
  darkMode,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
  darkMode: { [key: number]: { isSelected: boolean } };
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const {
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const onUpdateDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Handle description change here
    const newSingleNote = { ...singleNote, description: e.target.value };
    setSingleNote(newSingleNote);

    const newAllNotes = allNotes.map((note) => {
      if (note.id === singleNote.id) return newSingleNote;
      return note;
    });
    setAllNotes(newAllNotes);
  };

  return (
    <div className="flex text-[13px] items-center gap-2 mt-4">
      <BookOutlined
        sx={{ fontSize: 19 }}
        className={`${
          hover ? "text-purple-600" : "text-slate-400"
        } mr-3 mt-1 cursor-pointer`}
      />
      <textarea
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        placeholder="New Description..."
        value={singleNote.description}
        onChange={onUpdateDesc}
        className={`bg-white text-slate-400 outline-none h-auto overflow-hidden w-full rounded-xl pt-2 pl-2 mr-5 
          ${hover ? "border-2 border-main-500" : "border-2"}
          `}
      />
    </div>
  );
};

function CodeBlock({
  singleNote,
  setSingleNote,
  darkMode,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
  darkMode: { [key: number]: { isSelected: boolean } };
}) {
  // Render code block here
  const [code, setCode] = useState(singleNote.code);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(singleNote.language);
  const menuRef = useRef<HTMLDivElement>(null);
  const {
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("Code copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy code: ", error);
      });
  };

  const onUpdateCode = (code: string) => {
    const newSingleNote = { ...singleNote, code };
    setCode(code);
    setSingleNote(newSingleNote);

    const newAllNotes = allNotes.map((note) => {
      if (note.id === singleNote.id) return newSingleNote;
      return note;
    });
    setAllNotes(newAllNotes);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    };

    if (isOpened) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpened]);

  return (
    <div className=" mt-4 flex gap-2 text-[12px] text-slate-400">
      <CodeOutlined
        sx={{ fontSize: 19 }}
        className={`${
          isHovered ? "text-main-500" : "text-slate-400"
        } mr-3 mt-1 cursor-pointer`}
      />
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${
          isHovered ? "text-main-500" : "text-slate-400"
        } w-full mr-4 relative border rounded-xl p-3 pt-14`}
      >
        <div className="absolute top-4 right-4 z-10">
          <IconButton onClick={handleCopyCode}>
            <ContentCopyOutlined sx={{ fontSize: 19 }} />
          </IconButton>
        </div>
        {/* language dropdown */}
        <div
          className={`flex gap-3 justify-between bg-slate-100 p-[6px] px-3 rounded-md items-center mt-3 absolute top-1 left-3 cursor-pointer`}
          onClick={() => {
            setIsOpened(!isOpened);
          }}
        >
          <div className=" flex gap-3 items-center">
            <JavascriptOutlined
              sx={{ fontSize: 18 }}
              className="text-slate-400"
            />
            <span className="mt-[2px]">{selectedLanguage}</span>
          </div>
          {isOpened ? (
            <KeyboardArrowUpOutlined sx={{ fontSize: 18 }} />
          ) : (
            <KeyboardArrowDownOutlined sx={{ fontSize: 18 }} />
          )}
        </div>
        {isOpened && (
          <div ref={menuRef}>
            <LanguageMenu
              isOpened={isOpened}
              setSelectedLanguage={setSelectedLanguage}
            />
          </div>
        )}
        <AceEditor
          placeholder="Placeholder Text"
          mode="javascript"
          theme="tomorrow"
          name="blah2"
          // onLoad={this.onLoad}
          onChange={onUpdateCode}
          fontSize={14}
          lineHeight={19}
          width="100%"
          height="300px"
          showPrintMargin={false}
          showGutter={false}
          highlightActiveLine={false}
          value={code}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            enableMobileMenu: true,
            showLineNumbers: false,
            tabSize: 2,
          }}
          className="overflow-hidden"
        />
      </div>
    </div>
  );
}

function LanguageMenu({
  isOpened,
  setSelectedLanguage,
}: {
  isOpened: boolean;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const textRef = useRef<HTMLInputElement>(null);

  const [allLang, setAllLang] =
    useState<{ id: string; name: string; icon: any }[]>(allLanguages);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllLang(
      allLanguages.filter((lang) =>
        lang.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    textRef.current?.focus();
  }, [isOpened]);

  return (
    <div
      className={`absolute flex flex-col gap-2 p-3 w-[200px] rounded-md bg-slate-100 z-40 text-slate-400`}
    >
      <div className={`p-1 rounded-md gap-1 flex mb-1`}>
        <SearchOutlined />
        <input
          ref={textRef}
          placeholder="Search...."
          className="bg-transparent outline-none"
          onChange={onChange}
        />
      </div>
      <div className="h-[150px] overflow-y-scroll custom-scrollbar">
        {allLang.map((lang) => (
          <div
            key={lang.id}
            className={`p-1 mb-2 cursor-pointer hover:bg-slate-300 transition-all ${
              lang.id === "currentLanguageId" ? "bg-slate-300" : ""
            }`}
            onClick={()=>setSelectedLanguage(lang.name)}
          >
            {lang.icon}
            <span>{lang.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentNote;
