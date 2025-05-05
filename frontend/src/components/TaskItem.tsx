import React, { useState } from 'react';
import { Task } from '../types';
import { useTasks } from '../context/TaskContext';

export const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const [showSubtasks, setShowSubtasks] = useState(true);
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState('');
  const { addTask, } = useTasks();
  
  const subtasks = task.subtasks || [];

  const handleAddSubtask = () => {
    if (subtaskTitle.trim()) {
      addTask(subtaskTitle, task.id);
      setSubtaskTitle('');
      setShowSubtaskInput(false);
    }
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '0.75rem',
        margin: '0.5rem 0',
        backgroundColor: task.parent ? '#f9f9f9' : '#fff',
        marginLeft: task.parent ? '2rem' : '0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <strong>{task.title}</strong>
        </div>
        <div>
          <button 
            onClick={() => setShowSubtaskInput(!showSubtaskInput)}
            style={{ marginRight: '0.5rem' }}
          >
            Add Subtask
          </button>
          <button onClick={() => setShowSubtasks(!showSubtasks)}>
            {showSubtasks ? 'Hide' : 'Show'} Subtasks
          </button>
        </div>
      </div>

      {showSubtaskInput && (
        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
          <input
            value={subtaskTitle}
            onChange={(e) => setSubtaskTitle(e.target.value)}
            placeholder="New subtask"
            style={{ flex: 1 }}
          />
          <button onClick={handleAddSubtask}>Add</button>
          <button onClick={() => setShowSubtaskInput(false)}>Cancel</button>
        </div>
      )}

      {showSubtasks && subtasks.length > 0 && (
        <div style={{ marginTop: '0.5rem' }}>
          {subtasks.map((subtask) => {
            console.log(subtask)
            return <TaskItem key={subtask.id} task={subtask} />
          })}
        </div>
      )}
    </div>
  );
};