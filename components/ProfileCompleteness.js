import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

const ProfileCompleteness = ({ profile }) => {
  const safeProfile = profile || {};
  
  const requiredFields = [
    { key: "tagline", label: "Professional Tagline" },
    { key: "bio", label: "About Me" },
    { key: "phoneNumber", label: "Contact Number" },
    { key: "address", label: "Location" },
    { key: "hobbies", label: "Interests & Hobbies" },
    { key: "languages", label: "Languages" },
    { key: "picture", label: "Profile Picture" }
  ];
  
  const fieldStatus = requiredFields.map(field => {
    const fieldValue = safeProfile[field.key];
    const isComplete = Array.isArray(fieldValue) 
      ? fieldValue?.length > 0 
      : typeof fieldValue === "string" 
        ? fieldValue?.trim().length > 0 
        : false;
    
    return {
      ...field,
      isComplete
    };
  });
  
  const completedCount = fieldStatus.filter(field => field.isComplete).length;
  const completenessPercentage = (completedCount / requiredFields.length) * 100;
  const isComplete = completedCount === requiredFields.length;
  
  const getStatusColor = () => {
    if (completenessPercentage >= 100) return "text-emerald-500";
    if (completenessPercentage >= 70) return "text-amber-500";
    return "text-rose-500";
  };
  
  const getStatusMessage = () => {
    if (completenessPercentage >= 100) return "Complete";
    if (completenessPercentage >= 70) return "Almost there!";
    if (completenessPercentage >= 40) return "Getting started";
    return "Incomplete";
  };

  return (
    <div className="bg-white text-xs dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="flex font-bold items-center justify-between mb-3">
        <h3 className="text-xs font-medium">Profile Completion</h3>
        <div className={`flex items-center text-xs gap-1 font-medium ${getStatusColor()}`}>
          {isComplete ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{getStatusMessage()}</span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ease-in-out ${
              isComplete 
                ? "bg-emerald-500" 
                : completenessPercentage >= 70 
                  ? "bg-amber-500" 
                  : "bg-rose-500"
            }`}
            style={{ width: `${completenessPercentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0%</span>
          <span>{completenessPercentage.toFixed(0)}% complete</span>
          <span>100%</span>
        </div>
      </div>
      
      <div className="grid text-xs grid-cols-1 md:grid-cols-2 gap-2">
        {fieldStatus.map((field, index) => (
          <div key={index} className="flex text-xs items-center gap-2">
            <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
              field.isComplete ? "bg-emerald-100 dark:bg-emerald-900" : "bg-gray-100 dark:bg-gray-700"
            }`}>
              {field.isComplete ? (
                <Check size={14} className="text-emerald-500" />
              ) : (
                <X size={14} className="text-gray-400" />
              )}
            </div>
            <span className={`text-sm ${field.isComplete ? "text-gray-700 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"}`}>
              {field.label}
            </span>
          </div>
        ))}
      </div>
      
      {!isComplete && (
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            Complete your profile →
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCompleteness;