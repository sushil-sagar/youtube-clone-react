import './Recommended.css'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import { API_KEY, valueConverter } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({ categoryId }) => {
    const [apiData, setApiData] = useState([]);

    const fetchData = async () => {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&videoCategoryId=${categoryId}&maxResults=45&key=${API_KEY}`;
        await fetch(relatedVideo_url).then(res => res.json()).then(data => setApiData(data.items));

    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='recommended'>
            {apiData.map((item,index) => {
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle} </p>
                            <p>{valueConverter(item.statistics.viewCount)} views</p>
                        </div>
                    </Link>
                )
            })}

        </div>
    )
}

Recommended.propTypes = {
    categoryId: PropTypes.string.isRequired, // Validate categoryId as a required string
};

export default Recommended;