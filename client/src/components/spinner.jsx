import "./LoadingSpinner.css";

const LoadingSpinner = ({ size = 48 }) => {
  return (
    <div className="spinner-wrapper">
      <div
        className="spinner"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default LoadingSpinner;
