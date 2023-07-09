export const kebabToCamel = (str: string) =>
  str
    .split("-")
    .map((a, b) =>
      [...a]
        .map((c, d) => (d === 0 && b !== 0 ? c.toUpperCase() : c.toLowerCase()))
        .join("")
    )
    .join("");

export const kebabToPascal = (str: string) =>
  str
    .split("-")
    .map(a =>
      [...a]
        .map((b, c) => (c === 0 ? b.toUpperCase() : b.toLowerCase()))
        .join("")
    )
    .join("");

export const kebabToConstant = (str: string) =>
  [...str].map(s => (s === " " || s == "-" ? "_" : s.toUpperCase())).join("");

export const toLower = (str: string) =>
  [...str].filter(s => s !== "-" && s !== " ").join("");

export const kebabToSnake = (str: string) => str.replace(/-/g, "_");

export const snakeToKebab = (str: string) => str.replace(/_/g, "-");

export const forceKebab = (str: string) => snakeToKebab(str.toLowerCase());
