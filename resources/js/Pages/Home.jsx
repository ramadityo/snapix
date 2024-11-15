import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    // const handleImageError = () => {
    //     document
    //         .getElementById("screenshot-container")
    //         ?.classList.add("!hidden");
    //     document.getElementById("docs-card")?.classList.add("!row-span-1");
    //     document
    //         .getElementById("docs-card-content")
    //         ?.classList.add("!flex-row");
    //     document.getElementById("background")?.classList.add("!hidden");
    // };

    return (
        <>
            <Head>
                <title>Snapix Homepage</title>
            </Head>
            <div className="w-full h-screen">
                <Navbar auth={auth} />
            </div>
        </>
    );
}
