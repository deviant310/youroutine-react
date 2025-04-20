import { useEffect } from "react";

const initialTitle = document.title;

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${initialTitle} | ${title}`;
  }, [title]);
}
