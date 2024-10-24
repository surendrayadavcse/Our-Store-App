import axios from 'axios'
const base_url="http://localhost:3000"
export class  userService{
    

async Register(userdata){
  try{
    const response=await axios.post(`${base_url}/register`,userdata)
    return response.data
  
  }
  catch(err){
    console.log(err)

  }
}

async Login(userdata){
        try{
            const response=await axios.post(`${base_url}/login`,userdata)
            return response.data
    
        }
        catch(error){
            throw error.response.data
    
        }
    
    }
    
    async getAllProducts(){
        try{
          const {data}=await axios.get(`${base_url}/products`)
          console.log(data)
          return data
    
        }
        catch(err){
            throw err
    
        }
    }

}
