import { supabase } from "../lib/supabase";
import React, { useEffect, useState } from "react";


const AddComplain=()=>{
    const[loading,setLoading]=useState(false)
    const [image, setImage] = useState(null);

    const [complain, setComplain]=useState({
        name:'',
        student_id:'',
        room_no:'',
        description:'',
        complain_type:'',
    })

    useEffect(()=>{
        const getUser=async()=>{
            const {data:{user}}=await supabase.auth.getUser();
            if(user){
                setComplain((prev)=>({...prev,student_id:user.id,name:user.user_metadata.name}))
            }
        };
        getUser();
    },[]);

    const handleChange=async (e)=>{
        setComplain({...complain,[e.target.name]:e.target.value})
    }
    const handleImageChange= (e)=>{
        setImage(e.target.files[0]);
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            let imageUrl="";
            if(image){
                const filePath=`complaints/${Date.now()}_${image.name}`
                const result = await supabase.storage.from("complain-images").upload(filePath,image);
                
                if(result.error) throw result.error;

                const {data}=supabase.storage.from("complain-images").getPublicUrl(filePath);

                imageUrl=data.publicUrl;
            }

            const payload ={...complain,image_url:imageUrl};

          /*  const response =await axios.post(
                "link",payload,{headers:{...}}
            )
          headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token }`
            }
            */
           alert("Complaint Registered Successfully!");
        }
        catch(error){
           console.error("Error submitting complaint:", error);
           alert("Error: " + error.message);
        }
        finally {
            setLoading(false);
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={complain.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        name="room_no"
        value={complain.room_no}
        onChange={handleChange}
        placeholder="Room No"
      />

      <textarea
        name="description"
        value={complain.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <input type="file" onChange={handleImageChange} />

      <button type="submit">Submit</button>
    </form>
  );
    
}
export default AddComplain;