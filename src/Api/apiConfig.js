const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '754f981cae6c388dabe54d15fa90eba0',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`, // lấy ảnh với kích thước gốc
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,// lấy ảnh với kích thước 500
}

export default apiConfig;