import React from 'react';
import '../../styles/dietaryPreferences.css';

const DietaryPreferences = ({ formData, updateFormData, onNext, onPrev }) => {
  const { dietaryPreferences } = formData;

  const handleChange = (preference) => {
    updateFormData({ dietaryPreferences: { ...dietaryPreferences, [preference]: !dietaryPreferences[preference] } });
  };

  return (
    <div className="dietary-preferences">
      <h2>Select Dietary Preferences</h2>
      {['vegetarian', 'pescetarian', 'vegan', 'dairyFree', 'glutenFree', 'kosher', 'halal', 'nutAllergies', 'soyAllergies', 'seafoodAllergies'].map((pref) => (
        <label key={pref}>
          <input type="checkbox" checked={dietaryPreferences[pref]} onChange={() => handleChange(pref)} />
          {pref.charAt(0).toUpperCase() + pref.slice(1)}
        </label>
      ))}
      <input type="text" placeholder="Other allergies" value={dietaryPreferences.otherAllergies} onChange={(e) => updateFormData({ dietaryPreferences: { ...dietaryPreferences, otherAllergies: e.target.value } })} />
      <button onClick={onPrev}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default DietaryPreferences;
