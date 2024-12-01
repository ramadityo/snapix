import React, { useEffect, useRef, useState } from "react";
import { Link, usePage, Head } from "@inertiajs/react";

import Konva from "konva";
import { Stage, Layer, Rect, Image } from "react-konva";
import useImage from "use-image";

// ICONS
import { IconContext } from "react-icons";

import { TbCirclesFilled } from "react-icons/tb"; // RGB icon
import { ImContrast } from "react-icons/im"; // Contrast icon
import { ImBrightnessContrast } from "react-icons/im"; // Brightness icon

export default function Editor({ auth }) {
    // const { image_file } = usePage().props;
    const [image] = useImage(`${localStorage.getItem("image_file")}`);
    const imageRef = useRef();
    const [stageSize, setStageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setStageSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getCenteredPosition = () => {
        if (image) {
            const imageWidth = image.width;
            const imageHeight = image.height;

            return {
                x: (stageSize.width - imageWidth) / 2,
                y: (stageSize.height - imageHeight) / 2,
            };
        }
        return { x: 0, y: 0 };
    };

    useEffect(() => {
        if (!auth.user) {
            window.location.href = "/login";
        }
    }, [auth]);

    // jadi ini rencananya mau dibuat sidebar,
    // sebelah kanan ada tool2 edit gambar,
    // dan sebelah kiri ada gambar yang sedang diedit

    return (
        <>
            <Head title="Editor - Snapix" />
            <div className="relative w-full h-screen overflow-hidden flex">
                <div
                    className="flex-1 flex items-center justify-center relative bg-[#040404]"
                    onContextMenu={(e) => e.preventDefault()}
                >
                    {/* disini ada canvas buat image processing */}
                    <Stage width={stageSize.width} height={stageSize.height}>
                        <Layer>
                            <Image
                                ref={imageRef}
                                {...getCenteredPosition()}
                                image={image}
                                filters={[Konva.Filters.Blur]}
                                blurRadius={100}
                            />
                        </Layer>
                    </Stage>
                </div>

                <div className="w-full py-6 absolute bottom-0 z-10">
                    <div className="mx-auto w-[500px] bg-slate-50 flex items-center justify-center gap-4 py-2 px-5 rounded-full">
                        <button className="bright-btn bg-white p-2 border rounded-full transition-all shadow-none hover:shadow-xl hover:scale-125 hover:bg-indigo-500 group">
                            {/* <IconContext.Provider>
                                <div>
                                    <ImBrightnessContrast className="text-2xl" />
                                </div>
                            </IconContext.Provider> */}
                        </button>
                    </div>
                </div>
                {/* <div className="bg-black h-full w-[300px] overflow-clip"></div> */}
            </div>
        </>
    );
}
