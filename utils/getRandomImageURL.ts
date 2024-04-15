function getRandomImageURL() {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    return `https://picsum.photos/id/${randomNumber}/2000/800`;
}

export default getRandomImageURL;