import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import PropertyForm from '../components/PropertyForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

const Properties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);

  // useEffect(() => {
  //   const fetchProperties = async () => {
  //     try {
  //       const response = await axiosInstance.get('/api/get-properties', {
  //         headers: { Authorization: `Bearer ${user.token}` },
  //       });
  //       setProperties(response.data);
  //     } catch (error) {
  //       alert('Failed to fetch tasks.');
  //     }
  //   };

  //   fetchProperties();
  // }, [user]);

  return (
    <div className="container p-6 mx-auto">
      <PropertyForm
        properties={properties}
        setProperties={setProperties}
        editingProperty={editingProperty}
        setEditingProperty={setEditingProperty}
      />
      {/* <TaskList tasks={properties} setTasks={setProperties} setEditingTask={setEditingProperty} /> */}
    </div>
  );
};

export default Properties;
