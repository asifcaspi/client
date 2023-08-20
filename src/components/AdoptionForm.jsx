import React from "react";

const AdoptionForm = ({ handleSubmit, formData, handleChange }) => {
  return (
    <div dir="rtl" className="form-box">
      <form onSubmit={handleSubmit} className="form-content">
        <input
          value={formData.name}
          type="text"
          onChange={handleChange}
          name="name"
          placeholder="שם"
          id="name"
          required
          className="form-item"
        />
        <input
          value={formData.description}
          type="text"
          onChange={handleChange}
          name="description"
          placeholder="תיאור"
          id="description"
          required
          className="form-item"
        />
        <input
          value={formData.category_name}
          type="text"
          onChange={handleChange}
          name="category_name"
          placeholder="סוג החיה"
          id="category_name"
          required
          className="form-item"
        />
        <input
          value={formData.image}
          type="text"
          onChange={handleChange}
          name="image"
          placeholder="קישור לתמונה"
          id="image"
          required
          className="form-item"
        />

        <input
          value={formData.age}
          type="number"
          onChange={handleChange}
          name="age"
          placeholder="גיל בחודשים"
          id="age"
          required
          className="form-item"
        />
        <select
          value={formData.sex}
          onChange={handleChange}
          name="sex"
          id="sex"
          className="select-input"
        >
          <option value="male">זכר</option>
          <option value="female">נקבה</option>
          <option value="other">אחר</option>
        </select>
        <button
          onClick={handleSubmit}
          type="submit"
          className="form-submit-btn"
        >
          רשום חיה
        </button>
      </form>
    </div>
  );
};

export default AdoptionForm;
