export default function Movie({ params }: { params: { id: string } }) {
  return <div>My Post: {params.id}</div>;
}
