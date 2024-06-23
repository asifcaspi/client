const RegisterForm = ({ handleSubmit, formData, handleChange }) => {
  return (
    <div className="form-box">
      <form onSubmit={handleSubmit} className="form-content">
        <input
          value={formData.username}
          type="text"
          onChange={handleChange}
          name="username"
          placeholder="שם משתמש"
          id="username"
          required
          className="form-item text-right"
        />
        <input
          value={formData.email}
          type="text"
          onChange={handleChange}
          autoComplete="email"
          name="email"
          placeholder="אימייל"
          id="email"
          required
          className="form-item text-right"
        />
        <input
          type="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          name="password"
          placeholder="סיסמה"
          id="password"
          required
          className="form-item text-right"
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="form-submit-btn"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
