export const getRootElement = () => {
  const rootElement = document.getElementById("root");

  if (!rootElement) throw new Error("react root element is missing");

  return rootElement;
};
