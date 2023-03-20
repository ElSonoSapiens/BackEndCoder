const socketClient = io() // script para el cliente

socketClient.on("bienvenida",(text)=>{
    console.log(text);
})