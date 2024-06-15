import { useState } from "react";
import animation from '../../assets/paint.json'
import AuthenticationGIF from "../../SharedComponent/Animation/Robo-Animation";



const GeneratePaint = () => {
    const [img, setImg] = useState([])
    const [loading, setLoading] = useState(false)

    const handelGenerate = (e) => {
        e.preventDefault()
        setLoading(true)
        const prompt = e.target.prompt.value

        const form = new FormData()
        form.append('prompt', prompt)

        fetch('https://clipdrop-api.co/text-to-image/v1', {
            method: 'POST',
            headers: {
                'x-api-key': 'b436d60fa79005eb376fffdfbefe81acfefd03a6494f4ad981adea6c789ce97e816a3507e2db9e41ec1a401a46b8dd51',
            },
            body: form,
        })
            .then(response => response.arrayBuffer())
            .then(buffer => {
                const blob = new Blob([buffer], { type: 'image/jpeg' });

                const imageUrl = URL.createObjectURL(blob);
                console.log(imageUrl);
                setImg([imageUrl, ...img])
                setLoading(false)
            })



    }



    return (
        <div className="">
            <div className=" p-5">
                <div className=" py-3 ">
                    <h1 className=" px-2 text-start  text-3xl font-bold border-l-4 border-amber-600">Generate Painting</h1>
                </div>
                <div>
                    <form onSubmit={handelGenerate} action="" className=" mt-5 input pr-0 border-2 border-black rounded-lg flex ">

                        <input type="text" className=" w-full" name="prompt" id="" />
                        <input className=" bg-green-400 border-l-4 border-black  px-3 rounded-r-lg " style={{ backgroundColor: '#3cd113' }} type="submit" value="Generate" />
                    </form>


                </div>

                <div className=" my-5 mx-4">
                    {
                        loading ? <div className=" w-6/12 m-auto " > <AuthenticationGIF animation={animation}></AuthenticationGIF></div> :
                            <div className=" grid grid-cols-2 gap-3">
                                {
                                    img.map((i, idx) => <div key={idx}>

                                        <img className=" w-6/12 m-auto " src={i} alt="" />
                                    </div>)
                                }

                            </div>
                    }


                </div>

            </div>

        </div>
    );
};

export default GeneratePaint;