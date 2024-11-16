import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';



const News =(props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  
  const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase()+ string.slice(1);
  }

  const UpdateNews = async ()=>{
    const url = `https://newsapi.org/v2/top-headlines?country =${props.country}&category=${props.category}&apiKey=9cd59562248d4e248ef61b1704b68bd5&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    const data = await fetch(url);
    console.log("data fetching")
    const parsedData =  await  data.json();
    console.log(parsedData)
    setArticles(parsedData.articles);
    setLoading(false);
  }
  useEffect (()=>{
    document.title= `${capitalizeFirstLetter(props.category)}-NewsMonkey`
    UpdateNews();
  });

  const handlePrevClick =async () => {
    setPage(page-1);
    UpdateNews();
  }

  const handleNextClick = async () => {
    setPage(page+1);
    UpdateNews();
  }

    return (
      <div>
        <div className='container my-3'>
        <h1 className='text-center'>News Monkey Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <div className='row my-3'>
        {/* {console.log("state.articles",  articles)} */}
        {articles.map((element)=> {
          return <div className='col-md-4' key ={element.url}>
            <NewsItem  title = {element.title?element.title.slice(0,45):""} 
            description = {element.description?element.description.slice(0,100):""} 
            imageurl = {element.urlToImage} newsurl ={element.url } 
            author = {element.author?element.author:"Unknown"} 
            publishedAt = {element.publishedAt} source ={element.source.name}/>
          </div>
        })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled ={page<=1} type = "button" className ="btn btn-dark" onClick={handlePrevClick} >&larr; Previous</button>
          <button disabled ={page+1 > Math.ceil(props.totalResults/props.pageSize)}type = "button" className ="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div>
      </div>
      </div>
    )
}
News.defaultProps = {
  country: "us",
  pageSize : 5,
  category  : "general"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize : PropTypes.number,
  category: PropTypes.string
}

export default News
