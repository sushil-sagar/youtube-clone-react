import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY, valueConverter } from '../../data'
import { useEffect, useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'; // Import PropTypes

const Feed = ({ category }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
        await fetch(videoList_url).then(response => response.json()).then(data => setData(data.items))
    }

    useEffect(() => {
        fetchData();
    }, [category])

    return (
        <div className="feed">
            {data.map(item => ( // Removed unused index parameter
                <Link key={item.id} to={`video/${item.snippet.categoryId}/${item.id}`} className='card'> {/* Added key prop */}
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{valueConverter(item.statistics.viewCount)}views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </Link>
            ))}
        </div>
    )
}

Feed.propTypes = {
    category: PropTypes.number.isRequired, // Validate category as a number
};

export default Feed;
