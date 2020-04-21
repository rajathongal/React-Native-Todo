import React ,{ useState, useEffect }from 'react'
import { ScrollView, Text,View } from 'react-native';
import { Appbar, TextInput, Button,List } from 'react-native-paper';
import firebase from '../../fb'
import { FlatList } from 'react-native-gesture-handler';
import Todo from './Todo'

function Todos() {
    const [ todo, setTodo ] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);
    const db = firebase.database().ref('todos/')

    async function addTodo(){
        await db.push({
            title: todo,
            complete: false,
        });
        setTodo('')
    }
        
    useEffect(() => {
        return db.on('value',(snapshot) => {
          const list = [];
          snapshot.forEach(doc => {
            list.push({
              key: doc.id,
              title: doc.title,
              complete: doc.complete,
            });
          });
    
          setTodos(list);
    
          if (loading) {
            return null
          }
        });
    }, []);
       

    return(
        <>
        <Appbar>
            <Appbar.Content title={'TODOs List'}/>
        </Appbar>
        <FlatList 
            style={{flex:1, width:100}}
            data={todos}
            keyExtractor={(item) => item.key}
            renderItem={({item}) => <Todo {...item}/> }
        />
        <TextInput label={'New TODO'} value={todo} onChangeText={setTodo} />
        <Button onPress={() => addTodo()}> Add TODO </Button>
        </>
    )
}



export default Todos;
