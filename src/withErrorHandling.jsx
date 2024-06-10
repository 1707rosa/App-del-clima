import  { useState } from 'react';

function withErrorHandling(Component) {
  return function WrappedComponent(props) {
    const [error, setError] = useState(null);

    const handleError = (error) => {
      setError(error);
    };

    return (
      <>
        {error && <div className="error">{error.message}</div>}
        <Component {...props} onError={handleError} />
      </>
    );
  };
}

export default withErrorHandling;
