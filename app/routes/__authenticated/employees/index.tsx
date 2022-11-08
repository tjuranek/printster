export default function EmployeesIndex() {
  return (
    <div
      className="card w-full h-full flex justify-center items-center bg-base-300 shadow-xl"
      data-test-id="employee-selection-empty-state"
    >
      <p>No employee selected!</p>
    </div>
  );
}
