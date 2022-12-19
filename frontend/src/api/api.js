import * as axios from "axios";

const instanse = axios.create({
    baseURL: "https://dog.ceo/api/breeds/",
});


export const getBreedsList = () => {
    return instanse
        .get('list/all')
        .then((response) => response.data.message).catch((error) => console.error(error));
};
export const getImages = (data) => {
    const filteredData = data.filter(item => item.breed.length > 0)

    let requests = filteredData.map(({ breed, subBreed, imageCount }) => {
        return axios.get(`https://dog.ceo/api/breed/${breed}/${subBreed ? `${subBreed}/` : ''}images/random/${imageCount}`)
            .then((response) => response.data.message)
    })
    try {
        return Promise.all(requests)
            .then(responses => responses);

    } catch (error) { console.error(error) };

};
