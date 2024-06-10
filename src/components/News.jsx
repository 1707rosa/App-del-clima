import { useMemo } from 'react';
import PropTypes from 'prop-types';

function News({ data, preferences }) {
  const filteredNews = useMemo(() => {
    if (preferences.categories.length === 0) return data;
    return data.filter(article => 
      preferences.categories.some(category => article.title.toLowerCase().includes(category.toLowerCase()))
    );
  }, [data, preferences]);

  if (!data.length) return <div>Cargando noticias...</div>;

  return (
    <div style={{ alignContent: "center" }}>
      <h2>Noticias Recientes</h2>
      {filteredNews.length === 0 ? (
        <p>No hay noticias en estas categorías.</p>
      ) : (
        filteredNews.map((article, index) => (
          <div key={index} className="news-article">
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="news-image" />
            )}
            <div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <small>{article.source.name}</small>
              <br />
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
                Leer más
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

News.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      source: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      category: PropTypes.string,
      urlToImage: PropTypes.string,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  preferences: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default News;
