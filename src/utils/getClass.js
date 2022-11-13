export const getClass = (classes) => {
  return classes
    .filter((item) => item !== "")
    .join(" ")
    .trim();
};
