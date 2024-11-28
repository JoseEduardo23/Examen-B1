
import dotenv from 'dotenv'


dotenv.config()

const transportModel ={

    async getAllTransportModel(){
        const peticion = await fetch(process.env.URL_BDD_TRANSPORT)
        const transport = await peticion.json()
        return transport
    }
    ,


    async getTransportByIdModel(transportId) {
        const response = await fetch(`${process.env.URL_BDD_TRANSPORT}${transportId}`);
        if (!response.ok) {
            return {error:"Tour no encontrado"}
        }
        const data = await response.json()
        return data
    },

    async createTransportModel(newTransport){
        const url = (process.env.URL_BDD_TRANSPORT)
        const peticion = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(newTransport),
            headers: {'Content-Type': 'application/json'}
        });
        
        if (!peticion.ok) {
            throw new Error('Error al crear el transporte');
        }
    
        const data = await peticion.json();
        return data;
    }

    ,

    async updateTransportModel(transportId,updateTransportModel){
        const url = (`${process.env.URL_BDD_TRANSPORT}${transportId}`)
        const peticion = await fetch(url,{
            method:"PUT",
            body:JSON.stringify(updateTransportModel),
            headers:{'Content-Type':"application/json"}
        })
        const data = await peticion.json()
        return data
    }

    ,

    async deleteTransportModel(transportId){
        const url = (`${process.env.URL_BDD_TRANSPORT}${transportId}`)
        const peticion = await fetch(url,{
            method:"DELETE"
        })
        const data = await peticion.json()
        return data
    }

}

export default transportModel
