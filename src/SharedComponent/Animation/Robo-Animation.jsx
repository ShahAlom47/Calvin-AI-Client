import { useLottie } from "lottie-react";
import PropTypes from 'prop-types'; // ES6

const AuthenticationGIF = ({animation}) => {
    console.log(typeof animation);
    const options = {
        animationData: animation,
        loop: true
      };
    
      const { View } = useLottie(options);
    return (
        <div>
            {
                View
            }
        </div>
    );
};

export default AuthenticationGIF;
AuthenticationGIF.propTypes = {
    animation: PropTypes.object.isRequired,
}