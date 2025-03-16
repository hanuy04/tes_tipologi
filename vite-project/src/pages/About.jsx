import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

function About() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateOnScroll className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Tentang Tes Tipologi
          </h1>
          <p className="text-lg text-gray-600">
            Mengenal lebih jauh tentang tes tipologi kepribadian dan pembuatnya
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Apa itu Tes Tipologi Kepribadian?
          </h2>
          <p className="text-gray-700 mb-6">
            Tes tipologi kepribadian adalah alat psikometri yang dirancang untuk
            membantu individu memahami karakteristik kepribadian mereka. Melalui
            serangkaian pertanyaan terstruktur, tes ini membantu
            mengidentifikasi kecenderungan, preferensi, dan pola perilaku yang
            membentuk kepribadian seseorang.
          </p>
          <p className="text-gray-700 mb-6">
            Institut STTS mengembangkan tes tipologi kepribadian ini berdasarkan
            penelitian mendalam dan metodologi terkini dalam bidang psikologi.
            Hasil dari tes ini dapat membantu Anda:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Memahami kekuatan dan kelemahan personal Anda</li>
            <li>
              Mengidentifikasi jalur karier yang sesuai dengan kepribadian Anda
            </li>
            <li>Mengembangkan strategi belajar yang lebih efektif</li>
            <li>Meningkatkan kemampuan kolaborasi dalam tim</li>
            <li>Membangun hubungan interpersonal yang lebih baik</li>
          </ul>
        </AnimateOnScroll>

        <AnimateOnScroll
          delay={0.2}
          className="bg-white rounded-xl shadow-lg p-8 mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Jenis-jenis Tipologi Kepribadian
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <AnimateOnScroll
              delay={0.3}
              className="border-l-4 border-red-500 pl-4"
            >
              <h3 className="font-medium text-xl text-gray-800 mb-2">
                Tipe Analitis
              </h3>
              <p className="text-gray-700">
                Logis, sistematis, dan objektif. Individu dengan tipe ini
                cenderung menyukai analisis mendalam dan pendekatan berbasis
                data.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll
              delay={0.4}
              className="border-l-4 border-blue-500 pl-4"
            >
              <h3 className="font-medium text-xl text-gray-800 mb-2">
                Tipe Diplomat
              </h3>
              <p className="text-gray-700">
                Empatis, kooperatif, dan harmonis. Individu dengan tipe ini
                cenderung menyukai kolaborasi dan memiliki keterampilan
                interpersonal yang baik.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll
              delay={0.5}
              className="border-l-4 border-green-500 pl-4"
            >
              <h3 className="font-medium text-xl text-gray-800 mb-2">
                Tipe Eksploratif
              </h3>
              <p className="text-gray-700">
                Kreatif, adaptif, dan fleksibel. Individu dengan tipe ini
                cenderung menyukai variasi dan pendekatan non-konvensional.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll
              delay={0.6}
              className="border-l-4 border-yellow-500 pl-4"
            >
              <h3 className="font-medium text-xl text-gray-800 mb-2">
                Tipe Eksekutif
              </h3>
              <p className="text-gray-700">
                Terorganisir, efisien, dan berorientasi hasil. Individu dengan
                tipe ini cenderung menyukai struktur dan implementasi praktis.
              </p>
            </AnimateOnScroll>
          </div>
        </AnimateOnScroll>

        {/* tentang pembuat */}
        <AnimateOnScroll
          delay={0.3}
          className="bg-white rounded-xl shadow-lg p-8 mb-10"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
              <AnimateOnScroll
                delay={0.4}
                className="w-48 h-48 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={(isInView) =>
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
              >
                <img
                  src="https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
                  alt="User profile"
                  className="w-full h-full object-cover"
                />
              </AnimateOnScroll>
            </div>
            <div className="md:w-2/3 md:pl-8">
              <AnimateOnScroll delay={0.5}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Tentang Pembuat
                </h2>
                <p className="text-gray-700 mb-4">
                  Website Tes Tipologi Institut STTS ini dikembangkan oleh
                  mahasiswa jurusan Informatika di Institut Sains dan Teknologi
                  Terpadu Surabaya (ISTTS).
                </p>
                <p className="text-gray-700 mb-4">
                  Sebagai bagian dari proyek akademik, Hanvy mengintegrasikan
                  pengetahuan dalam pengembangan web dengan teori psikologi
                  untuk menciptakan platform tes tipologi kepribadian yang mudah
                  diakses dan bermanfaat bagi banyak orang.
                </p>
              </AnimateOnScroll>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}

export default About;
