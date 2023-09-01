import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = () => {
  return (
    <div style={{display:'flex',justifyContent:'center',}}>
      <Spinner animation="border" role="status" />
    </div>
  );
};

export default LoadingSpinner;
