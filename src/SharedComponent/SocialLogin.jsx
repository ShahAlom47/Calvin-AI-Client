import { ImGoogle } from "react-icons/im";
import { IoLogoFacebook, IoLogoGithub } from "react-icons/io5";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../CustomHocks/useUser";
import useAxiosPublic from "../CustomHocks/useAxiosPublic";






const SocialLogin = () => {
    const { googleLogin, githubLogin } = useUser()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPublic = useAxiosPublic()



    const githubLoginHandel = () => {
        githubLogin()
            .then(() => {
                toast.success('Github login successfully ')
                setTimeout(() => { navigate(location.state ? location.state : '/') }, 1500)
            })
            .catch((error) => {
                toast.error(error.message)
            });
    }


    const googleLoginHandel = async () => {
        googleLogin()
            .then((res) => {
                const userInfo = { email: res.user?.email, name: res.user?.displayName, photoURL: res?.user?.photoURL }
                axiosPublic.post('/addUser', userInfo)
                    .then(res => {
                     
                        if (res.data.insertedId|| res.data.message==='user already exist') {
                            toast.success('login successfully ')

                            setTimeout(() => { navigate(location.state ? location.state : '/') }, 1500)

                        }
                        
                    })
                    .catch((error) => {
                        toast.error(error.message)
                    });
            })
            .catch((error) => {
                toast.error(error.message)
            });
    };

    return (
        <div className="  m-auto  flex  gap-3 mb-9 ">
            <ToastContainer/>
            <button onClick={googleLoginHandel} className="btn btn-outline bg-slate-300 px-2 rounded-full"> <ImGoogle className=" text-red-500  w-8 h-6" /> </button>
            <button onClick={githubLoginHandel} className="btn btn-outline bg-slate-300 px-2 rounded-full"> <IoLogoGithub className="  w-8 h-8" />   </button>
            <button className="btn btn-outline bg-slate-300 px-2 rounded-full"> <IoLogoFacebook className="  w-8 h-8" />   </button>
        </div>
    );
};

export default SocialLogin;