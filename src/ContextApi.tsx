"use client";

import {
  DeleteOutlineOutlined,
  FavoriteBorder,
  LogoutOutlined,
} from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import React, { createContext, useContext, useEffect, useState } from "react";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import { darkModeMenu, SideBarMenu, SingleNoteType } from "./app/Types";

interface GlobalContextType {
  sideBarMenuObject: {
    sideBarMenu: SideBarMenu[];
    setSideBarMenu: React.Dispatch<React.SetStateAction<SideBarMenu[]>>;
  };
  darkModeObject: {
    darkMode: darkModeMenu[];
    setDarkMode: React.Dispatch<React.SetStateAction<darkModeMenu[]>>;
  };
  openSideBarObject: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  openContentObject :{
    openContentNote : boolean;
    setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>;
  };
  mobileView:{
    isMobile:boolean;
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  },
  allNotesObject:{
    allNotes:SingleNoteType[],
    setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>;
  },
  selectedNoteContent:{
    selectedNote: SingleNoteType | null;
    setSelectedNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
  },
  isNewNoteObject:{
    isNewNote: boolean,
    setIsNewNote:React.Dispatch<React.SetStateAction<boolean>>;
  }
}


const ContextProvider = createContext<GlobalContextType>({
  sideBarMenuObject: {
    sideBarMenu: [],
    setSideBarMenu: () => {},
  },
  darkModeObject: {
    darkMode: [],
    setDarkMode: () => {},
  },
  openSideBarObject: {
    isOpen: false,
    setIsOpen: () => {},
  },
  openContentObject:{
    openContentNote: false,
    setOpenContentNote: ()=>{}
  },
  mobileView:{
    isMobile:false,
    setIsMobile: ()=>{}
  },
  allNotesObject:{
    allNotes:[],
    setAllNotes: ()=>{}
  },
  selectedNoteContent:{
    selectedNote: null,
    setSelectedNote : ()=>{}
  },
  isNewNoteObject:{
    isNewNote: false,
    setIsNewNote: ()=>{}
  }
});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideBarMenu, setSideBarMenu] = useState<SideBarMenu[]>([
    {
      id: 1,
      name: "All Code",
      isSelected: true,
      icons: <BorderAllIcon sx={{ fontSize: 18 }} />,
    },
    {
      id: 2,
      name: "Favourite",
      isSelected: false,
      icons: <FavoriteBorder sx={{ fontSize: 18 }} />,
    },
    {
      id: 3,
      name: "Trash",
      isSelected: false,
      icons: <DeleteOutlineOutlined sx={{ fontSize: 18 }} />,
    },
    {
      id: 4,
      name: "Logout ",
      isSelected: false,
      icons: <LogoutOutlined sx={{ fontSize: 18 }} />,
    },
  ]);

  const [darkMode, setDarkMode] = useState<darkModeMenu[]>([
    {
      id: 1,
      icon: <DarkModeIcon sx={{ fontSize: 18 }} />,
      isSelected: false,
    },
    {
      id: 2,
      icon: <LightModeIcon sx={{ fontSize: 18 }} />,
      isSelected: true,
    },
  ]);
  const [isOpen, setIsOpen] = useState(true);
  const [openContentNote, setOpenContentNote] = useState(false);
  const [isMobile,setIsMobile] = useState(false);
  const [allNotes, setAllNotes] = useState<SingleNoteType[]>([]);
  const [selectedNote,setSelectedNote] = useState<SingleNoteType|null>(null)
  const [isNewNote,setIsNewNote] = useState<boolean>(false)

  const handleResize = ()=>{
    setIsMobile(window.innerWidth<=640);
  }

  useEffect(()=>{
    handleResize();

    window.addEventListener('resize',handleResize);
    return ()=>{
      window.removeEventListener('resize',handleResize);
    }

  },[])


  useEffect(()=>{
     const dummyNotes: SingleNoteType[] = [
      {
        id: "1",
        title: "Introduction to React",
        isFavorite: true,
        tags: ["React", "JavaScript", "Frontend"],
        description: "A beginner's guide to understanding the basics of React.",
        code: `function HelloWorld() {
      return <h1>Hello, world!</h1>;
    }`,
        language: "JavaScript",
        creationDate: "2024-12-01",
      },
      {
        id: "2",
        title: "Understanding GraphQL",
        isFavorite: false,
        tags: ["GraphQL", "API", "Backend"],
        description: "Learn how to fetch and manipulate data using GraphQL.",
        code: `query GetUser {
      user(id: "1") {
        name
        email
      }
    }`,
        language: "GraphQL",
        creationDate: "2024-11-15",
      },
      {
        id: "3",
        title: "Python Basics",
        isFavorite: true,
        tags: ["Python", "Programming", "Backend"],
        description: "Covers Python's syntax, loops, and functions.",
        code: `def greet(name):
        return f"Hello, {name}!"`,
        language: "Python",
        creationDate: "2024-10-10",
      },
      {
        id: "4",
        title: "Sorting Algorithms in C++",
        isFavorite: false,
        tags: ["C++", "Algorithms", "Sorting"],
        description: "An overview of common sorting algorithms in C++.",
        code: `void bubbleSort(int arr[], int n) {
        for (int i = 0; i < n - 1; i++)
            for (int j = 0; j < n - i - 1; j++)
                if (arr[j] > arr[j + 1])
                    swap(arr[j], arr[j + 1]);
    }`,
        language: "C++",
        creationDate: "2024-08-22",
      },
      {
        id: "5",
        title: "Understanding CSS Flexbox",
        isFavorite: true,
        tags: ["CSS", "Flexbox", "Frontend"],
        description: "A detailed guide to mastering CSS Flexbox for layouts.",
        code: `.container {
      display: flex;
      justify-content: center;
      align-items: center;
    }`,
        language: "CSS",
        creationDate: "2024-06-30",
      },
    ];
    
    //simulate
    setTimeout(()=>{
      setAllNotes(dummyNotes)
    },1000)
  },[])

  return (
    <ContextProvider.Provider
      value={{
        sideBarMenuObject: { sideBarMenu, setSideBarMenu },
        darkModeObject: { darkMode, setDarkMode },
        openSideBarObject: { isOpen, setIsOpen },
        openContentObject:{
          openContentNote,
          setOpenContentNote,
        },
        mobileView:{
          isMobile,
          setIsMobile,
        },
        allNotesObject:{
          allNotes,
          setAllNotes,
        },
        selectedNoteContent:{
          selectedNote,
          setSelectedNote,
        },
        isNewNoteObject:{
          isNewNote,
          setIsNewNote,
        }
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

// Custom hook to use global context
export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
