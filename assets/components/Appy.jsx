import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, Alert } from 'react-native';
import ToDoList from './ToDoList'; 
import ToDoForm from './ToDoForm'; 
import { v4 as uuidv4 } from 'uuid';  

export default function App() {
  const [tasks, setTasks] = useState([
    { id: uuidv4(), text: 'Do laundry', completed: false },
    { id: uuidv4(), text: 'Go to gym', completed: false },
    { id: uuidv4(), text: 'Walk dog', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  

  useEffect(() => {
    if (errorMessage) {
      
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const addTask = () => {
    const trimmedTask = newTask.trim();
    
    
    if (tasks.some(task => task.text.toLowerCase() === trimmedTask.toLowerCase())) {
      setErrorMessage('Task already in list'); 
    } else if (trimmedTask) {
      setTasks([...tasks, { id: uuidv4(), text: trimmedTask, completed: false }]);
      setNewTask(''); 
      setErrorMessage('');
      setSuccessMessage('Task added successfully!');

      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Display success message if there is one */}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        {/* Display error message if there is one */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <ToDoList tasks={tasks} toggleCompletion={toggleCompletion} deleteTask={deleteTask} />
        <ToDoForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    padding: 10,
    backgroundColor: '#2c2f33', 
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 15,
    maxWidth: '100%', 
  },
  errorText: {
    color: '#FF3B30', 
    marginBottom: 10, 
    fontWeight: 'bold',
  },
  successText: {
    color: '#4AB596', 
    marginBottom: 10, 
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6A5ACD', 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonDisabled: {
    backgroundColor: '#A9A9A9',
  },
});
