"use client";
import { ITask } from "@/types/tasks"
import {FiEdit, FiTrash2} from "react-icons/fi"
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
interface TaskProps{
    task:ITask
}
const Task:React.FC<TaskProps> = ({task}) => {


  const router = useRouter();
  const [openModalEdit, setopenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setopenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) =>{
    e.preventDefault();
    await editTodo({
      id:task.id,
      text:taskToEdit
    });
    setTaskToEdit("");
    setopenModalEdit(false);
    router.refresh();

  }

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setopenModalDelete(false);
    router.refresh();
  }
  return (
    <tr key={task.id}>
    <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit onClick={()=>setopenModalEdit(true)} cursor='pointer' className="text-blue-500" size={25}/>
        <Modal modalOpen={openModalEdit} setModalOpen = {setopenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div className='form-group '>
              <input value={taskToEdit} onChange={(e) =>setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered mr-5 " />
              <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
        <FiTrash2 onClick={() => setopenModalDelete(true)} cursor='pointer' className="text-red-500" size={25}/>
        <Modal modalOpen={openModalDelete} setModalOpen = {setopenModalDelete}>
          <h3 className="text-lg">Are you sure you want to delete this task?</h3>
          <div className="modal-action">
            <button onClick={()=>handleDeleteTask(task.id)} className="btn">YES</button>
          </div>
        </Modal>
      </td>
  </tr>
  )
}

export default Task