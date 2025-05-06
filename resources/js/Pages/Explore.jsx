import { Head, Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import Navbar from "@/Components/Navbar";

export default function Explore({ auth, images }) {


    useEffect(() => {
        console.log(images);
    }, [])
    return (
        <>
            <Head>
                <title>Snapix Explore</title>
            </Head>
            <Navbar Auth={auth} />
            <div className="w-full h-screen pt-28">
                <div className="space-y-4">
                    <h1 className="text-8xl text-center font-bold">
                        Explore
                    </h1>
                    <p className="text-xl text-center text-black/70">
                        Discover a world of creativity and inspiration. From
                        stunning visuals to thought-provoking stories,<br />our
                        collection of images is a gateway to a world of
                    </p>
                </div>

                <div className="w-10/12 desktop:w-9/12 mobile:w-full mx-auto  py-10  mobile:px-3 flex flex-wrap gap-4">
                    {/* <HeroSlider /> */}
                    {images.map((image) => (
                        <img
                            src={`http://127.0.0.1:8000/storage/${image.image_result}`}
                            alt="image"
                            className="w-[300px] h-auto object-contain"
                        />
                    ))}
                </div>

                <div></div>
            </div>
        </>
    );
}
