import { useGet } from "../hooks/useGet";
import { Post } from "../components/Post";
import { Link } from 'react-router-dom';
export const Home = () => {
  const { data: Allads, loading, error } = useGet("ads");

  if (loading) return <p> Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div>
  <ul> 
    {Allads.map ( a => (
      <Link key={a.id} to={`/post/${a.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
    <Post key = {a.id} title= {a.title} description={a.description}/>
    </Link>
  ))}
  </ul>
  </div>
  );
}