import http from './httpService';



export function getGenres() {
    return http.get("/genres");
}

export function getGenreById(id){
    return http.get(`/genres/${id}`)
}
