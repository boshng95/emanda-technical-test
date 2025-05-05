import React, { useState } from 'react';
import { TaskProvider, useTasks } from './context/TaskContext';
import { TaskList } from './components/TaskList';

const Main = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useTasks();

  const handleAddTask = () => {
    if (!title.trim()) {
      setError('Task title cannot be empty');
      return;
    }
    addTask(title);
    setTitle('');
    setError('');
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input 
        value={title} 
        onChange={(e) => {
          setTitle(e.target.value);
          setError('');
        }} 
        placeholder="New Task" 
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleAddTask}>Add Task</button>
      <TaskList />
    </div>
  );
};

const App = () => (
  <TaskProvider>
    <Main />
  </TaskProvider>
);

export default App;
