import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Custom component that animates when scrolled into view
const AnimateOnScroll = ({ children, delay = 0, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

function Home() {
  const features = [
    {
      title: "Kenali Diri Sendiri",
      description:
        "Dapatkan wawasan mendalam tentang bagaimana kepribadian Anda bekerja dan apa yang memotivasi tindakan Anda.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Tingkatkan Karir",
      description:
        "Temukan jalur karir yang sesuai dengan kepribadian dan kemampuan alami Anda.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          ></path>
        </svg>
      ),
    },
    {
      title: "Perbaiki Hubungan",
      description:
        "Bangun hubungan yang lebih baik dengan memahami bagaimana Anda berinteraksi dengan tipe kepribadian lainnya.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      ),
    },
  ];

  const testimonials = [
    {
      name: "Anita Wijaya",
      role: "Mahasiswa",
      initial: "A",
      feedback:
        "Tes ini membantu saya memahami mengapa saya bereaksi dengan cara tertentu dalam situasi tertentu. Sangat berguna untuk pengembangan diri!",
    },
    {
      name: "Budi Santoso",
      role: "Profesional IT",
      initial: "B",
      feedback:
        "Hasilnya sangat akurat! Saya akhirnya mengerti mengapa saya merasa nyaman dalam peran kepemimpinan tertentu namun tidak di yang lain.",
    },
    {
      name: "Citra Dewi",
      role: "Psikolog",
      initial: "C",
      feedback:
        "Sebagai profesional di bidang psikologi, saya terkesan dengan kedalaman analisis dan akurasi tes tipologi ISTTS ini.",
    },
  ];

  const faqs = [
    {
      question: "Apa itu tes tipologi kepribadian?",
      answer:
        "Tes tipologi kepribadian adalah alat untuk mengidentifikasi pola perilaku, pemikiran, dan emosi yang membentuk kepribadian seseorang. Tes ini membantu Anda memahami preferensi alami Anda dalam berinteraksi dengan dunia.",
    },
    {
      question: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan tes?",
      answer:
        "Tes ini membutuhkan waktu sekitar 10-15 menit untuk diselesaikan, tergantung pada kecepatan Anda dalam menjawab setiap pertanyaan.",
    },
    {
      question: "Apakah hasil tes akan akurat?",
      answer:
        "Tes ini dirancang berdasarkan penelitian ilmiah dan memiliki tingkat akurasi yang tinggi. Namun, ingatlah bahwa tidak ada tes kepribadian yang sempurna, dan hasilnya sebaiknya digunakan sebagai panduan, bukan sebagai penilaian absolut.",
    },
  ];

  // Ref for hero section elements
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 text-white py-20">
        {/* Circular design element */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[45%] h-0 pb-[45%] bg-white rounded-full overflow-hidden border-8 border-yellow-200 shadow-xl">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={
              isHeroInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.1 }
            }
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-[url('https://udahketemu.com/wp-content/uploads/2022/07/wfo-1.jpg')] bg-cover bg-center"
          ></motion.div>
        </div>

        {/* Yellow curved shapes in background */}
        <div className="absolute left-0 bottom-0 w-[30%] h-[30%] bg-yellow-400 rounded-tr-full"></div>

        <div ref={heroRef} className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-extrabold mb-4"
            >
              TEMUKAN TIPOLOGI KEPRIBADIAN ANDA
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={
                isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
              }
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="text-xl md:text-2xl font-bold mb-8 max-w-xl"
            >
              Kenali diri Anda lebih dalam, pahami kekuatan dan potensi Anda
              melalui tes tipologi kepribadian yang komprehensif
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isHeroInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <Link
                to="/test"
                className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105 duration-300 text-lg"
              >
                Mulai Tes Sekarang
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center mb-12">
              Kenapa Kamu Harus Coba Tes Tipologi?
            </h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <AnimateOnScroll
                key={index}
                delay={index * 0.2}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-16 bg-amber-50">
        <div className="container mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center mb-12">
              Apa Kata Mereka?
            </h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimateOnScroll
                key={index}
                delay={index * 0.2}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-gray-600">
                      {testimonial.initial}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">"{testimonial.feedback}"</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center mb-12">
              FAQ Tes Tipologi
            </h2>
          </AnimateOnScroll>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <AnimateOnScroll
                key={index}
                delay={index * 0.2}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
