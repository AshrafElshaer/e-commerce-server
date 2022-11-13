const characters: string = "0123456789";
// ABCDEFGHIJKLMNOPQRSTUVWXYZ

export const generateId = (length: number = 6): number => {
  let result = "";
  for (let i = 0; i < length; i++) {
    i < 2
      ? (result += characters.charAt(
          Math.floor(Math.random() * (characters.length - 1))
        ))
      : (result += characters.charAt(
          Math.floor(Math.random() * (characters.length - 1))
        ));
  }

  return Number(result);
};
