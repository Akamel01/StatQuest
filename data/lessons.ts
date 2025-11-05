import { Badge, Unit } from '../types';
import { BookOpen, Brain, Target } from 'lucide-react';

export const BADGES: Badge[] = [
    {
        id: 'beginner',
        name: 'Stats Novice',
        description: 'Completed your first topic!',
        icon: BookOpen,
        threshold: 50,
    },
    {
        id: 'adept',
        name: 'Stats Adept',
        description: 'Mastered 3 topics!',
        icon: Brain,
        threshold: 200,
    },
    {
        id: 'expert',
        name: 'Stats Expert',
        description: 'Reached 500 points!',
        icon: Target,
        threshold: 500,
    },
];

/**
 * Fetches the curriculum units from the JSON file.
 * This is an async function because it uses the fetch API.
 */
export const fetchUnits = async (): Promise<Unit[]> => {
  try {
    const response = await fetch('data/lessonContent.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.units as Unit[];
  } catch (error) {
    console.error("Could not fetch or parse lesson content:", error);
    throw new Error("Failed to load the curriculum. Please check the network connection and try again.");
  }
};