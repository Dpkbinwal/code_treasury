"use client";

import {
  DeleteOutlineOutlined,
  FavoriteBorder,
  LogoutOutlined,
} from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { v4 as uuidv4 } from "uuid";
import React, { createContext, useContext, useEffect, useState } from "react";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import {
  darkModeMenu,
  SideBarMenu,
  SingleNoteType,
  SingleTagType,
} from "./app/Types";
import { AllTags } from "./localData/Languages";

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
  openContentObject: {
    openContentNote: boolean;
    setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>;
  };
  mobileView: {
    isMobile: boolean;
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allNotesObject: {
    allNotes: SingleNoteType[];
    setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>;
  };
  selectedNoteContent: {
    selectedNote: SingleNoteType | null;
    setSelectedNote: React.Dispatch<
      React.SetStateAction<SingleNoteType | null>
    >;
  };
  isNewNoteObject: {
    isNewNote: boolean;
    setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allTagsObject: {
    allTags: SingleTagType[];
    setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>;
  };
  selectedTagsObject: {
    selectedTags: SingleTagType[];
    setSelectedTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>;
  };
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
  openContentObject: {
    openContentNote: false,
    setOpenContentNote: () => {},
  },
  mobileView: {
    isMobile: false,
    setIsMobile: () => {},
  },
  allNotesObject: {
    allNotes: [],
    setAllNotes: () => {},
  },
  selectedNoteContent: {
    selectedNote: null,
    setSelectedNote: () => {},
  },
  isNewNoteObject: {
    isNewNote: false,
    setIsNewNote: () => {},
  },
  allTagsObject: {
    allTags: [],
    setAllTags: () => {},
  },
  selectedTagsObject: {
    selectedTags: [],
    setSelectedTags: () => {},
  },
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
  const [isMobile, setIsMobile] = useState(false);
  const [allNotes, setAllNotes] = useState<SingleNoteType[]>([]);
  const [selectedNote, setSelectedNote] = useState<SingleNoteType | null>(null);
  const [isNewNote, setIsNewNote] = useState<boolean>(false);
  const [allTags, setAllTags] = useState<SingleTagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<SingleTagType[]>([]);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const dummyNotes: SingleNoteType[] = [
      {
        id: uuidv4(),
        title: "Introduction to React",
        isFavorite: true,
        tags: [{ id: "1", name: "SQL" }],
        description: "A beginner's guide to understanding the basics of React.",
        code: `function HelloWorld() {
          return <h1>Hello, world!</h1>;
        }`,
        language: "JavaScript",
        creationDate: "2024-12-01",
      },
      {
        id: uuidv4(),
        title: "Python Data Analysis",
        isFavorite: false,
        tags: [{ id: "1", name: "SQL" }],
        description: "A simple script to analyze data using pandas.",
        code: `import pandas as pd
    data = pd.read_csv('data.csv')
    print(data.head())`,
        language: "Python",
        creationDate: "2024-11-25",
      },
      {
        id: uuidv4(),
        title: "Sorting in C++",
        isFavorite: true,
        tags: [{ id: "1", name: "SQL" }],
        description:
          "An example of sorting an array using the STL sort function.",
        code: `#include <iostream>
    #include <algorithm>
    using namespace std;
    
    int main() {
      int arr[] = {3, 1, 4, 1, 5};
      sort(arr, arr + 5);
      for (int x : arr) cout << x << " ";
      return 0;
    }`,
        language: "C++",
        creationDate: "2024-12-05",
      },
      {
        id: uuidv4(),
        title: "HTML Boilerplate",
        isFavorite: false,
        tags: [{ id: "1", name: "SQL" }],
        description: "A basic HTML template to kickstart your project.",
        code: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <h1>Hello, World!</h1>
    </body>
    </html>`,
        language: "HTML",
        creationDate: "2024-12-10",
      },
      {
        id: uuidv4(),
        title: "Express.js API Example",
        isFavorite: true,
        tags: [{ id: "1", name: "SQL" }],
        description: "A simple Express.js server with one route.",
        code: `const express = require('express');
    const app = express();
    
    app.get('/', (req, res) => {
      res.send('Hello, World!');
    });
    
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });`,
        language: "JavaScript",
        creationDate: "2024-12-15",
      },
      {
        id: uuidv4(),
        title: "SQL Query Basics",
        isFavorite: false,
        tags: [{ id: "1", name: "SQL" }],
        description: "A query to fetch all users from a database.",
        code: `SELECT * FROM users WHERE is_active = 1;`,
        language: "SQL",
        creationDate: "2024-11-30",
      },
      {
        id: uuidv4(),
        title: "Java Hello World",
        isFavorite: true,
        tags: [{ id: "1", name: "SQL" }],
        description: "A simple Java program to print 'Hello, World!'.",
        code: `public class HelloWorld {
      public static void main(String[] args) {
        System.out.println("Hello, World!");
      }
    }`,
        language: "Java",
        creationDate: "2024-12-08",
      },
      {
        id: uuidv4(),
        title: "CSS Flexbox Example",
        isFavorite: false,
        tags: [{ id: "1", name: "SQL" }],
        description: "An example of a flexbox layout.",
        code: `.container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    
    .box {
      width: 100px;
      height: 100px;
      background-color: skyblue;
    }`,
        language: "CSS",
        creationDate: "2024-12-12",
      },
      {
        id: uuidv4(),
        title: "Kotlin Coroutines",
        isFavorite: true,
        tags: [{ id: "1", name: "SQL" }],
        description: "An example of using coroutines in Kotlin.",
        code: `import kotlinx.coroutines.*
    
    fun main() = runBlocking {
        launch {
            delay(1000L)
            println("World!")
        }
        println("Hello,")
    }`,
        language: "Kotlin",
        creationDate: "2024-12-07",
      },
      {
        id: uuidv4(),
        title: "Rust Hello World",
        isFavorite: false,
        tags: [{ id: "1", name: "SQL" }],
        description: "A simple Rust program to print 'Hello, World!'.",
        code: `fn main() {
        println!("Hello, World!");
    }`,
        language: "Rust",
        creationDate: "2024-12-20",
      },
    ];

    //simulate
    setTimeout(() => {
      setAllNotes(dummyNotes);
    }, 1000);

    const updateAllTags = () => {
      setAllTags(AllTags);
    };
    updateAllTags();
  }, []);

  useEffect(() => {
    setSelectedTags(selectedNote?.tags || []);
  }, [selectedNote]);

  return (
    <ContextProvider.Provider
      value={{
        sideBarMenuObject: { sideBarMenu, setSideBarMenu },
        darkModeObject: { darkMode, setDarkMode },
        openSideBarObject: { isOpen, setIsOpen },
        openContentObject: {
          openContentNote,
          setOpenContentNote,
        },
        mobileView: {
          isMobile,
          setIsMobile,
        },
        allNotesObject: {
          allNotes,
          setAllNotes,
        },
        selectedNoteContent: {
          selectedNote,
          setSelectedNote,
        },
        isNewNoteObject: {
          isNewNote,
          setIsNewNote,
        },
        allTagsObject: {
          allTags,
          setAllTags,
        },
        selectedTagsObject: {
          selectedTags,
          setSelectedTags,
        },
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
