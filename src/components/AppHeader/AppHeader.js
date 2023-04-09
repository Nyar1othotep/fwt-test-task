import logo from "../../resources/img/logo.png";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import Spinner from "../Spinner/Spinner";

const AppHeader = () => {
   return (
      <header className="app-header">
         <div className="app-header__container _container">
            <div className="app-header__body">
               <div className="app-header__logo">
                  <a href="https://framework.team/">
                     <img
                        src={logo}
                        alt="the FWT logo with a link to their website"
                     />
                  </a>
               </div>

               <Spinner width="50" height="50" />

               <ToggleTheme className="app-header__theme" />
            </div>
         </div>
      </header>
   );
};

export default AppHeader;
