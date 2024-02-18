
import './PlayVideo.css'
import {API_KEY, valueConverter} from '../../data'
// import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {

    const {videoId} = useParams();

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    const fetchVideoData = async() =>{
        //fetching video data
        const videoDatails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDatails_url).then(res=>res.json()).then(data => setApiData(data.items[0]));
    }

    const fetchOtherData = async()=>{
        if (!apiData) return; // Add null check here to avoid accessing null properties
        //fetch channel data
        const channelData_url =`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channelData_url).then(res=>res.json()).then(data=> setChannelData(data.items[0]));
    
        //fetching Comment data
        const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
        await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items))
    }
    
    useEffect(()=>{
        fetchVideoData();
    },[videoId])

    useEffect(()=>{
        fetchOtherData();
    },[apiData])

  return (
    <div className='play-video'>
<iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        {/* <video src={video1} controls autoPlay muted></video>  */}
        <h3>{apiData?apiData.snippet.title:'Title Here'}</h3>
        <div className="play-video-info">
            <p>{apiData?valueConverter(apiData.statistics.viewCount):'15K'} view &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():'2 days ago'} </p>
            <div>
                <span><img src={like} alt="" />{apiData?valueConverter(apiData.statistics.likeCount):'133'}</span>
                <span><img src={dislike} alt="" />25</span>
                <span><img src={share} alt="" />share</span>
                <span><img src={save} alt="" />save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:''} alt="" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle:''}</p>
                <span>{channelData?valueConverter(channelData.statistics.subscriberCount):''} Subscriber</span>
            </div>
            <button>subscribe</button>
        </div>
        <div className="vid-description">
            <p>{apiData?apiData.snippet.description.slice(0,5000):'description'}</p>
             <hr />
            <h4>{apiData?valueConverter(apiData.statistics.commentCount):'12'}Comments</h4>
            {commentData.map((item, index)=>{
                return(
                    <div key={index} className="comment">
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                    <div>
                        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>{valueConverter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                            <img src={dislike} alt="" />
                        </div>
                    </div>
                </div>
                )
            })}
           
        </div>
    </div>
  )
}

export default PlayVideo
