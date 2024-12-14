const emojiMap: Record<string, string> = {
  ":)": "😊",
  ":(": "☹️",
  ":D": "😄",
  ";)": "😉",
  ":P": "😛",
  "<3": "❤️",
  ":/": "😕",
  ":o": "😮",
  ":'(": "😢",
  XD: "😂",
  ":|": "😐",
  "B)": "😎",
  ":*": "😘",
  "<\\3": "💔",
  ":@": "😡",
  "O:)": "😇",
  ":$": "😳",
  ":^)": "😊",
  ":-/": "😕",
  ":-D": "😄",
  ":-P": "😛",
  ":-*": "😘",
  ":`(": "😭",
  ">:(": "😠",
  ">:O": "😲",
};

export const replaceTextEmojis = (text: string): string => {
  const escapeRegex = (str: string) =>
    str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"); // Escape special regex characters
  const regex = new RegExp(
    Object.keys(emojiMap).map(escapeRegex).join("|"),
    "g"
  );
  return text.replace(regex, (match) => emojiMap[match] || match);
};
