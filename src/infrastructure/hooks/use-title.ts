import { useEffect } from "react";

const initialTitle = document.title;

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${initialTitle} | ${title}`;
  }, [title]);
};
