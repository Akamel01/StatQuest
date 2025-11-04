import React, { useState } from 'react';
import { Topic } from '../types';
import { ArrowLeft, BrainCircuit, Rocket } from 'lucide-react';
import { generateTalkThrough } from '../services/geminiService';
import InteractiveNormalDistribution from './InteractiveNormalDistribution';

interface TopicViewProps {
    topic: Topic;
    onBack: () => void;
    onStartQuiz: () => void;
}

const TopicView: React.FC<TopicViewProps> = ({ topic, onBack, onStartQuiz }) => {
    const [aiExplanation, setAiExplanation] = useState('');
    const [isLoadingAi, setIsLoadingAi] = useState(false);
    const [error, setError] = useState('');

    const handleGetAiExplanation = async () => {
        setIsLoadingAi(true);
        setError('');
        try {
            const explanation = await generateTalkThrough(topic.title, topic.content);
            setAiExplanation(explanation);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoadingAi(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-slide-in">
            <button onClick={onBack} className="flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Unit List
            </button>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{topic.title}</h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                    {topic.content}
                </p>

                {topic.chart === 'normal_distribution' && (
                    <div className="my-8">
                       <InteractiveNormalDistribution />
                    </div>
                )}
                
                <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
                    <button 
                        onClick={handleGetAiExplanation}
                        disabled={isLoadingAi}
                        className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-amber-500 text-white rounded-md font-semibold hover:bg-amber-600 transition-colors disabled:bg-amber-300 disabled:cursor-not-allowed"
                    >
                        <BrainCircuit className="w-5 h-5 mr-2" />
                        {isLoadingAi ? 'AI is thinking...' : "Explain it Like I'm 5"}
                    </button>
                    {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                    {aiExplanation && (
                        <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-md animate-fade-in">
                            <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap">{aiExplanation}</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <button onClick={onStartQuiz} className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg font-bold text-lg hover:bg-primary-700 transition-transform transform hover:scale-105">
                        <Rocket className="w-6 h-6 mr-3" />
                        Take the Quiz!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopicView;
