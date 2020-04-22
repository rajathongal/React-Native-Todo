import React ,{ useState, useEffect }from 'react'
import { ScrollView, Text,View } from 'react-native';
import { Appbar, TextInput, Button,List } from 'react-native-paper';
import firebase from '../../fb'
import { FlatList, } from 'react-native-gesture-handler';
import Todo from './Todo'
import Swipeout from 'react-native-swipeout'

function Todos() {
    const [ todo, setTodo ] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);
    const db = firebase.database().ref('todos/')
    const swipeSettings={
      autoClose:true,
     
      right:[
        {
          onPress: () => {
            deleted(item.key)
          },
          text: 'Delete', type: 'delete'
        }
      ],
  
    };

  function deleted(key){
      firebase.database().ref(`todos/${key}`).remove()

  }

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
            console.log("doc", doc.val())
            list.push({
             doc,
            });
            console.log("list", list)
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
            style={{flex:1, width:'100%'}}
            data={todos}
            keyExtractor={(item) => item.key}
           
            renderItem={({item}) => <Swipeout {...swipeSettings} > 
                                    <Todo {...item}  /> 
                                    </Swipeout> }
        />
        <TextInput label={'New TODO'} value={todo} onChangeText={setTodo} />
        <Button onPress={() => addTodo()}> Add TODO </Button>
        </>
    )
}



export default Todos;
