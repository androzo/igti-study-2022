export default function Error({ children: errorMessage }) {
  return (
    <div className="bg-red-300 text-red-900 font-semibold text-center p-2 m-4">
      {errorMessage}
    </div>
  );
}
