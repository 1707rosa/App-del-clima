import PropTypes from 'prop-types';

function Preferences({ preferences, setPreferences }) {
  const handleCategoryChange = (category) => {
    setPreferences((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  return (
    <div>
      <h2>Categorías de noticias</h2>
      <div>
        {[ 'business', 'sports', 'entertainment', 'health', 'science'].map(category => (
          <label key={category}>
            <input
              type="checkbox"
              checked={preferences.categories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}

Preferences.propTypes = {
  preferences: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setPreferences: PropTypes.func.isRequired,
};

export default Preferences;
