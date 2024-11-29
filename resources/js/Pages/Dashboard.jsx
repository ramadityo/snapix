import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
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
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] auto-rows-[200px] gap-4">
                        <div className="bg-black"></div>
                        <div className="bg-black"></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
