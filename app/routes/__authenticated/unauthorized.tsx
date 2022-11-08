import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div>
      <h2 className="text-xl">You aren't authorized to access that!</h2>

      <p className="text-sm text-gray-500 mt-1">
        Please contact your administrator to gain access.
      </p>

      <button
        className="btn btn-primary btn-compact mt-4"
        data-test-id="navigate-back"
        onClick={goBack}
      >
        Go Back
      </button>
    </div>
  );
}
