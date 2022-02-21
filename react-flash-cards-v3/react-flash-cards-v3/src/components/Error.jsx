export default function Error({ children: error = '' }) {
  return <div className="font-semibold  p-1 text-red-900">{error}</div>;
}
