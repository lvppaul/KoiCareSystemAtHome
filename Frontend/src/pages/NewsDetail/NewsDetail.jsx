import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewsDetail = () => {
    // const { NewsId } = useParams();
    const [news, setNews] = useState(null);
    // const [loading, setLoading] = useState(true);

    return (
        <div>
            <h1>{news.title}</h1>
            <p>{news.content}</p>
            <p><small>Published on: {new Date(news.publishedAt).toLocaleDateString()}</small></p>
        </div>
    );
};

export default NewsDetail;