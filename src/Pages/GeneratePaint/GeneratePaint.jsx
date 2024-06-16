import { useState } from "react";
import animation from '../../assets/paint.json'
import AuthenticationGIF from "../../SharedComponent/Animation/Robo-Animation";
import Swal from "sweetalert2";
import useUser from "../../CustomHocks/useUser";
import useAxios from "../../CustomHocks/useAxios";
import { RotatingSquare } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";



const GeneratePaint = () => {
    // const [img,setImg]=useState('')
    const [loading, setLoading] = useState(false)
    const [activeCat, setActiveCat] = useState("");
    const [activeType, setActiveType] = useState("");
    const {user}=useUser()
    const axiosSecure= useAxios()
    const navigate = useNavigate()

    const painting_types = [
        "Oil Painting",
        "Watercolor Painting",
        "Acrylic Painting",
        "Pastel Painting",
        "Gouache Painting",
        "Encaustic Painting",
        "Fresco Painting",
        "Impasto Painting",
        "Miniature Painting",
        "Abstract Painting",
        "Realistic/Representational Painting",
    ];
    const painting_categories = [
        "Colorful ",
        "Black and White ",
        "Monochromatic ",
        "Landscape ",
        "Portrait ",
        "Still Life ",
        "Abstract ",
        "Impressionistic ",
        "Surrealistic ",
        "Realistic ",
    ];



    const handleGenerate = async (e) => {
        e.preventDefault();
        const prompt = e.target.prompt.value;
      
        if (activeCat.length === 0) {
          return Swal.fire("error", "please choose a category", "error");
        }
        if (activeType.length === 0) {
          return Swal.fire("error", "please choose a Type", "error");
        }
        if (prompt.length < 10) {
          return Swal.fire(
            "error",
            "add minimum 10-30 character. not more",
            "error"
          );
        }
      
        setLoading(true);
      
        const printingData = {
          prompt,
          category: activeCat,
          type: activeType,
          userEmail: user?.email,
        };
      
        try {
          const res = await axiosSecure.post('/painting/generate', printingData);
      
          if (res?.data?.insertedId) {
            
            Swal.fire('Your Painting Is Ready');
            e.target.reset();
            navigate(`/paintingDetails/${res.data.insertedId}`);
          }
        } catch (error) {
          Swal.fire("error", "Something went wrong. Please try again.", "error");
        } finally {
          setLoading(false);
        }
      };



    return (
        <div className="">
            <div className=" p-5">
                <div className=" py-3 ">
                    <h1 className=" px-2 text-start  text-3xl font-bold border-l-4 border-amber-600">Generate Painting</h1>
                </div>
                <div>
                    <form onSubmit={handleGenerate} action="" className=" mt-5 input pr-0 border-2 border-black rounded-lg flex ">

                        <input type="text" className=" w-full" name="prompt" id="" />
                        {
                            loading?<div className=" bg-green-400 border-l-4 border-black  px-3 rounded-r-lg">
                                <RotatingSquare
                            visible={true}
                            height="50"
                            width="50"
                            color="#4fa94d"
                            ariaLabel="rotating-square-loading"
                            
                            />
                            </div>:
                            <input className="  btn btn-sm h-full rounded-l-none rounded-r-lg bg-green-400 border-y-none border-r-none border-l-2   px-3  " style={{ backgroundColor: '#3cd113' }} type="submit" value="Generate" />
                        }
                       
                    </form>
                    <div className="grid md:grid-cols-2 pt-10">
                        <div className="">
                            <h2 className="text-xl font-bold">Choose A Category</h2>
                            <div className="space-x-5 space-y-3">
                                {painting_categories.map((cat) => (
                                    <button
                                        className={`${activeCat === cat && "bg-orange-400"} btn btn-sm btn-outline`}
                                        onClick={() => setActiveCat(cat)}
                                        key={cat}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-x-5 space-y-3">
                            <h2 className="text-xl font-bold">Choose A Type</h2>
                            {painting_types.map((type) => (
                                <button
                                    className={`${activeType === type && "bg-orange-400"} btn btn-sm btn-outline`}
                                    onClick={() => setActiveType(type)}
                                    key={type}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>


                </div>

                <div className=" my-5 mx-4">
                    {
                        loading ? <div className=" w-6/12 m-auto " > <AuthenticationGIF animation={animation}></AuthenticationGIF></div> :
                            <div className=" ">
                                        {/* <img className=" w-6/12 m-auto " src={img} alt="" /> */}
                                
                            </div>
                    }


                </div>

            </div>

        </div>
    );
};

export default GeneratePaint;