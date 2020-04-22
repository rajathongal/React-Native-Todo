import React from 'react';
import firebase from '../../fb'
import { List, Title } from 'react-native-paper';


function Todo({doc }) {
    
  async function toggleComplete() {
    await firebase.database().ref('todos/').child(doc.key).update ({complete: !doc.val().complete})
    console.log(doc.key)
  }

  return (
    <List.Item
      title={doc.val().title}
      onPress={() => toggleComplete() }
      style={{
        flex:1,
      }} 
      left={props => (
        <List.Icon {...props} icon={doc.val().complete ? 'check' : 'cancel'} />
        
       
      )}
    />
  );
}

export default React.memo(Todo);