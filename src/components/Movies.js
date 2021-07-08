import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Card from 'react-bootstrap/Card';




class Movies extends React.Component{
    render(){
        return(
            <div>

<p> movies {this.props.Moviesdayinfo.map((ele,index)=>
{
    return(
        <div>
            <p> Title: {ele.original_title} </p>
            <p>Views: {ele.overview}</p>
            <p>Average votes:{ele.vote_average}</p>
            <p>vote Count: {ele.vote_count}</p>
            {/* <img src={`https://image.tmdb.org/t/p/w500/${ele.poster_path}`} alt={ele.title} /> */}
         <p>popularity: {ele.popularity}</p>
         <p>release_date: {ele.release_date}</p>
        </div>
    )
}
)}</p>

            </div>

        )
    }
}

export default Movies;