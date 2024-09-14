import "../assets/css/style.css";
import "leaflet/dist/leaflet.css";

import { Route, Routes } from "react-router-dom";
import HomeCheck from "./HomeCheck";

const Main = () => {
    return ( 
        <Routes>
            <Route path="/" element={<HomeCheck/>} />
        </Routes>
     );
}
 
export default Main;
