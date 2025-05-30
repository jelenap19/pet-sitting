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
    {Allads.map ( ad => (
      <Link key={ad.id} to={`/post/${ad.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
    <Post key = {ad.id} title= {ad.title} description={ad.description}/>
    </Link>
  ))}
  </ul>
  </div>
  );
}