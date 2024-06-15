import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'; // ES6
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useUser from "../CustomHocks/useUser";
import LoadingRing from "../SharedComponent/LoadingRing";



const PrivetRouter = ({ children }) => {
    const { user, loading } = useUser();
    const location = useLocation()

 

    if (loading) {

        return <LoadingRing></LoadingRing>
    }
    if (user) {
        return ( <> {children} </>) }

    if ( !user) {
        toast.info('Login required, please login first');
    }

    return (

        <>

            <ToastContainer></ToastContainer>
            <Navigate state={location.pathname} to={'/login'}></Navigate>

        </>
    )

};

export default PrivetRouter;
PrivetRouter.propTypes = {
    children: PropTypes.node.isRequired,
}