import React from 'react';
import {Link} from "react-router-dom";

const BlogItem = ({blog}) => {
    return (
        <div className="blog__item">
            <div className="blog__item__pic">
                <img src={blog.image} alt=""/>
            </div>
            <div className="blog__item__text">
                <ul>
                    <li><i className="fa fa-calendar-o"/> {blog.date}</li>
                    <li><i className="fa fa-comment-o"/>{blog.commentsNum}</li>
                </ul>
                <h5><Link href="#">{blog.title}</Link></h5>
                <p>{blog.subTitle}</p>
                <Link to={"/blog-details"} className="blog__btn">READ MORE
                    <span className="arrow_right"/></Link>
            </div>
        </div>

    );
};

export default BlogItem;
