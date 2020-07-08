import axios from '../Axios/Axios';


const stationList = [];
const routeList = [];
const routerListWithAllAttrib = [];

const fetchingAllDataToDisplay = () => {
    axios.get("route.json")
        .then((response) => {
            axios.get("stations.json")
                .then((response2) => {
                    stationList = convertObjectToArray(response2.data);
                    routeList = convertObjectToArray(response.data);
                    routerListWithAllAttrib = combineRelatedObject();
                    return routerListWithAllAttrib;

                })
                .catch((e) => {
                    console.log(e);
                });

        })
        .catch((err) => {
            console.log(err);
        });
}


const findRelatedObject = (id, array) => {
    return array.find((el) => el.id === id);
}

const convertObjectToArray = (incomingObject) => {
    let newArray = [];
    for (let key in incomingObject) {
        newArray.push({ ...incomingObject[key], id: key });
    }
    return newArray;
}

const combineRelatedObject = () => {
    let newArray = []
    for (let ob of routeList) {
        newArray.push({ ...ob, destination1: findRelatedStation(ob.destination1), destination2:findRelatedStation(ob.destination2) })
    }
    return newArray;
}
const findRelatedStation = (id) => {
    return stationList.find((el) => el.id === id);
}

export default fetchingAllDataToDisplay;
export function findRelatedObject();
