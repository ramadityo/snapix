import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function HeroSlider() {
    // Untuk sementara, kita pakai data dummy untuk test data
    const [dataPhotos, setDataPhotos] = useState([
        {
            id: 1,
            author: "John Doe",
            image: "https://nofilmschool.com/media-library/rgb-split-effect.png?id=34075795&width=1245&height=700&quality=90&coordinates=84%2C0%2C85%2C0",
            date: "01 Jan 2024",
        },
        {
            id: 2,
            author: "Jane Doe",
            image: "https://images.unsplash.com/uploads/1413259835094dcdeb9d3/6e609595?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmlnaHQlMjBibHVyfGVufDB8fDB8fHww",
            date: "11 Mar 2024",
        },
        {
            id: 3,
            author: "Zan Cho",
            image: "https://chasejarvis.com/wp-content/uploads/2012/03/parissepia.jpg",
            date: "23 Mar 2024",
        },
        {
            id: 4,
            author: "Xian Ying",
            image: "https://invert.imageonline.co/invert-image.jpg",
            date: "15 Apr 2024",
        },
        {
            id: 5,
            author: "Fuad Mandalika",
            image: "https://i.redd.it/q95p942lrzf01.jpg",
            date: "23 May 2024",
        },
        {
            id: 6,
            author: "Mike Andrew",
            image: "https://www.researchgate.net/profile/Bo-Li-129/publication/266969565/figure/fig1/AS:614099465535488@1523424130754/a-Lena-image-b-d-and-f-Canny-edge-detection-result-with-filter-size-of-33_Q320.jpg",
            date: "01 Jun 2024",
        },
        {
            id: 7,
            author: "Muhamad Sumbul",
            image: "https://apps.canva-apps.com/BADqp7FqvNc/UADlmfqJbk8/AADrJF4aFGU/2/thumbnail_large/204b755d-3183-4f38-a575-50d54826e392.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH2E7WUW5F%2F20241115%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241115T155244Z&X-Amz-Expires=359226&X-Amz-Signature=426eb0a4f826c7d76cd893bab4890c92c95e37ed47b574db8befcb41897f650e&X-Amz-SignedHeaders=host&response-expires=Tue%2C%2019%20Nov%202024%2019%3A39%3A50%20GMT",
            date: "01 Jul 2024",
        },
    ]);
    return (
        <>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={50}
                slidesPerView={3}
                autoplay={{
                    delay: 3000,
                    // disableOnInteraction: true,
                }}
                loop={true}
                onMouseEnter={(swiper) => swiper.autoplay.stop()}
                onMouseLeave={(swiper) => swiper.autoplay.start()}
                // draggable={false}
                allowTouchMove={false}
            >
                {/*
                    Semua data di atas akan dimapping (loop) menjadi satu elemen SwiperSlide
                    sehingga element akan dibuat secara banyak dan dinamis.
                */}
                {dataPhotos.map((data, index) => {
                    return (
                        <SwiperSlide key={data.id}>
                            <div className="relative w-full h-[450px] bg-red-500 group">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                                <img
                                    src={data.image}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute z-20 bottom-4 left-4 text-white text-2xl font-bold">
                                    <p className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 delay-75 text-white text-2xl font-bold">
                                        {data.author}
                                    </p>
                                    <p className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 delay-100 text-white text-xl font-medium">
                                        {data.date}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
