import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from '../types';

/**
 * Creates and returns a new GoogleGenAI client instance.
 * Throws an error if the API key is not available in the environment variables.
 */
const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("Gemini API key not found. Please ensure the API_KEY environment variable is set.");
    }
    return new GoogleGenAI({ apiKey });
};


const quizQuestionSchema = {
    type: Type.OBJECT,
    properties: {
        question: { type: Type.STRING, description: "The quiz question text." },
        options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of 4 possible answers."
        },
        correctOptionIndex: { type: Type.INTEGER, description: "The 0-based index of the correct answer in the options array." },
        explanation: { type: Type.STRING, description: "A brief explanation of why the correct answer is right." }
    },
    required: ["question", "options", "correctOptionIndex", "explanation"]
};

export const generateQuizQuestion = async (topic: string): Promise<QuizQuestion> => {
    try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a single, unique multiple-choice question about ${topic}. The question should be challenging but fair for a beginner. Provide 4 options.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: quizQuestionSchema,
                temperature: 0.8,
            }
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);

        // Basic validation
        if (
            !parsedJson.question ||
            !Array.isArray(parsedJson.options) ||
            parsedJson.options.length !== 4 ||
            typeof parsedJson.correctOptionIndex !== 'number'
        ) {
            throw new Error("Invalid quiz question format received from API.");
        }

        return parsedJson as QuizQuestion;
    } catch (error) {
        console.error("Error generating quiz question:", error);
        throw new Error("Failed to generate a new quiz question. The AI might be taking a break. Please try again.");
    }
};

export const generateTalkThrough = async (topic: string, content: string): Promise<string> => {
    try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Explain the following statistics concept in a very simple, fun, and conversational way, as if you were talking to a complete beginner. Use an analogy. The concept is "${topic}". Here is the textbook definition for context: "${content}"`,
            config: {
                temperature: 0.7,
                maxOutputTokens: 250,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating talk-through:", error);
        throw new Error("Could not get an AI explanation. Please check your API key and network connection.");
    }
};

export const generateHint = async (question: string, options: string[]): Promise<string> => {
    try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Provide a single, concise hint for the following multiple-choice question. Do not give away the answer. Question: "${question}" Options: ${options.join(', ')}`,
            config: {
                temperature: 0.5,
                maxOutputTokens: 50,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating hint:", error);
        throw new Error("Failed to get a hint. The AI seems to be stumped too!");
    }
};