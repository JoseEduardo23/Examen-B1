
import dotenv from 'dotenv'


dotenv.conf

const tourModel ={

    async getAllToursModel(){
        const peticion = await fetch('http://localhost:4000/tours')
        const tours = await peticion.json()
        return tours
    }
    ,


    async getTourByIdModel(tourId) {
        const response = await fetch(`http://localhost:4000/tours/${tourId}`);
        if (!response.ok) {
            return {error:"Tour no encontrado"}
        }
        const data = await response.json()
        return data
    },

    async createTourModel(newTour){
        const url = "http://localhost:4000/tours"
        const peticion  = await fetch(url,{
            method:'POST',
            body:JSON.stringify(newTour),
            headers:{'Content-Type':'application/json'}
        })
        const data = await peticion.json()
        return data
    }

    ,

    async updateTourModel(tourId,updateTourModel){
        // CONEXIÓN A BDD
        const url = `http://localhost:4000/tours/${tourId}`
        // ENVIAR INFO A BDD
        const peticion = await fetch(url,{
            method:"PUT",
            body:JSON.stringify(updateTourModel),
            headers:{'Content-Type':"application/json"}
        })
        // OBTENER REPUESTA DE BDD
        const data = await peticion.json()
        // MANDAR RESPUESTA A CONTROLADOR
        return data
    }

    ,

    async deleteTourModel(tourId){
        // CONEXIÓN A BDD
        const url = `http://localhost:4000/tours/${tourId}`
        // ENVIAR INFO A BDD
        const peticion = await fetch(url,{
            method:"DELETE"
        })
        // OBTENER REPUESTA DE BDD
        const data = await peticion.json()
        // MANDAR RESPUESTA A CONTROLADOR
        return data
    }

    ,


    async getTourByID(tourId){
        const peticion = await fetch(`http://localhost:4000/tours/${tourId}`)
        const data = await peticion.json()
        return data
    }

}

export default tourModel
