import React from 'react';
import firebase from '../../fb'
import { List, Title } from 'react-native-paper';

function Todo({ id, title, complete }) {
    
  async function toggleComplete() {
    await firebase.database().ref().child(id).update ({complete: !complete})
    console.log(id)
  }

  return (
    <List.Item
      title={title}
      onPress={() => toggleComplete()}
      style={{
        flex:1,
        
      }}
      left={props => (
        <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
       
      )}
    />
  );
}

export default React.memo(Todo);