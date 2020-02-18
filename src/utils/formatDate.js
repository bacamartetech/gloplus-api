export default function formatDate(date) {
  const year = date.toString().substring(0, 4);
  const month = date.toString().substring(4, 6);
  const day = date.toString().substring(6, 8);

  return `${day}/${month}/${year}`;
}
