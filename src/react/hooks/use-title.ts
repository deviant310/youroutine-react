import { useEffect } from "react";

const initialTitle = document.title;

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `${initialTitle} | ${title}`;
  }, [title]);
};
