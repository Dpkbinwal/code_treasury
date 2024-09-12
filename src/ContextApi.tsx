"use client";

import {
  BorderAll,
  DeleteOutlineOutlined,
  FavoriteBorder,
  LogoutOutlined,
} from "@mui/icons-material";
import React, { createContext, useContext, useState } from "react";
import BorderAllIcon from "@mui/icons-material/BorderAll"

interface GlobalContextType {
  sideBarMenuObject: {
    sideBarMenu: SideBarMenu[];
    setSideBarMenu: React.Dispatch<React.SetStateAction<SideBarMenu[]>>;
  };
}

interface SideBarMenu {
  id: number;
  name: string;
  isSelected: boolean;
  icons: React.ReactNode;
}

const ContextProvider = createContext<GlobalContextType>({
  sideBarMenuObject: {
    sideBarMenu: [],
    setSideBarMenu: () => {},
  },
});


export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideBarMenu, setSideBarMenu] = useState<SideBarMenu[]>([
    { id: 1, name: "All Code", isSelected: true, icons: <BorderAllIcon sx={{ fontSize: 18 }} /> },
    { id: 2, name: "Favourite", isSelected: false, icons:  <FavoriteBorder sx={{ fontSize: 18 }} /> },
    { id: 3, name: "Trash", isSelected: false, icons: <DeleteOutlineOutlined sx={{ fontSize: 18 }} /> },
    {id:4, name:"Logout ",isSelected:false, icons: <LogoutOutlined sx={{ fontSize: 18 }} /> }
  ]);

  return (
    <ContextProvider.Provider
      value={{ sideBarMenuObject: { sideBarMenu, setSideBarMenu } }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

// Custom hook to use global context
export  const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
