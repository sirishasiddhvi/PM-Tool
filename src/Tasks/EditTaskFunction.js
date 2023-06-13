import react, {useState, useEffect, useContext } from "react"
import axios from "axios"
import { SnackContext } from "../Context/UserContext"
import { useParams } from "react-router-dom"

export const useEditTask=()=>{
    const id=useParams()
    const { snack, setSnack } = useContext(SnackContext);
    const[err,setErr]=useState();
    const[task,setTask]=useState({
        project_id:"",
        scope_id:"",
        task_title:"",
        task_assigned_by:"",
        task_assign_to:"",
        task_due_date:"",
        task_status:""
    })
    const[task_images,setTask_images]= useState("")
    const[task_new_images,setTask_new_images]= useState([])
    const [images, setImages] = useState([])
    const [imageids, setImageIds] = useState("");
    const[task_desc,setTask_desc]= useState("")

    useEffect(()=>{
        singleTask()
    },[])
    const task_descChange=(event, editor)=>{
      const data = editor.getData();
      console.log(data);
      setTask_desc(data)
    }
    const taskChange=(e)=>{
        setTask({...task,[e.target.name]:e.target.value});
    };
    const task_imageChange=(e)=>{
        if (e.target.files.length != 0) {
            // console.log(task_images.split(",").length)
            // if (task_images.split(",").length + images.length + e.target.files.length <= 3) {
            console.log(task_images.length)
            console.log(task_images)
            
            // if (task_images.split(",").length + task_new_images.length + e.target.files.length <= 5) {
                if (task_images){
              var arr = [];
        
              for (var i = 0; i < e.target.files.length; i++) {
                var type = e.target.files[i].type;
        
                if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
                  const image = e.target.files[i];
                  // var img = await compImage(image);
                  arr.push({ raw: image, preview: URL.createObjectURL(image) });
                } else {
                  alert("Please select only JPEG, JPG, PNG Images..")
                }
              }
              console.log("arr", arr)
              setImages([...task_new_images, ...arr]);
            } else {
              alert("Maximum Image limit is 5.");
        
            }
          }
          e.target.value = ""
      }
      const singleTask=async()=>{
        const formdata = new FormData();
        formdata.append("task_id", id.id);
        await axios.post("/api/view_single_task",formdata).then((res)=>{
            if(res.data.status===true){
                console.log(res.data.data)
                setTask({
                    project_id:res.data.data.project_id,
                    scope_id:res.data.data.scope_id,
                    task_title:res.data.data.task_title,
                    task_assigned_by:res.data.data.task_assigned_by,
                    task_assign_to:res.data.data.task_assigned_to,
                    task_due_date:res.data.data.task_due_date,
                    task_status:res.data.data.task_status
                })
                setTask_desc(res.data.data.task_desc)
                setImageIds(res.data.data.task_images)
                setTask_images(res.data.data.task_images)
      }
    })
}
const submitTask=(e)=>{
    e.preventDefault();
    if (task.project_id.length < 1) {
      setErr(1);
      setSnack({
        message: "Enter Project Id",
        type: "error",
        open: true,
      })
    }else if (task.scope_id.length < 1) {
        setErr(2);
        setSnack({
          message: "Enter Scope Id",
          type: "error",
          open: true,
        })
      }else if (task.task_title.length < 1) {
        setErr(3);
        setSnack({
          message: "Enter Task Title",
          type: "error",
          open: true,
        })
      }
      else if (task_desc.length < 1) {
        setErr(4);
        setSnack({
          message: "Enter Task Description",
          type: "error",
          open: true,
        })
      }
      else if (task.task_assigned_by.length < 1) {
        setErr(5);
        setSnack({
          message: "Enter The Person Who Assigned The task ",
          type: "error",
          open: true,
        })
      }else if (task.task_assign_to.length < 1) {
        setErr(6);
        setSnack({
          message: "Enter The Person Whom To Task Assigned",
          type: "error",
          open: true,
        })
      }else if (task.task_due_date.length < 1) {
        setErr(7);
        setSnack({
          message: "Enter Task Due Date",
          type: "error",
          open: true,
        })
      }else if (task_images.length < 1) {
        setErr(8);
        setSnack({
          message: "Select Task Images",
          type: "error",
          open: true,
        })
      }else if (task.task_status.length < 1) {
        setErr(9);
        setSnack({
          message: "Enter Task Status",
          type: "error",
          open: true,
        })
      }else {
        const formdata = new FormData();
        formdata.append("proj_id", task.project_id);
        formdata.append("scope_id", task.scope_id);
        formdata.append("task_title", task.task_title);
        formdata.append("task_desc", task_desc);
        formdata.append("task_assigned_by", task.task_assigned_by);
        formdata.append("task_assigned_to", task.task_assign_to);
        formdata.append("due_date", task.task_due_date);
        formdata.append("task_status", task.task_status);
        for (let i=0;i<images.length;i++){
          console.log(images[i].raw)
          formdata.append("task_image",images[i].raw)
               }
        axios.post("/api/add_task",formdata).then((res)=>{
            if(res.data.status==true){
              setSnack({
                message: res.data.msg,
                type: "success",
                open: true,
              })
            }else{
              setSnack({
                message: res.data.msg,
                type: "error",
                open: true,
              })
            }
        })
      }
    }
    return[task,task_images,task_new_images,task_desc,task_descChange,taskChange,task_imageChange,submitTask,err]
}