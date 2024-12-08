import { Head } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

import { Inertia } from '@inertiajs/inertia';
import Konva from "konva";
import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";

import toast, { Toaster } from "react-hot-toast";

// ICONS
import { IconContext } from "react-icons";

import { FaSave } from "react-icons/fa"; // Save icon
import { ImBrightnessContrast, ImContrast } from "react-icons/im"; // Contrast icon
import { IoCloseOutline } from "react-icons/io5"; // CLose icon
import { MdReplay } from "react-icons/md"; // Replay icon

import "./loader/spinner.css";

export default function Editor({ auth }) {
    // Variable image buat ngambil item dari image_file
    // yang sudah diambil sebelumnya di Dashboard.jsx
    const [image] = useImage(`${localStorage.getItem("image_file")}`);
    const imageRef = useRef();
    const [stageSize, setStageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    //Fungsi untuk close page editor
    const handleCLose = () => {
        var confirmModal = confirm("Editanmu akan hilang, yakin?");

        // Kalau di alertnya milih OK,
        // maka akan meremove item image_file dan mundur ke dashboard
        if (confirmModal == true) {
            localStorage.removeItem("image_file");
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

    // const handleSave = () => {
    //     // TO-DO: IMAGE URL HARUS MENGARAH KE DATABASE DALAM BENTUK BLOB

    //     // var imageURL gunanya buat ngambil info URL dari si image itu
    //     // yang dimana imagenya dijadikan dlm bentuk BLOB
    //     // Gak percaya? coba uncomment satu sintaks di bawah!
    //     const imageURL = imageRef.current.toDataURL();
    //     downloadURL(imageURL, "edited_image.png");

    //     // console.log(imageURL);

    //     toast.success("Gambar berhasil disimpan!");
    // };


    const handleSave = async () => {
        const imageURL = imageRef.current.toDataURL();
    
        // Convert data URL menjadi Blob
        const response = await fetch(imageURL);
        const blob = await response.blob();
    
        // Siapkan form data
        const formData = new FormData();
        formData.append('image_upload', blob, 'edited_image.png');
    
        try {
            // Kirim file menggunakan Inertia
            Inertia.post('editor', formData, {
                onSuccess: () => {
                    toast.success('Gambar berhasil disimpan ke database!');
                },
                onError: (errors) => {
                    console.error(errors);
                    toast.error('Terjadi kesalahan saat menyimpan gambar');
                },
            });
        } catch (error) {
            console.error('Error:', error);
            toast.error(`Gagal menyimpan gambar: ${error.message}`);
        }
    };

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

    const [contrast, setContrast] = useState(0);
    const [brightness, setBrightness] = useState(0);

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

    useEffect(() => {
        if (image) {
            imageRef.current.cache();
            resetButton.current.addEventListener("click", () => {
                setIsReset(true);
                setContrast(0);
                setBrightness(0);

                setTimeout(() => {
                    setIsReset(false);
                }, 3000);
            });
        }
    }, [image]);

    return (
        <>
            <Head title="Editor - Snapix" />
            <div className="relative w-full h-screen overflow-hidden flex">
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
                                          ]
                                }
                                contrast={contrast}
                                brightness={brightness}
                                draggable={true}
                            />
                        </Layer>
                    </Stage>
                </div>

                <div className="w-full py-6 absolute bottom-0 z-10 flex items-center gap-4 justify-center">
                    <div className="bg-[#0D0D11] flex items-center justify-center gap-4 py-2 px-5 rounded-full">
                        <button
                            className="bright-btn p-3 rounded-full transition-all hover:bg-[#232326] group"
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
                        <button
                            className="bright-btn p-3 rounded-full transition-all hover:bg-[#232326] group"
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

                    <div className="bg-[#0D0D11] flex items-center justify-center gap-4 py-2 px-5 rounded-full">
                        <button
                            className="bright-btn p-3 rounded-full transition-all hover:bg-[#232326] group"
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
                        <button
                            className="bright-btn p-3 rounded-full transition-all hover:bg-[#232326] group"
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

                <ModalEdit
                    stateName={modalState.stateName}
                    isOpen={modalState.isOpen}
                    isCLose={closeModal}
                    contrast={contrast}
                    setContrast={setContrast}
                    brightness={brightness}
                    setBrightness={setBrightness}
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
        </>
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
        </div>
    );
};
