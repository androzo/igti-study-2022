export default function Item({ children }) {
  const { id, name } = children;
  return <option id={id}>{name}</option>;
}
