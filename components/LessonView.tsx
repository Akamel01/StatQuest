// FIX: Implement the LessonView component to display topic details and integrate AI features.
import React, { useState, useEffect, useMemo } from 'react';
import { Topic } from '../types';
import { generateTalkThrough } from '../services/geminiService';
import InteractiveNormalDistribution from './InteractiveNormalDistribution';
import { ArrowLeft, BrainCircuit, Loader2, Sparkles } from 'lucide-react';

// Extend the Window interface to include MathJax for TypeScript
declare global {
    interface Window {
        MathJax?: {
            typesetPromise: () => Promise<void>;
        };
    }
}

interface TopicViewProps {
    topic: Topic;
    onBack: () => void;
    onStartQuiz: () => void;
}

// A simple utility to parse basic markdown-like syntax into HTML
const parseContent = (content: string) => {
    if (!content) return '';
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
        .replace(/\\n/g, '<br />'); // Newlines
};


const TopicView: React.FC<TopicViewProps> = ({ topic, onBack, onStartQuiz }) => {
    const [aiExplanation, setAiExplanation] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const renderedContent = useMemo(() => parseContent(topic.content), [topic.content]);

    useEffect(() => {
        // When the topic content changes, we need to tell MathJax to look for
        // new LaTeX to typeset. A small delay ensures the DOM has been updated.
        const timeoutId = setTimeout(() => {
            if (window.MathJax) {
                window.MathJax.typesetPromise().catch((err) => console.error('MathJax typesetting failed:', err));
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [renderedContent]); // Re-run this effect whenever the rendered content changes

    const handleGenerateExplanation = async () => {
        setIsGenerating(true);
        setError(null);
        setAiExplanation(null);
        try {
            const explanation = await generateTalkThrough(topic.title, topic.content);
            setAiExplanation(explanation);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-slide-in">
            <button onClick={onBack} className="flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Topics
            </button>
            
            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-lg shadow-xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{topic.title}</h1>
                
                <div className="prose prose-slate dark:prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: renderedContent }} />

                {topic.chart === 'normal_distribution' && (
                    <div className="my-8">
                        <InteractiveNormalDistribution />
                    </div>
                )}
                
                <div className="my-8 border-t border-slate-200 dark:border-slate-700"></div>

                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <BrainCircuit className="h-6 w-6 text-primary-500" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">Need a simpler explanation?</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                Let our AI guide walk you through this concept with a simple analogy.
                            </p>
                            <button
                                onClick={handleGenerateExplanation}
                                disabled={isGenerating}
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : "Explain It Simply"}
                            </button>
                        </div>
                    </div>
                </div>

                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                
                {aiExplanation && (
                    <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-md animate-fade-in">
                        <h4 className="font-bold mb-2 flex items-center"><Sparkles className="w-4 h-4 mr-2 text-yellow-500" /> AI Explanation</h4>
                        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{aiExplanation}</p>
                    </div>
                )}
                
                <div className="mt-8 text-center">
                    <button 
                        onClick={onStartQuiz} 
                        className="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105"
                    >
                        Ready for a Quiz?
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopicView;