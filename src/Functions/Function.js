export const fetchingAllDataToDisplay = () => {
    axios.get("route.json")
        .then((response) => {
            axios.get("stations.json")
                .then((response2) => {
                    axios.get("bus.json")
                        .then((respons3) => {
                            //fetch ad converto to array stations
                            this.setState({
                                stationList: this.convertObjectToArray(response2.data)
                            });
                            //fetch ad converto to array route
                            this.setState({
                                routeList: this.convertObjectToArray(response.data)
                            });

                            this.setState({
                                routerListWithAllAttrib: this.combineRelatedObject()
                            });

                            this.setState({
                                busList: this.convertObjectToArray(respons3.data)
                            });

                            this.setState({
                                busListWithAllAttribb: this.combineFullRouteToBus()
                            })
                            //console.log(this.state.routerListWithAllAttrib)
                            // console.log(this.state.stationList);
                            //console.log(this.state.routerListWithAllAttrib)

                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch((e) => {
                    console.log(e);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}
//fetch time tabel slots for related routeID data from database
export const fetchTimeTableDatafromDataBase = (routeID) => {
    axios.get(`timeTable.json?orderBy="routeID"&equalTo="${routeID}"`)
        .then((response) => {
            this.setState({
                timeList: this.convertObjectToArray(response.data),
                loading: false
            });
            this.divideTimeTableInToTwoDestination(this.state.timeList);

        }).catch((err) => {
            console.log(err);

        });
}
export const divideTimeTableInToTwoDestination =(timeList)=>{
    let timeList1=[];
    let timeList2=[];

    for(let time of timeList){
        if(time.startingStation==="destination1"){
            timeList1.push(time);
        }
        else if(time.startingStation==="destination2"){
            timeList2.push(time);
        }
    }
    //console.log(timeList2);
    this.setState({
        timeList1:timeList1,
        timeList2:timeList2,
    });
}



export const findRelatedObject = (id, array) => {
    return array.find((el) => el.id === id);
}

export const convertObjectToArray = (incomingObject) => {
    let newArray = [];
    for (let key in incomingObject) {
        newArray.push({ ...incomingObject[key], id: key });
    }
    return newArray;
}

export const combineRelatedObject = () => {
    let newArray = []
    for (let ob of this.state.routeList) {
        newArray.push({ ...ob, destination1: this.findRelatedStation(ob.destination1), destination2: this.findRelatedStation(ob.destination2) })
    }
    //console.log(newArray);
    return newArray;
}
export const combineFullRouteToBus = () => {
    let newArray = []
    for (let ob of this.state.busList) {
        newArray.push({ ...ob, routeID: this.findRelatedObject(ob.routeID, this.state.routerListWithAllAttrib) });
    }
    console.log(newArray);
    return newArray;
}


export const findRelatedStation = (id) => {
    return this.state.stationList.find((el) => el.id === id);
}

export const combineAllTimeTablewithDate = () =>{
    
}

