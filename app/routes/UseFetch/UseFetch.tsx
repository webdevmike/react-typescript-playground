import useFetch from "./useFetch";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function UseFetch() {
  const { data, loading, error } = useFetch<Post>(
    "https://jsonplaceholder.typicode.com/posts/1",
  );

  return (
    <>
      <h1>Use Fetch</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <ul>
          <li>userId: {data.userId}</li>
          <li>id: {data.id}</li>
          <li>title: {data.title}</li>
          <li>body: {data.body}</li>
        </ul>
      )}
    </>
  );
}
