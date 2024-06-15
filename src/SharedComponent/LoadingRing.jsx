import { ProgressBar} from "react-loader-spinner";
import AuthenticationGIF from "./Animation/Robo-Animation";
import animation from '../assets/q5l1JeND6c.json'


const LoadingRing = () => {
    return (
        <div className=' flex flex-col justify-center items-center py-10'>

            <div className='pr-10'>
                <ProgressBar
                    visible={true}
                    height="90"
                    width="80"
                    color="#c22ed0"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{color:'black'}}
                    wrapperClass=""
                />
            </div>
            <div className=" w-4/12 m-auto">
                <AuthenticationGIF animation={animation}></AuthenticationGIF>
            </div>

        </div>
    );
};

export default LoadingRing;