// Core API for fetching move and review and comment.
import { API_BASE_URL } from "../config";
const API_URL = API_BASE_URL + '/api'


export const getMovies = ({page=1, size=20}) => {
    return fetch(`${API_URL}/movies?page=${page}&size=${size}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getMoviesPage = ({page, size = 10}) => {
    return fetch(`${API_URL}/movies?page=${page}&size=${size}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getPlayList = (id) => {
    var token = localStorage.getItem('accessToken')
    
    return fetch(`${API_URL}/list/user/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const newMovie = (body) => {
    var token = localStorage.getItem('accessToken')

    return fetch(`${API_URL}/movies`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}
export const updateMovie = (body, id) => {
    var token = localStorage.getItem('accessToken')

    return fetch(`${API_URL}/movies/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}
export const deleteMovie = ({id}) => {
    var token = localStorage.getItem('accessToken')

    return fetch(`${API_URL}/movies/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getMoviesByQuery = ({genre="",title="",director="",actor="",page=1, size=20}) => {
    console.log(`${API_URL}/movies/query?page=${page}&size=${size}&genre=${genre}&title=${title}&director=${director}&actor=${actor}`)

    return fetch(`${API_URL}/movies/query?page=${page}&size=${size}&genre=${genre}&title=${title}&director=${director}&actor=${actor}`
    , {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getTopRatedMovies = ({page=1, size=20}) => {
    return fetch(`${API_URL}/movies/list/top_rated?page=${page}&size=${size}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getNowPlayingMovies = ({page=1, size=20}) => {
    return fetch(`${API_URL}/movies/list/now_playing?page=${page}&size=${size}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getUpcomingMovies = () => {
    return fetch(`${API_URL}/movies/list/upcoming`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getSimilarMovies = (movieName) => {
    return fetch(`${API_URL}/movies/recommendation/similar?movie=${movieName}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const loadSingleMovie = (id) => {
    return fetch(`${API_URL}/movies/${id}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

// COMMMENT

export const getAllCommentOfMovie = (id) => {
    // console.log("whatis id : ", id)
    return fetch(`${API_URL}/comments?movie_id=${id}&sortBy=createdAt`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const createComment = (body, id, parent_id = '') => {
    var token = localStorage.getItem('accessToken')

    return fetch(`${API_URL}/comments?movie_id=${id}&parent_id=${parent_id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}
export const updateComment = (body, id) => {
    var token = localStorage.getItem('accessToken')

    return fetch(`${API_URL}/comments?user_id=${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const deleteComment = (body, id, cmtid) => {
    var token = localStorage.getItem('accessToken')

    return fetch(`${API_URL}/comments?user_id=${id}&comment_id=${cmtid}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


// Rating
export const leaveRate = (rating, id) => {
    var token = localStorage.getItem('accessToken')
    return fetch(`${API_URL}/ratings?movie_id=${id}&rating=${rating}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: ""
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getUsersRate = (movieId) => {
    var token = localStorage.getItem('accessToken')
    var userId = JSON.parse(localStorage.getItem('USER')).id    

    return fetch(`${API_URL}/ratings?movie_id=${movieId}&user_id=${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}