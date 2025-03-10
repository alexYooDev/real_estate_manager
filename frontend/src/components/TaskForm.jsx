import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', description: '', deadline: '' });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        deadline: editingTask.deadline,
      });
    } else {
      setFormData({ title: '', description: '', deadline: '' });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const response = await axiosInstance.put(`/api/tasks/${editingTask._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(tasks.map((task) => (task._id === response.data._id ? response.data : task)));
      } else {
        const response = await axiosInstance.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks([...tasks, response.data]);
      }
      setEditingTask(null);
      setFormData({ title: '', description: '', deadline: '' });
    } catch (error) {
      alert('Failed to save task.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mb-6 bg-white rounded shadow-md">
      <h1 className="mb-4 text-2xl font-bold">{editingTask ? 'Your Form Name: Edit Operation' : 'Your Form Name: Create Operation'}</h1>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="date"
        name='deadline'
        value={formData.deadline}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full p-2 text-white bg-blue-600 rounded">
        {editingTask ? 'Update Button' : 'Create Button'}
      </button>
    </form>
  );
};

export default TaskForm;
