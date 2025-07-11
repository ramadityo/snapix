import { Head, Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import Navbar from "@/Components/Navbar";
import Masonry from "react-masonry-css";
import "./masonry.css";

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

export default function Explore({ auth, images }) {
    function downloadURL(url, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function dateFormat(raw) {
        const rawDate = raw.split(" ")[0];
        const date = new Date(rawDate);
        const formatter = new Intl.DateTimeFormat("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        return formatter.format(date);
    }

    useEffect(() => {
        console.log(images);
    }, []);
    return (
        <>
            <Head>
                <title>Snapix Explore</title>
            </Head>
            <Navbar Auth={auth} />
            <div className="w-full h-screen">
                <div className="space-y-4 w-10/12 desktop:w-9/12 mobile:w-full mx-auto  py-10  mobile:px-3 flex flex-col gap-4">
                    <h1 className="text-8xl text-center font-bold">Explore</h1>
                    <p className="text-xl text-center text-black/70">
                        Discover a world of creativity and inspiration. From
                        stunning visuals to thought-provoking stories,
                        <br />
                        our collection of images is a gateway to a world of
                    </p>
                </div>

                <div className="w-10/12 desktop:w-9/12 mobile:w-full mx-auto  py-10  mobile:px-3 flex flex-wrap gap-4">
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {images.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={`http://127.0.0.1:8000/storage/${image.image_result}`}
                                    alt="image"
                                    className="w-full h-auto object-contain"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-stone-50/0 flex items-end opacity-0 group-hover:opacity-100 transition-all">
                                    <div className="p-4">
                                        <p className=" text-white font-bold text-xl">
                                            {image.name}
                                        </p>
                                        <p className="text-gray-300 font-regular text-lg">
                                            {dateFormat(image.created_date)}
                                        </p>
                                        <p className="text-gray-300 font-regular text-sm">
                                            {image.location_name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Masonry>
                </div>
            </div>
        </>
    );
}
