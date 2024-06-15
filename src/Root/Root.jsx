import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponent/Navbar";


const Root = () => {
    return (
        <div className=" flex flex-col  ">
            <Navbar></Navbar>
            <Outlet></Outlet>

         
            
        </div>
    );
};

export default Root;