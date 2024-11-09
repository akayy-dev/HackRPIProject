import React from 'react';
import '../../styles/disabilities.css';

const Disabilities = ({ formData, updateFormData, onNext, onPrev }) => {
  const { disabilities } = formData;

  const handleChange = (disability) => {
    updateFormData({ disabilities: { ...disabilities, [disability]: !disabilities[disability] } });
  };

  return (
    <div className="disabilities">
      <h2>Select Disabilities</h2>
      {['wheelchair', 'deaf', 'blind'].map((dis) => (
        <label key={dis}>
          <input type="checkbox" checked={disabilities[dis]} onChange={() => handleChange(dis)} />
          {dis.charAt(0).toUpperCase() + dis.slice(1)}
        </label>
      ))}
      <input type="text" placeholder="Other disabilities" value={disabilities.otherDisabilities} onChange={(e) => updateFormData({ disabilities: { ...disabilities, otherDisabilities: e.target.value } })} />
      <button onClick={onPrev}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Disabilities;
