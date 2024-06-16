import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LoadingRing from '../../SharedComponent/LoadingRing';
import useAxios from '../../CustomHocks/useAxios';

const PaintingDetails = () => {
    const axiosSecure = useAxios();
    const { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get(`/painting/${id}`);
                setData(response.data);
            } catch (err) {
                setError('Failed to fetch painting details');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [axiosSecure, id]);

    if (loading) {
        return <div><LoadingRing></LoadingRing></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className=" py-3 ">
                <h1 className=" px-2 text-start  text-3xl font-bold border-l-4 border-amber-600">Painting Details</h1>
            </div>
            <h1 className=' text-2xl font-semibold my-7'>{data.title}</h1>
            <img src={data.display_url} alt={data.title} />
            <p>{data.description}</p>
        </div>
    );
};

export default PaintingDetails;
