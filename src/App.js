import {useState} from 'react'
import AddTaskForm from './components/AddTaskForm.js'
import UpdateForm from './components/UpdateForm.js'
import ToDo from './components/ToDo.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TTSV from './components/TTSV.js'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
// import { render } from '@testing-library/react'


function App() {


  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([
    {id: 1, title: 'Play soccer', status: false},
    {id: 2, title: 'Code nodejs', status: false}
  ])

  // Temp State
  const [newTask, setNewTask] = useState('')
  const [updateData, setUpdateData] = useState('')

  // Add task 
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1 
      
      setToDo([
        ...toDo, 
        { id: num, title: newTask, status: false }
      ])
      setNewTask('')
      toast.success("Add new task success")
    }
  }

  // Delete task 
  const deleteTask = (id) => {
    
    setToDo(toDo.filter(task => task.id !== id))
    toast.success("Delete task success")
  }

  // Mark task as done or completed
  const markDone = (id) => {
    
    setToDo(toDo.map(
      task => task.id === id 
      ? ({ ...task, status: !task.status }) 
      : (task) 
    ))
    toast.success("your task is complete")
  }

  // Cancel update
  const cancelUpdate = () => {
    setUpdateData('')
  }

  // Change task for update
  const changeHolder = (e) => {

    setUpdateData({...updateData, title: e.target.value})

  }

  // Update task
  const updateTask = () => {
    
    let removeOldRecord = [...toDo].filter(task => task.id !== updateData.id)
    setToDo([
      ...removeOldRecord, 
      updateData
    ])
    
    setUpdateData('')
    toast.success("update task success")

  }

  return (
    <div className="container App">
    <TTSV/>

    <br /><br />
    <h2>Simple To Do App </h2>
    <br /><br />

    {updateData && updateData ? (
      <UpdateForm 
        updateData={updateData}
        changeHolder={changeHolder}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
      />
    ) : (
      <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}

    {toDo && toDo.length ? '' : 'No Tasks...'}

    <ToDo
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    />  
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      {/* Same as */}
    <ToastContainer />
    </div>
  );
}

export default App;
