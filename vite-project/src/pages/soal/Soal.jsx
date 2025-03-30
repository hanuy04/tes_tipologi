import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Soal = ({ userData }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Menyimpan jawaban user
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/soal.txt")
      .then((response) => response.text())
      .then((text) => {
        const parsedQuestions = text
          .trim()
          .split("\n")
          .map((line) => {
            const parts = line.split(";");
            return {
              question: parts[0],
              options: parts.slice(1),
            };
          });
        setQuestions(parsedQuestions);
      })
      .catch((error) => console.error("Error fetching file:", error));
  }, []);

  // Menyimpan jawaban yang dipilih user dalam format A atau B
  const handleAnswer = (questionIndex, optionIndex) => {
    console.log(answers);
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex === 0 ? "A" : "B",
    }));
  };

  // Pindah ke soal berikutnya
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Kirim jawaban ke backend setelah soal terakhir
  const handleSubmit = async () => {
    if (!userData) {
      alert("Data user tidak ditemukan!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/submit-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          answers,
        }),
      });

      if (!response.ok) throw new Error("Gagal menyimpan jawaban!");

      const result = await response.json();
      alert(`Jawaban berhasil disimpan!`);

      // Navigasi ke halaman hasil dengan result sebagai parameter
      navigate(`/hasil-tes-tipologi?result=${encodeURIComponent(result)}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
          Soal Tipologi
        </h2>
        {questions.length > 0 ? (
          <div>
            <p className="text-lg font-medium text-gray-800 mb-4">
              {currentQuestionIndex + 1}.{" "}
              {questions[currentQuestionIndex].question}
            </p>
            <div className="space-y-2">
              {questions[currentQuestionIndex].options.map((option, i) => (
                <label
                  key={i}
                  className={`flex items-center space-x-3 bg-gray-50 p-2 rounded-md hover:bg-gray-200 cursor-pointer transition ${
                    answers[currentQuestionIndex] === (i === 0 ? "A" : "B")
                      ? "bg-blue-200"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={i === 0 ? "A" : "B"}
                    checked={
                      answers[currentQuestionIndex] === (i === 0 ? "A" : "B")
                    }
                    onChange={() => handleAnswer(currentQuestionIndex, i)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="mt-5 w-full py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-5 w-full py-2 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700 transition"
              >
                {loading ? "Submitting..." : "Submit Jawaban"}
              </button>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Soal;
