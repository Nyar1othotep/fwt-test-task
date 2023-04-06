import logo from "../../resources/img/logo.png";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

const AppHeader = () => {
   return (
      <header className="app__header">
         <div className="app__logo">
            <a href="https://framework.team/">
               <img
                  src={logo}
                  alt="the FWT logo with a link to their website"
               />
            </a>
         </div>

         <ToggleTheme clazz="app_theme" />
      </header>
   );
};

export default AppHeader;
