import React from 'react'
import  blank from './blank.jpg'


const NewsItem =(props)=> {
    let {title, description, imageurl,newsurl,author,publishedAt,source} = props; //css should be in {{}}
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}> 
        <img src={!imageurl?blank:imageurl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">{source}
            {/* <span class="visually-hidden">unread messages</span> */}
            </span>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author} on {new Date (publishedAt).toGMTString()}</small></p>
            <a rel="noreferrer"href={newsurl} target='_blank' className="btn btn-dark">Read More...</a>
        </div>
        </div>
      </div>
    )
}

export default NewsItem
