import React, { useState, useEffect } from 'react';
import Avvvatars from 'avvvatars-react'

const testimonialsData = [
    {
        text: `"Olympiads, Marathi classes, English classes, they got it all for me and I am loving this smooth and friendly experience."`,
        name: 'Neeti Garg',
    },
    {
        text: `"Very happy with Rahul. Apart from regular tuitions, he is taking my son
in right direction towards JEE. Also loving his Programming Classes! Cheers to team Urja"`,
        name: 'Vikram Borawat',
    },
    {
        text: `"I am super happy with Urja Talents. Its very seamless and efficiently governed. Mehr is like in love with her Teacher."`,
        name: 'Reet Kalani',
    },
    {
        text: `"Surely going for them again this year for both of my kids. Superb teachers and good value for money. No hassles!"`,
        name: 'Vanita Vasvani',
    },
];

const Testimonial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
        }, 4000); // Slide every 4 seconds
        return () => clearInterval(interval);
    }, []);

    const nextTestimonial = () => {
        setCurrentIndex((currentIndex + 1) % testimonialsData.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex(
            (currentIndex - 1 + testimonialsData.length) % testimonialsData.length
        );
    };

    return (
        <div className="relative bg-white text-black p-6 max-w-3xl mx-auto rounded-lg overflow-hidden">
            <div className="absolute inset-0 rounded-lg border-2 border-transparent  p-1 border-orange-400">
                <div className="bg-white h-full w-full rounded-lg"></div>
            </div>

            <div
                className="flex transition-transform duration-700 ease-in-out relative z-10"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-6">
                        <p className="text-lg mb-6">{testimonial.text}</p>
                        <div className="flex items-center justify-center gap-4">
                            <Avvvatars
                                value={testimonial.name}
                                className="w-12 h-12 rounded-full border-2 border-gray-300"
                            />
                            <div className="text-left">
                                <h4 className="font-semibold text-base">{testimonial.name}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex justify-center items-center gap-6 relative z-10">
                <button
                    onClick={prevTestimonial}
                    className="text-black text-xl hover:text-gray-400"
                >
                    &#8592;
                </button>
                <button
                    onClick={nextTestimonial}
                    className="text-black text-xl hover:text-gray-400"
                >
                    &#8594;
                </button>
            </div>
        </div>

    );
};

export default Testimonial;
