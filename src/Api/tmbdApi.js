import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated',
    now_playing:'now_playing',
    latest:'latest'
}

export const tvType = { 
    today:'airing_today',
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const tmdbApi={
    getMoviesList :(type,params)=>{
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);
    },
    getTvList :(type,params)=>{
        const url='tv/'+tvType[type];
        return axiosClient.get(url,params);
    },
    getSimilar:(cate,id,params)=>{
        const url='/'+cate+'/'+id+'/similar';
        return axiosClient.get(url, {params:{}})
    },
    getGenresList:(cate,params)=>{
        const url='genre/'+category[cate]+'/list';
        return axiosClient.get(url,params);
    },
    getDetail:(cate,id, params)=>{
        const url=category[cate]+'/'+id;
        return axiosClient.get(url,params);
    },
    getCastList:(cate, id)=>{
        const url='/'+cate+'/'+id+'/credits';
        return axiosClient.get(url,{params:{}})
    },
    getVideo:(cate,id,params)=>{
        const url='/'+cate+'/'+id+'/videos';
        return axiosClient.get(url,{params:{}})
    },
    getReview:(cate,id,params)=>{
        const url='/'+cate+'/'+id+'/reviews';
        return axiosClient.get(url,{params:{}})
    },
    search: (cate, params) => {
        const url = '/search/' + cate;
        return axiosClient.get(url, params);
    }
}
export default tmdbApi;