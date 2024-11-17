import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import HeroSlider from "@/Components/HeroSlider";

export default function Welcome({ auth }) {
    return (
        <>
            <Head>
                <title>Snapix Homepage</title>
            </Head>
            <Navbar Auth={auth} />
            <div className="w-full h-screen pt-28">
                <div className="space-y-4">
                    <h1 className="text-8xl text-center font-bold">
                        Your Creative Toolkit
                        <br />
                        in One Place
                    </h1>
                    <p className="text-xl text-center text-black/70">
                        All-in-One Creative Platform to Elevate Every Vision.
                        Break Down Creative Barriers.
                        <br />
                        Gain Comprehensive Control. Transform Ideas in
                        Real-Time.
                    </p>
                </div>

                <div className="w-10/12 desktop:w-9/12 mobile:w-full mx-auto  py-10  mobile:px-3">
                    <HeroSlider />
                </div>

                <div></div>
            </div>
        </>
    );
}
