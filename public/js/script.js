const socket = io();

if(navigator.geolocation) {
    navigator.geolocation.watchPosition((position)=> {
            const {latitude , longitude } = position.coords;
            socket.emit("send-location" , {latitude , longitude} )
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

const map= L.map("map").setView([0,0], 10)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" , {
    attribution: "Built By Aadii"
}).addTo(map)

const markers = {};

socket.on("recieve-location" ,(data)=>{
    const {id , latitude , longitude } = data;
    map.setView([latitude ,longitude])
})
