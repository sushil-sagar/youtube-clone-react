export const API_KEY = 'AIzaSyAr2ZKDPYeoNRIP6Fx8rvrz8Qzn-vLEeIU';

export const valueConverter=(value)=>{
    if(value>=1000000000)
    {
        return Math.floor(value/1000000000)+'B';
    }
    else if(value>=1000000)
    {
        return Math.floor(value/1000000)+'M';
    }
    else if(value>=1000)
    {
        return Math.floor(value/1000)+'K';
    }
    else
    {
        return value;
    }
}