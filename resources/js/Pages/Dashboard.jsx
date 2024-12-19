import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
// import { Inertia } from "@inertiajs/inertia";


// ICONS
import { IoAdd } from "react-icons/io5";

export default function Dashboard({ auth, users }) {
    const handleUpload = (imageFile) => {
        const reader = new FileReader();

        // reader.readAsDataURL(imageFile);
        const formData = new FormData();
        formData.append("image", imageFile);

        router.post("/dashboard/upload-image", formData);
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
                                    handleUpload(e.target.files[0])
                                }
                            />
                            <IoAdd className="text-5xl" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}