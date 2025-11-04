import React, { useState, useEffect, useCallback } from 'react';
import { TopicId, QuizQuestion } from '../types';
import { generateQuizQuestion, generateHint } from '../services/geminiService';
import { useUserProgress } from '../hooks/useUserProgress';
import { ArrowLeft, Lightbulb, Loader2, Sparkles, XCircle, CheckCircle } from 'lucide-react';
import Confetti from './Confetti';

interface QuizViewProps {
    topicId: TopicId;
    topicTitle: string;
    onBack: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ topicId, topicTitle, onBack }) => {
    const [question, setQuestion] = useState<QuizQuestion | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [hint, setHint] = useState<string | null>(null);
    const [isHintLoading, setIsHintLoading] = useState(false);

    const { addPoints, completeTopic } = useUserProgress();

    const fetchQuestion = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setQuestion(null);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setHint(null);
        try {
            const q = await generateQuizQuestion(topicTitle);
            setQuestion(q);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [topicTitle]);

    useEffect(() => {
        fetchQuestion();
    }, [fetchQuestion]);

    const handleAnswer = (optionIndex: number) => {
        if (isAnswered) return;
        setSelectedAnswer(optionIndex);
        setIsAnswered(true);
        if (question && optionIndex === question.correctOptionIndex) {
            addPoints(10);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
    };
    
    const handleNextQuestion = () => {
        fetchQuestion();
    };
    
    const handleFinish = () => {
        completeTopic(topicId);
        onBack();
    }
    
    const handleGetHint = async () => {
        if (!question) return;
        setIsHintLoading(true);
        try {
            const h = await generateHint(question.question, question.options);
            setHint(h);
        } catch (err) {
            setHint("Sorry, couldn't get a hint this time.");
        } finally {
            setIsHintLoading(false);
        }
    };
    
    const getButtonClass = (index: number) => {
        if (!isAnswered) {
            return "bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600";
        }
        if (index === question?.correctOptionIndex) {
            return "bg-green-500 border-green-500 text-white";
        }
        if (index === selectedAnswer) {
            return "bg-red-500 border-red-500 text-white";
        }
        return "bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400";
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="w-12 h-12 animate-spin text-primary-500" /></div>;
    }

    if (error) {
        return (
             <div className="text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button onClick={fetchQuestion} className="px-4 py-2 bg-primary-600 text-white rounded-md">Try Again</button>
            </div>
        );
    }
    
    if(!question) {
        return <div className="text-center">No question loaded.</div>
    }

    return (
        <div className="max-w-2xl mx-auto animate-slide-in relative">
            {showConfetti && <Confetti />}
            <button onClick={onBack} className="flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Topic
            </button>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-2xl">
                <h2 className="text-sm font-semibold uppercase text-primary-500 mb-2">{topicTitle} Quiz</h2>
                <p className="text-xl md:text-2xl font-medium mb-6">{question.question}</p>
                <div className="space-y-4">
                    {question.options.map((option, index) => (
                         <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            disabled={isAnswered}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 flex items-center justify-between ${getButtonClass(index)} ${!isAnswered ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                            <span className="font-medium">{option}</span>
                            {isAnswered && index === question.correctOptionIndex && <CheckCircle className="w-6 h-6"/>}
                            {isAnswered && index === selectedAnswer && index !== question.correctOptionIndex && <XCircle className="w-6 h-6"/>}
                        </button>
                    ))}
                </div>

                {isAnswered && (
                     <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-md animate-fade-in">
                        <h4 className="font-bold mb-2">Explanation</h4>
                        <p>{question.explanation}</p>
                    </div>
                )}
                
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                     <button
                        onClick={handleGetHint}
                        disabled={isAnswered || isHintLoading}
                        className="flex items-center text-amber-600 dark:text-amber-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Lightbulb className="w-4 h-4 mr-1" />
                        {isHintLoading ? "Getting hint..." : "Need a hint?"}
                    </button>
                    {isAnswered ? (
                         <button onClick={handleNextQuestion} className="px-5 py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 flex items-center">
                            Next Question <Sparkles className="w-4 h-4 ml-2" />
                        </button>
                    ) : null}
                </div>
                {hint && <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">{hint}</p>}
                
                <button onClick={handleFinish} className="w-full mt-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                    Finish & Return to Topic
                </button>
            </div>
        </div>
    );
};


export default QuizView;
