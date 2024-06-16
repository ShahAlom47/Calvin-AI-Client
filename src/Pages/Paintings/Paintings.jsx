import { useEffect, useState } from "react";
import useAxios from "../../CustomHocks/useAxios";
import LoadingRing from "../../SharedComponent/LoadingRing";


const Paintings = () => {
    const axiosSecure = useAxios()
    const [paintings, setPaintings] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get(`/painting`);
                setPaintings(response.data);
            } catch (err) {
                setError('Failed to fetch painting details');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [axiosSecure]);


    return (
        <div>
            <div className=" py-3 ">
                <h1 className=" px-2 my-5 text-start  text-3xl font-bold border-l-4 border-amber-600">Paintings</h1>
            </div>
            {
                loading ? <LoadingRing></LoadingRing> :
                    <div className=" grid grid-cols-3 gap-3">
                        {
                            paintings?.map((data, idx) => <div className=" p-4 border-2 " key={idx}>
                                <h1 className=' text-2xl font-semibold my-7'>{data.title}</h1>
                                <img className=" " src={data.display_url} alt={data.title} />
                                <p>{data.description}</p>

                            </div>)
                        }

                    </div>}
            Paintings
        </div>
    );
};

export default Paintings;