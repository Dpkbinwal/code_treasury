export interface SideBarMenu {
    id: number;
    name: string;
    isSelected: boolean;
    icons: React.ReactNode;
  }
  
export interface darkModeMenu {
    id: number;
    icon: React.ReactNode;
    isSelected: boolean;
}

export interface SingleNoteType {
    id:string;
    title:string;
    isFavorite:boolean;
    tags:SingleTagType[];
    description:string;
    code:string;
    language:string;
    creationDate:string;
}

// Modal Component
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    showCrossIcon?: boolean;
    maxWidth?: number;
  }
  
export interface SingleTagType {
  id:string;
  name:string;
} 