import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import SuperheroDetail from '../components/SuperheroDetail'

const SuperheroDetailPage = () => {
   const {superheroId} = useParams()
   

    return (
        <div>
            <h2>Superhero Detail for </h2>
            <SuperheroDetail superheroId={superheroId} />
            <Link to={`/superhero/${superheroId}/edit`}>Edit</Link>
        </div>
    );
}
 
export default SuperheroDetailPage;