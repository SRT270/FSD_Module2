import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3005/items');
      const data = await response.json();
      if (data.success) {
        setTasks(data.data);
      } else {
        setError('Failed to fetch tasks');
      }
    } catch (err) {
      setError('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!inputValue.trim()) return;
    try {
      const response = await fetch('http://localhost:3005/additem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputValue }),
      });
      const data = await response.json();
      if (data.success) {
        setTasks([data.data, ...tasks]);
        setInputValue('');
      } else {
        setError('Failed to add task');
      }
    } catch (err) {
      setError('Error adding task');
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3005/items/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setTasks(tasks.filter(task => task.id !== id));
      } else {
        setError('Failed to delete task');
      }
    } catch (err) {
      setError('Error deleting task');
    }
  };

  const startEdit = (id, currentValue) => {
    setEditId(id);
    setEditValue(currentValue);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValue('');
  };

  const saveEdit = async (id) => {
    if (!editValue.trim()) return;
    try {
      // Assuming backend has an endpoint to update itemDescription by id
      const response = await fetch(`http://localhost:3005/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemDescription: editValue }),
      });
      const data = await response.json();
      if (data.success) {
        setTasks(tasks.map(task => (task.id === id ? { ...task, itemDescription: editValue } : task)));
        cancelEdit();
      } else {
        setError('Failed to update task');
      }
    } catch (err) {
      setError('Error updating task');
    }
  };

  return (
    <div style={{ maxWidth: 400, height: '80vh', margin: 'auto', padding: '2rem', borderRadius: 12, boxShadow: '0 0 20px rgba(0,0,0,0.15)', fontFamily: 'Arial, sans-serif', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>TODO List</h2>
      <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Enter a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ flex: 1, padding: '0.75rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem' }}
        />
        <button onClick={addTask} style={{ marginLeft: '0.75rem', padding: '0.75rem 1.25rem', borderRadius: 6, background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
          + Add Task
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p style={{ color: '#888' }}>No tasks yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
          {tasks.map(task => (
            <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
              {editId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc', marginRight: '0.5rem' }}
                  />
                  <button onClick={() => saveEdit(task.id)} style={{ marginRight: '0.5rem', padding: '0.3rem 0.6rem', borderRadius: 4, backgroundColor: '#4caf50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Save
                  </button>
                  <button onClick={cancelEdit} style={{ padding: '0.3rem 0.6rem', borderRadius: 4, backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{task.itemDescription}</span>
                  <div>
                    <button onClick={() => startEdit(task.id, task.itemDescription)} style={{ marginRight: '0.5rem', background: 'none', border: 'none', color: '#2575fc', cursor: 'pointer' }}>
                      Edit
                    </button>
                    <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
