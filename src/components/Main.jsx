import "../assets/css/style.css";
// import "../assets/css/leaf.css";

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