import { useEffect, useState } from "react";
import { MainTitle } from "../../common/MainTitle/MainTitle";
import { Subtitle } from "../../common/Subtitle/Subtitle";
import { referenceService } from "../../../services";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Testemonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setIsLoading(true);
                const data = await referenceService.getTestimonials();
                setTestimonials(data || []);
            } catch (error) {
                console.error('Failed to fetch testimonials:', error);
                setTestimonials([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (isLoading) {
        return <section className="max-w-[822px] mx-auto text-center w-full">
            <div className="animate-pulse rounded-2xl h-5 w-48 mx-auto bg-gray-300 mb-4"></div>
            <div className="animate-pulse rounded-2xl h-8 w-64 mx-auto bg-gray-300 mb-16 md:mb-20"></div>
            <div className="animate-pulse rounded-2xl h-40 w-full bg-gray-300"></div>
        </section>;
    }

    return <section className="max-w-[822px] mx-auto text-center w-full">
        <Subtitle className="mb-4">What our customer say</Subtitle>
        <MainTitle className="mb-16 md:mb-20">Testimonials</MainTitle>
        <div className="relative flex">
            <svg className="fill-[#BFBEBE] absolute left-2 -top-5 tablet:left-10 tablet:-top-10 -translate-y-full tablet:w-[59px] h-auto" width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 32V21.2941C0 17.2941 0.716418 13.6079 2.14925 10.2353C3.58209 6.86275 6.00995 3.45098 9.43284 0L15.6418 4.82353C13.6517 6.78432 12.1393 8.62746 11.1045 10.3529C10.0697 12.0784 9.39303 13.8431 9.07463 15.6471H16.7164V32H0ZM23.2836 32V21.2941C23.2836 17.2941 24 13.6079 25.4328 10.2353C26.8657 6.86275 29.2935 3.45098 32.7164 0L38.9254 4.82353C36.9353 6.78432 35.4229 8.62746 34.3881 10.3529C33.3532 12.0784 32.6766 13.8431 32.3582 15.6471H40V32H23.2836Z"/></svg>
            <Swiper
                modules={[Pagination, Autoplay]}
                autoHeight={true}
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="pb-12! [--swiper-pagination-bullet-size:14px] [--swiper-pagination-bullet-inactive-color:#BFBEBE] [--swiper-pagination-bullet-horizontal-gap:4px] [--swiper-theme-color:#050505] [--swiper-pagination-bullet-inactive-opacity:1]"
            >
                {testimonials.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="mb-16 md:mb-20 font-sans font-medium text-lg leading-6 tablet:text-2xl tablet:leading-9">
                            {item.testimonial}
                        </div>
                        <div className="font-sans font-extrabold text-base leading-6 uppercase tablet:desktop-tablet-h4">
                            {item.user?.name || 'Anonymous'}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </section>
}

export default Testemonials;