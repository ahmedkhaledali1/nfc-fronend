import { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { useQuery } from '@tanstack/react-query';
import { getTestimonials } from '@/lib/service/endpoints';

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['getTestimonials'],
    queryFn: () => getTestimonials(),
    // onSuccess: (data) => {
    //  },
  });

  const testimonials = data?.data?.data?.data;

  const TestimonialCard = ({
    testimonial,
    index,
  }: {
    testimonial: (typeof testimonials)[0];
    index: number;
  }) => (
    <div className="card-premium p-8 h-full group hover:scale-105 transition-all duration-500">
      {/* Quote Icon */}
      <div className="mb-6">
        <Quote className="w-8 h-8 text-primary/60" />
      </div>

      {/* Quote */}
      <blockquote className="text-foreground mb-6 leading-relaxed">
        "{testimonial.quote}"
      </blockquote>

      {/* Rating */}
      <div className="flex items-center mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center">
        <img
          crossOrigin="anonymous"
          src={`${import.meta.env.VITE_BACKEND_DOMAIN}${testimonial.image}`}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <div className="font-semibold text-foreground">
            {testimonial.name}
          </div>
          <div className="text-sm text-muted-foreground">
            {testimonial.title} at {testimonial.company}
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="mt-6 w-0 h-1 bg-gradient-primary group-hover:w-full transition-all duration-500"></div>
    </div>
  );

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/30"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by Business Owners,{' '}
            <span className="gradient-text">Creatives, and Professionals</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            See what our clients say about their NFC cards
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden fade-in">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            effect="fade"
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-primary/30',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary',
            }}
            className="w-full pb-10"
          >
            {testimonials?.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard testimonial={testimonial} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden fade-in md:!grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials &&
            testimonials?.map((testimonial, index) => (
              <div
                key={index}
                // className="fade-in"
                // style={{ animationDelay: `${index * 0.2}s` }}
              >
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
        </div>

        <div
          className="text-center mt-12 fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="inline-flex items-center space-x-8 text-muted-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">1000+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">4.9/5</div>
              <div className="text-sm">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">95%</div>
              <div className="text-sm">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
