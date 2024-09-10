const socket = io();

if(navigator.geolocation) {
    navigator.geolocation.watchPosition((position)=> {
            const {latitude , longitude } = position.coords;
            socket.emit("end-location" , {latitude , longitude} )
    } , (error)=> {
        console.error(error);

        }, 
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0      // to stop cashing of previous location 
        }
    );
}