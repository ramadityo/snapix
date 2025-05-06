import { Head, router } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

import Konva from "konva";
import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";

import toast, { Toaster } from "react-hot-toast";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// ICONS
import { IconContext } from "react-icons";
import { FaSave } from "react-icons/fa"; // Save icon
import { ImBrightnessContrast, ImContrast } from "react-icons/im"; // Contrast icon
import { IoCloseOutline } from "react-icons/io5"; // CLose icon
import { MdReplay } from "react-icons/md"; // Replay icon
import { MdBlurOn } from "react-icons/md"; // Blur icon
import { MdDeblur } from "react-icons/md"; // Pixelate icon
import { CgEditNoise } from "react-icons/cg"; // Noise icon

import axios from "axios";

import "./loader/spinner.css";

export default function Editor({ auth, imageUrl }) {
    const imageLocal = imageUrl;
    const [image] = useImage(`${imageUrl}`);
    const imageRef = useRef();
    const [stageSize, setStageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleCLose = () => {
        var confirmModal = confirm("Editanmu akan hilang, yakin?");

        if (confirmModal == true) {
            window.location.href = "/dashboard";
        } else {
            return null;
        }
    };

    function downloadURL(url, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    const handleSave = async () => {
        const dataURL = imageRef.current.toDataURL("image/png");

        const blob = await (await fetch(dataURL)).blob();

        const filename = imageLocal.split("/").pop();

        const formData = new FormData();
        formData.append("image_upload", filename); // filename
        formData.append("image_result", blob, "edited_image.png"); // blob PNG

        try {
            const response = await axios.post("/editor/save", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success("Gambar berhasil disimpan!");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(`Gagal menyimpan gambar: ${error.message}`);
        }
    };

    useEffect(() => {
        console.log(imageLocal);
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

    useEffect(() => {
        function checkImage() {
            if (!imageLocal) {
                window.location.href = "/dashboard";
            } else {
                return null;
            }
            console.log(imageLocal);
        }

        window.addEventListener("load", checkImage);
        return () => window.removeEventListener("load", checkImage);
    }, [imageLocal]);

    const [modalState, setModalState] = useState({
        isOpen: false,
        stateName: "",
    });

    const toggleModal = (stateName) => {
        setModalState({
            isOpen: true,
            stateName,
        });
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            stateName: "",
        });
    };

    const resetButton = useRef();

    const [isReset, setIsReset] = useState(false);

    const [yPos, setYPos] = useState(0);
    const [xPos, setXPos] = useState(0);

    const handleDragStart = (e) => {
        setXPos(e.target.x());
        setYPos(e.target.y());
    };

    const [contrast, setContrast] = useState(0);
    const [brightness, setBrightness] = useState(0);
    const [blur, setBlur] = useState(0);
    const [pixel, setPixel] = useState(1);
    const [noise, setNoise] = useState(0);

    useEffect(() => {
        if (image) {
            imageRef.current.cache();
            const imageWidth = image.width;
            const imageHeight = image.height;

            setXPos((stageSize.width - imageWidth) / 2);
            setYPos((stageSize.height - imageHeight) / 2);

            resetButton.current.addEventListener("click", () => {
                setXPos((stageSize.width - imageWidth) / 2);
                setYPos((stageSize.height - imageHeight) / 2);

                setIsReset(true);
                setContrast(0);
                setBrightness(0);
                setBlur(0);
                setPixel(1);
                setNoise(0);

                setTimeout(() => {
                    setIsReset(false);
                }, 3000);
            });
        }
    }, [image, stageSize.width, stageSize.height]);

    const container = useRef();
    const overlayInit = useRef();

    const { contextSafe } = useGSAP({ scope: container });

    const animateEditBox = contextSafe(() => {
        let tl = gsap.timeline();

        tl.to(
            overlayInit.current,
            {
                duration: 1,
                autoAlpha: 0,
                ease: "power4.inOut",
                willChange: "transform",
            },
            1
        );

        tl.from(
            ".box-edit",
            {
                duration: 1.5,
                ease: "expo.inOut",
                scale: 0,
                yPercent: 100,
                stagger: 0.1,
            },
            1.2
        );
        tl.from(
            ".button-anim",
            {
                duration: 0.8,
                yPercent: 100,
                stagger: 0.1,
                ease: "back.inOut(2)",
            },
            1.7
        );
    });

    useEffect(() => {
        animateEditBox();
    }, []);

    return (
        <div ref={container}>
            <Head title="Editor - Snapix" />
            <div className="relative w-full h-screen overflow-hidden flex">
                <div
                    className="fixed inset-0 bg-[#010104] z-50"
                    ref={overlayInit}
                ></div>
                <div
                    className={`transition-all fixed inset-0 bg-black/80 z-30 flex items-center justify-center ${
                        isReset ? "visible opacity-100" : "invisible opacity-0"
                    }`}
                >
                    <div className="w-[60px] scale-50 flex justify-center">
                        <div className="loader"></div>
                    </div>
                    <p className="text-white text-3xl font-sans">
                        Mohon tunggu...
                    </p>
                </div>
                <div
                    className="flex-1 flex items-center justify-center relative bg-[#010104]"
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <Stage width={stageSize.width} height={stageSize.height}>
                        <Layer>
                            <Image
                                ref={imageRef}
                                {...getCenteredPosition()}
                                image={image}
                                filters={
                                    isReset
                                        ? []
                                        : [
                                              Konva.Filters.Contrast,
                                              Konva.Filters.Brighten,
                                              Konva.Filters.Blur,
                                              Konva.Filters.Pixelate,
                                              Konva.Filters.Noise,
                                          ]
                                }
                                y={yPos}
                                x={xPos}
                                contrast={contrast}
                                brightness={brightness}
                                blurRadius={blur}
                                pixelSize={pixel}
                                noise={noise}
                                draggable={true}
                                onDragEnd={handleDragStart}
                            />
                        </Layer>
                    </Stage>
                </div>

                <div className="w-full py-6 absolute bottom-0 z-10 flex items-center gap-4 justify-center">
                    <div className="overflow-hidden box-edit bg-[#0D0D11] flex items-center justify-center gap-4 py-2 px-5 rounded-full">
                        <div className="button-anim">
                            <button
                                className=" p-3 rounded-full transition-all  hover:bg-[#232326] group"
                                onClick={() => toggleModal("brightness")}
                            >
                                <IconContext.Provider
                                    value={{ className: "text-2xl text-white" }}
                                >
                                    <div>
                                        <ImBrightnessContrast />
                                    </div>
                                </IconContext.Provider>
                            </button>
                        </div>
                        <div className="button-anim">
                            <button
                                className=" p-3 rounded-full transition-all hover:bg-[#232326] group"
                                onClick={() => toggleModal("contrast")}
                            >
                                <IconContext.Provider
                                    value={{ className: "text-2xl text-white" }}
                                >
                                    <div>
                                        <ImContrast />
                                    </div>
                                </IconContext.Provider>
                            </button>
                        </div>
                        <div className="button-anim">
                            <button
                                className=" p-3 rounded-full transition-all hover:bg-[#232326] group"
                                onClick={() => toggleModal("blur")}
                            >
                                <IconContext.Provider
                                    value={{ className: "text-2xl text-white" }}
                                >
                                    <div>
                                        <MdBlurOn />
                                    </div>
                                </IconContext.Provider>
                            </button>
                        </div>

                        <div className="button-anim">
                            <button
                                className=" p-3 rounded-full transition-all hover:bg-[#232326] group"
                                onClick={() => toggleModal("pixel")}
                            >
                                <IconContext.Provider
                                    value={{ className: "text-2xl text-white" }}
                                >
                                    <div>
                                        <MdDeblur />
                                    </div>
                                </IconContext.Provider>
                            </button>
                        </div>
                        <div className="button-anim">
                            <button
                                className=" p-3 rounded-full transition-all hover:bg-[#232326] group"
                                onClick={() => toggleModal("noise")}
                            >
                                <IconContext.Provider
                                    value={{ className: "text-2xl text-white" }}
                                >
                                    <div>
                                        <CgEditNoise />
                                    </div>
                                </IconContext.Provider>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-hidden box-edit bg-[#0D0D11] flex items-center justify-center gap-4 py-2 px-5 rounded-full">
                        <div className="button-anim">
                            <button
                                className=" p-3 rounded-full transition-all hover:bg-[#232326] group"
                                onClick={handleSave}
                            >
                                <IconContext.Provider
                                    value={{ className: "text-2xl text-white" }}
                                >
                                    <div>
                                        <FaSave />
                                    </div>
                                </IconContext.Provider>
                            </button>
                        </div>

                        <div className="button-anim">
                            <button
                                className="p-3 rounded-full transition-all hover:bg-[#232326] group"
                                ref={resetButton}
                            >
                                <IconContext.Provider
                                    value={{
                                        className: "text-2xl text-white ",
                                    }}
                                >
                                    <div>
                                        <MdReplay />
                                    </div>
                                </IconContext.Provider>
                            </button>
                        </div>
                    </div>
                </div>

                <ModalEdit
                    stateName={modalState.stateName}
                    isOpen={modalState.isOpen}
                    isCLose={closeModal}
                    contrast={contrast}
                    setContrast={setContrast}
                    brightness={brightness}
                    setBrightness={setBrightness}
                    blur={blur}
                    setBlur={setBlur}
                    pixel={pixel}
                    setPixel={setPixel}
                    noise={noise}
                    setNoise={setNoise}
                />

                {/* Close button */}

                <div className="absolute top-6 left-6 hover:scale-110 transition-all group bg-transparent hover:drop-shadow-[0_2px_15px_rgba(63,95,251,0.8)]">
                    <button
                        className="p-3 bg-[#3a31d8] rounded-full"
                        onClick={handleCLose}
                    >
                        <IconContext.Provider
                            value={{ className: "text-2xl text-white" }}
                        >
                            <div className="transition-all group-hover:rotate-[360deg] ease-in-out duration-500">
                                <IoCloseOutline />
                            </div>
                        </IconContext.Provider>
                    </button>
                </div>

                <Toaster
                    position="top-center"
                    toastOptions={{
                        className: "font-sans",
                        style: {
                            padding: "16px",
                            color: "#713200",
                        },
                    }}
                />
            </div>
        </div>
    );
}

const ModalEdit = ({
    stateName,
    isOpen,
    isCLose,
    rgb,
    setRGB,
    contrast,
    setContrast,
    brightness,
    setBrightness,
    blur,
    setBlur,
    pixel,
    setPixel,
    noise,
    setNoise,
}) => {
    return (
        <div
            className={`absolute bottom-36 transition-all ${
                isOpen ? "" : "translate-y-full opacity-0"
            } left-1/2 -translate-x-1/2 w-[300px] min-h-10 p-4 rounded-xl bg-[#232326]`}
        >
            <div className="w-full flex justify-end">
                <button
                    className="p-2 transition-all bg-transparent hover:bg-[#2a2a2e] rounded-full"
                    onClick={isCLose}
                >
                    <IconContext.Provider
                        value={{ className: "text-base text-white" }}
                    >
                        <div className="transition-all group-hover:rotate-[360deg] ease-in-out duration-500">
                            <IoCloseOutline />
                        </div>
                    </IconContext.Provider>
                </button>
            </div>

            {stateName === "contrast" && (
                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-sans font-bold text-white ">
                            Contrast
                        </p>
                        <p className="text-base font-sans font-normal text-white ">
                            {contrast}
                        </p>
                    </div>
                    <input
                        type="range"
                        name="contrast"
                        min="-100"
                        max="100"
                        id="contrast"
                        onChange={(e) => {
                            setContrast(Number(e.target.value));
                        }}
                        value={contrast}
                    />
                </div>
            )}

            {stateName === "brightness" && (
                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-sans font-bold text-white ">
                            Brightness
                        </p>
                        <p className="text-base font-sans font-normal text-white ">
                            {brightness}
                        </p>
                    </div>
                    <input
                        type="range"
                        name="brightness"
                        min="-1"
                        max="1"
                        step="0.05"
                        id="brightness"
                        onChange={(e) => {
                            setBrightness(Number(e.target.value));
                        }}
                        value={brightness}
                    />
                </div>
            )}

            {stateName === "blur" && (
                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-sans font-bold text-white ">
                            Blur
                        </p>
                        <p className="text-base font-sans font-normal text-white ">
                            {blur}
                        </p>
                    </div>
                    <input
                        type="range"
                        name="brightness"
                        min="1"
                        max="100"
                        step="0.05"
                        id="brightness"
                        onChange={(e) => {
                            setBlur(Number(e.target.value));
                        }}
                        value={blur}
                    />
                </div>
            )}

            {stateName === "pixel" && (
                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-sans font-bold text-white ">
                            Pixel Filter
                        </p>
                        <p className="text-base font-sans font-normal text-white ">
                            {pixel}
                        </p>
                    </div>
                    <input
                        type="range"
                        name="brightness"
                        min="1"
                        max="100"
                        step="0.05"
                        id="brightness"
                        onChange={(e) => {
                            setPixel(Number(e.target.value));
                        }}
                        value={pixel}
                    />
                </div>
            )}

            {stateName === "noise" && (
                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-sans font-bold text-white ">
                            Noise Filter
                        </p>
                        <p className="text-base font-sans font-normal text-white ">
                            {noise}
                        </p>
                    </div>
                    <input
                        type="range"
                        name="brightness"
                        min="0"
                        max="5"
                        step="0.05"
                        id="brightness"
                        onChange={(e) => {
                            setNoise(Number(e.target.value));
                        }}
                        value={noise}
                    />
                </div>
            )}
        </div>
    );
};
