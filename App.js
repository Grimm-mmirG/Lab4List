import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ToDoForm from './assets/components/ToDoForm';
import ToDoList from './assets/components/ToDoList';
import Appy from './assets/components/Appy';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ToDoList />
      <ToDoForm /> */}
      <Appy/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
