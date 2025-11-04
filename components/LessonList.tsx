import React, { useState } from 'react';
import { Unit, TopicId } from '../types';
import { CheckCircle2, Lock, ChevronDown, BookOpen, Target, FileText, FlaskConical } from 'lucide-react';

interface UnitListViewProps {
    units: Unit[];
    completedTopics: TopicId[];
    onSelectTopic: (topicId: TopicId) => void;
}

const UnitListView: React.FC<UnitListViewProps> = ({ units, completedTopics, onSelectTopic }) => {
    const [expandedUnits, setExpandedUnits] = useState<number[]>([0]); // Expand the first unit by default

    const toggleUnit = (unitNumber: number) => {
        setExpandedUnits(prev =>
            prev.includes(unitNumber)
                ? prev.filter(n => n !== unitNumber)
                : [...prev, unitNumber]
        );
    };

    return (
        <div className="space-y-4 animate-fade-in">
            {units.map(unit => {
                const isExpanded = expandedUnits.includes(unit.unitNumber);
                const topicsInUnit = unit.coreTopics.length;
                const completedInUnit = unit.coreTopics.filter(t => completedTopics.includes(t.id)).length;
                const unitProgress = topicsInUnit > 0 ? (completedInUnit / topicsInUnit) * 100 : 0;

                return (
                    <div key={unit.unitNumber} className="bg-white dark:bg-slate-800 rounded-lg shadow-md transition-all duration-300">
                        <div
                            className="flex justify-between items-center p-4 cursor-pointer"
                            onClick={() => toggleUnit(unit.unitNumber)}
                        >
                            <div className="flex-1">
                                <div className="flex items-center space-x-4">
                                    <span className="text-xl font-bold text-primary-500">Unit {unit.unitNumber}</span>
                                    <h2 className="text-xl font-bold">{unit.title}</h2>
                                </div>
                                <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${unitProgress}%` }}></div>
                                </div>
                            </div>
                            <ChevronDown className={`w-6 h-6 text-slate-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>

                        {isExpanded && (
                            <div className="p-4 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                                        <h4 className="font-semibold flex items-center mb-2"><Target className="w-4 h-4 mr-2 text-primary-500" />Objectives</h4>
                                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                                            {unit.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                                        <h4 className="font-semibold flex items-center mb-2"><BookOpen className="w-4 h-4 mr-2 text-primary-500" />Prerequisites</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{unit.prereqs}</p>
                                        <h4 className="font-semibold flex items-center mt-4 mb-2"><FileText className="w-4 h-4 mr-2 text-primary-500" />References</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{unit.references}</p>
                                        <h4 className="font-semibold flex items-center mt-4 mb-2"><FlaskConical className="w-4 h-4 mr-2 text-primary-500" />Assessment</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{unit.assessment}</p>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold mb-3">Core Topics</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {unit.coreTopics.map(topic => {
                                        const isCompleted = completedTopics.includes(topic.id);
                                        return (
                                            <div
                                                key={topic.id}
                                                onClick={() => onSelectTopic(topic.id)}
                                                className={`p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow cursor-pointer transform hover:-translate-y-0.5 ${isCompleted ? 'bg-green-50 dark:bg-green-900/30' : 'bg-slate-100 dark:bg-slate-700'}`}
                                            >
                                                <h4 className="font-semibold">{topic.title}</h4>
                                                <div className="mt-2 flex justify-end">
                                                    {isCompleted ? (
                                                        <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                                                            <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400">
                                                            <Lock className="w-3 h-3 mr-1" /> Start Topic
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default UnitListView;
