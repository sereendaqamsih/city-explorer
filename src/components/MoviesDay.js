import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movies from './Movies';

class MoviesDay extends React.Component{
    render(){
    return (<>
    < Movies Moviesdayinfo={this.props.moviesInfo}/>
    </>
    )
    }}
    export default MoviesDay;