import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

// ICONS
import { IoAdd } from "react-icons/io5";

export default function Dashboard({ auth, users }) {
    const handleUpload = (imageFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
            // router.visit("/editor", {
            //     method: "get",
            //     data: { image_file: reader.result },
            //     preserveState: true,
            // });

            localStorage.setItem("image_file", reader.result);
            window.location.href = "/editor";
        };
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    Selamat datang, {auth.user.name}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto container">
                    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-4">
                        <h1 className="text-5xl font-sans font-extrabold leading-normal text-center">
                            Mau edit apa hari ini?
                        </h1>

                        <div className="relative w-[400px] h-[200px] border border-black/50 rounded-xl flex items-center justify-center">
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept="image/png, image/jpeg"
                                className="absolute inset-0 opacity-0"
                                onChange={(e) =>
                                    // setImageData(e.target.files[0])
                                    handleUpload(e.target.files[0])
                                }
                            />
                            <IoAdd className="text-5xl" />
                        </div>
                    </div>
                    {/* backup untuk jaga2 kalau mau ubah layout :v */}

                    {/* <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] auto-rows-[200px] gap-4">
                        <div className="bg-black"></div>
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";

// export default function Dashboard() {
//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                     Dashboard
//                 </h2>
//             }
//         >
//             <Head title="Dashboard" />

//             <div className="py-12">
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//                     <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             You're logged in!
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
