import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bg from "./assets/quizbg.jpg"

// Welcome Component
const Welcome = ({ onStart }) => {
  return (
    <div className="w-screen h-screen relative flex items-center justify-center overflow-hidden">
      <img 
        src={bg} 
        alt="" 
        className="absolute inset-0 w-full h-full z-0"
      />
      <div className="relative z-10 text-center p-10 rounded-xl">
        <h1 className="text-6xl font-bold text-white mb-8">Math Quiz</h1>
        <button 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
          onClick={onStart}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

// SetDifficulty Component
const SetDifficulty = ({ onSetDifficulty }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
      <div className="shadow-xl rounded-xl p-8 bg-white max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Set Difficulty</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button 
            className="bg-green-400 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-all duration-200 cursor-pointer"
            onClick={() => onSetDifficulty('easy')}
          >
            Easy
          </button>
          <button 
            className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-4 rounded-lg transition-all duration-200 cursor-pointer"
            onClick={() => onSetDifficulty('medium')}
          >
            Medium
          </button>
          <button 
            className="bg-red-400 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-all duration-200 cursor-pointer"
            onClick={() => onSetDifficulty('hard')}
          >
            Hard
          </button>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Rules:</h3>
          <ul className="list-disc pl-5">
            <li className="mb-1">You will have 20 seconds for each question</li>
            <li className="mb-1">Each question has only one correct answer</li>
            <li className="mb-1">The quiz consists of 10 questions</li>
            <li>If time runs out, you will automatically move to the next question</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Game Component
const Game = ({ difficulty, onGameComplete, showToast }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [questions, setQuestions] = useState([]);
  const [isTimerActive, setIsTimerActive] = useState(true);
  
  // Generate questions based on difficulty
  useEffect(() => {
    setQuestions(generateQuestions(difficulty));
  }, [difficulty]);
  
  const generateQuestions = (difficulty) => {
    // Static array of quiz questions instead of dynamically generated math equations
    const allQuestions = {
      easy: [
        {
          question: "What is the shape with 3 sides called?",
          options: ["Triangle", "Square", "Rectangle", "Circle"],
          answer: "Triangle"
        },
        {
          question: "What is 5 + 7?",
          options: ["10", "11", "12", "13"],
          answer: "12"
        },
        {
          question: "How many sides does a square have?",
          options: ["3", "4", "5", "6"],
          answer: "4"
        },
        {
          question: "What is half of 16?",
          options: ["4", "6", "8", "12"],
          answer: "8"
        },
        {
          question: "Which number comes after 9?",
          options: ["8", "10", "11", "12"],
          answer: "10"
        },
        {
          question: "What is 4 × 3?",
          options: ["7", "10", "12", "15"],
          answer: "12"
        },
        {
          question: "What is the name of a shape with 8 sides?",
          options: ["Hexagon", "Octagon", "Pentagon", "Decagon"],
          answer: "Octagon"
        },
        {
          question: "What is 20 - 5?",
          options: ["10", "15", "18", "25"],
          answer: "15"
        },
        {
          question: "How many hours are in a day?",
          options: ["12", "18", "24", "36"],
          answer: "24"
        },
        {
          question: "What is 3 × 5?",
          options: ["8", "12", "15", "18"],
          answer: "15"
        }
      ],
      medium: [
        {
          question: "If a triangle has angles of 30° and 60°, what is the third angle?",
          options: ["60°", "80°", "90°", "120°"],
          answer: "90°"
        },
        {
          question: "What is the perimeter of a square with sides of length 5cm?",
          options: ["10cm", "15cm", "20cm", "25cm"],
          answer: "20cm"
        },
        {
          question: "What is the area of a rectangle with length 8m and width 6m?",
          options: ["14m²", "24m²", "40m²", "48m²"],
          answer: "48m²"
        },
        {
          question: "What is the next number in the sequence: 2, 4, 8, 16, ...?",
          options: ["24", "30", "32", "36"],
          answer: "32"
        },
        {
          question: "If 3x + 7 = 22, what is x?",
          options: ["3", "5", "7", "15"],
          answer: "5"
        },
        {
          question: "What is 15% of 80?",
          options: ["8", "12", "15", "18"],
          answer: "12"
        },
        {
          question: "A car travels 120 miles in 2 hours. What is its speed?",
          options: ["40 mph", "50 mph", "60 mph", "70 mph"],
          answer: "60 mph"
        },
        {
          question: "If the sum of two consecutive integers is 25, what is the larger integer?",
          options: ["12", "13", "14", "15"],
          answer: "13"
        },
        {
          question: "What is the value of π (pi) rounded to two decimal places?",
          options: ["3.10", "3.14", "3.16", "3.18"],
          answer: "3.14"
        },
        {
          question: "If a = 3 and b = 4, what is a² + b²?",
          options: ["7", "12", "25", "49"],
          answer: "25"
        }
      ],
      hard: [
        {
          question: "What is the Pythagorean theorem?",
          options: ["a + b = c", "a × b = c²", "a² + b² = c²", "a³ + b³ = c³"],
          answer: "a² + b² = c²"
        },
        {
          question: "What is the sum of the angles in a hexagon?",
          options: ["360°", "540°", "720°", "1080°"],
          answer: "720°"
        },
        {
          question: "Which famous mathematician is known for his work on calculus alongside Newton?",
          options: ["Gauss", "Euler", "Leibniz", "Pascal"],
          answer: "Leibniz"
        },
        {
          question: "What is the formula for the volume of a sphere?",
          options: ["4πr²", "πr²h", "4/3πr³", "2πr"],
          answer: "4/3πr³"
        },
        {
          question: "If log₁₀(x) = 2, what is x?",
          options: ["20", "100", "200", "1000"],
          answer: "100"
        },
        {
          question: "In statistics, what measures the spread of data around the mean?",
          options: ["Median", "Mode", "Range", "Standard Deviation"],
          answer: "Standard Deviation"
        },
        {
          question: "What is the value of sin(30°)?",
          options: ["0", "0.5", "1", "√3/2"],
          answer: "0.5"
        },
        {
          question: "What is the product of the first 5 prime numbers?",
          options: ["120", "210", "2310", "30030"],
          answer: "2310"
        },
        {
          question: "What is the limit of (1+1/n)ⁿ as n approaches infinity?",
          options: ["1", "2", "e", "π"],
          answer: "e"
        },
        {
          question: "Which number is both a square and a cube?",
          options: ["16", "64", "36", "49"],
          answer: "64"
        }
      ]
    };
    
    return allQuestions[difficulty];
  };
  
  // Effect to handle timer
  useEffect(() => {
    if (questions.length === 0 || !isTimerActive) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Time's up - automatically move to next question
          moveToNextQuestion(false);
          return 20; // Reset timer for next question
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestion, questions, isTimerActive]);

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  
  // Function to move to next question
  const moveToNextQuestion = (checkAnswer = true) => {
    // Check if the selected answer is correct if this wasn't an auto-move
    if (checkAnswer && selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    // Move to the next question or end the game
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(''); // Reset selection
      setTimeLeft(20); // Reset timer
    } else {
      // If this is the last question, calculate final score
      let finalScore = score;
      if (checkAnswer && selectedOption === questions[currentQuestion].answer) {
        finalScore += 1;
      }
      setIsTimerActive(false); // Stop the timer
      onGameComplete(finalScore);
    }
  };
  
  // Handle next button click
  const handleNextQuestion = () => {
    if (questions.length === 0) return;
    
    // Check if an option is selected
    if (selectedOption === '') {
      showToast("Please select an answer before continuing");
      return;
    }
    
    moveToNextQuestion(true);
  };
  
  if (questions.length === 0) {
    return <div className="w-screen h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
      <div className="shadow-xl rounded-xl p-8 bg-white max-w-xl mx-auto relative">
        <div className="absolute top-4 right-4 text-red-500 font-bold">
          Time: {timeLeft}s
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Question {currentQuestion + 1} of 10</h2>
        
        <div className="mb-8 text-xl">{questions[currentQuestion].question}</div>
        
        <div className="grid grid-cols-1 gap-4 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`p-4 border rounded-lg text-left transition-all ${
                selectedOption === option 
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button
            className={`py-2 px-6 rounded-lg font-bold ${
              selectedOption !== '' 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            } transition-all`}
            onClick={handleNextQuestion}
            disabled={selectedOption === ''}
          >
            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Result Component
const Result = ({ score, onPlayAgain }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
      <div className="shadow-xl rounded-xl p-8 bg-white max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
        
        <div className="text-xl mb-8">
          You have scored <span className="font-bold text-green-500">{score}</span> right out of <span className="font-bold">10</span>
        </div>
        
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

function Quiz() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [difficulty, setDifficulty] = useState('');
  const [score, setScore] = useState(0);
  
  const handleStart = () => {
    setCurrentScreen('setDifficulty');
  };
  
  const handleSetDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentScreen('game');
  };
  
  const handleGameComplete = (finalScore) => {
    setScore(finalScore);
    setCurrentScreen('result');
  };
  
  const handlePlayAgain = () => {
    setCurrentScreen('welcome');
    setDifficulty('');
    setScore(0);
  };

  const showToast = (message) => {
    toast.info(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  
  return (
    <div>
      <ToastContainer />
      
      {currentScreen === 'welcome' && (
        <Welcome onStart={handleStart} />
      )}
      
      {currentScreen === 'setDifficulty' && (
        <SetDifficulty onSetDifficulty={handleSetDifficulty} />
      )}
      
      {currentScreen === 'game' && (
        <Game 
          difficulty={difficulty} 
          onGameComplete={handleGameComplete}
          showToast={showToast}
        />
      )}
      
      {currentScreen === 'result' && (
        <Result score={score} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
}

export default Quiz;