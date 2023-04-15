import { useState, useEffect } from "react";
import svg from "../../resources/svg/sprites.svg";

const themes = {
   dark: "dark",
   light: "light",
};

const getTheme = () => {
   const theme = `${window?.localStorage?.getItem("theme")}`;
   if (Object.values(themes).includes(theme)) return theme;

   const userMedia = window.matchMedia("(prefers-color-scheme: light)");
   if (userMedia.matches) return themes.light;

   return themes.dark;
};

const ToggleTheme = ({ className }) => {
   const [theme, setTheme] = useState(getTheme);

   useEffect(() => {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("theme", theme);
   }, [theme]);

   return (
      <div
         className={`${className} btn btn--theme ${theme}`}
         tabIndex={0}
         role="button"
         aria-label="switch theme"
         onClick={() => {
            theme === themes.dark
               ? setTheme((theme) => themes.light)
               : setTheme((theme) => themes.dark);
         }}
         onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
               theme === themes.dark
                  ? setTheme((theme) => themes.light)
                  : setTheme((theme) => themes.dark);
            }
         }}
      >
         <svg className="icon__theme">
            <use href={`${svg}#theme`}></use>
         </svg>
      </div>
   );
};

export default ToggleTheme;
