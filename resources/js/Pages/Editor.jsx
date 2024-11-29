import React, { useEffect } from "react";

import { Link, usePage } from "@inertiajs/react";

export default function Editor({ auth }) {
    const user = usePage().props.auth.user;

    useEffect(() => {
        if (!user) {
            window.location.href = "/login";
        }
    }, [user]);
    return (
        <div className="w-full h-screen overflow-hidden bg-yellow-500"></div>
    );
}
