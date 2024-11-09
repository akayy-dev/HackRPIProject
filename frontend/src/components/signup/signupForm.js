// src/components/signup/signupForm.js

import React, { useState } from 'react';
import '../../styles/signupForm.css';

const SignupForm = ({ onLogin, setNotification }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState({
    vegetarian: false,
    pescetarian: false,
    vegan: false,
    dairyFree: false,
    glutenFree: false,
    kosher: false,
    halal: false,
    nutAllergies: false,
    soyAllergies: false,
    seafoodAllergies: false,
    otherAllergies: '',
  });
  const [disabilities, setDisabilities] = useState({
    wheelchair: false,
    deaf: false,
    blind: false,
    otherDisabilities: '',
  });

  const handleNextStep = () => {
    if (step === 1 && password !== confirmPassword) {
      setNotification({ message: 'Passwords do not match!', type: 'error' });
      return;
    }
    setStep(step + 1);
  };

  const handleSignup = () => {
    sessionStorage.setItem(
      'user',
      JSON.stringify({ username, password, dietaryPreferences, disabilities })
    );
    onLogin(); // Log in after successful signup
  };

  return (
    <div className="signup-form">
      {step === 1 && (
        <>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button onClick={handleNextStep}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Dietary Preferences</h2>
          {Object.keys(dietaryPreferences).map((preference) => (
            <label key={preference}>
              <input
                type="checkbox"
                checked={dietaryPreferences[preference]}
                onChange={() =>
                  setDietaryPreferences({
                    ...dietaryPreferences,
                    [preference]: !dietaryPreferences[preference],
                  })
                }
              />
              {preference.charAt(0).toUpperCase() + preference.slice(1)}
            </label>
          ))}
          <input
            type="text"
            placeholder="Other allergies"
            value={dietaryPreferences.otherAllergies}
            onChange={(e) =>
              setDietaryPreferences({
                ...dietaryPreferences,
                otherAllergies: e.target.value,
              })
            }
          />
          <button onClick={() => setStep(step - 1)}>Back</button>
          <button onClick={handleNextStep}>Next</button>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Disabilities</h2>
          {Object.keys(disabilities).map((disability) => (
            <label key={disability}>
              <input
                type="checkbox"
                checked={disabilities[disability]}
                onChange={() =>
                  setDisabilities({
                    ...disabilities,
                    [disability]: !disabilities[disability],
                  })
                }
              />
              {disability.charAt(0).toUpperCase() + disability.slice(1)}
            </label>
          ))}
          <input
            type="text"
            placeholder="Other disabilities"
            value={disabilities.otherDisabilities}
            onChange={(e) =>
              setDisabilities({
                ...disabilities,
                otherDisabilities: e.target.value,
              })
            }
          />
          <button onClick={() => setStep(step - 1)}>Back</button>
          <button onClick={handleSignup}>Complete Signup</button>
        </>
      )}
    </div>
  );
};

export default SignupForm;
