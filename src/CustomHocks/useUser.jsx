

import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";



const useUser = () => {
    const userInfo=useContext(AuthContext)
    return userInfo
};

export default useUser;