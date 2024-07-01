import { IPostDetails } from "../../../entities/vendor/vendor";
import { listCategory, uploadPost } from "../../../repositories/vendor/postRepo";


export default{
    categories:async()=>{
        try {
          const response = await listCategory()
          return response
        } catch (error) {
          console.log(error);
          
        }
      },
      uploadPost:async(data:IPostDetails,image:any)=>{
        try {
            const response = await uploadPost(data,image)
            return response
        } catch (error) {
            console.log(error);
            
        }
      }
}

