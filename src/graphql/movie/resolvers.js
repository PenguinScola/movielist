import movies from '../../../data/movies.json'
import compareAsc from 'date-fns/compare_asc'
import parse from 'date-fns/parse'

const movieResolver = {
    Query : {
        movielist : (movie, { releaseDate }) => {

            const result = movies.data.filter((item) => {
                return compareAsc(parse(releaseDate), parse(item.releaseDate)) > -1
            })
            return result
            
        }
    }
}

export default movieResolver