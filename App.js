import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableNativeFeedbackComponent, View} from 'react-native';
import { Button,FlatList,Image } from 'react-native-web';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import { useEffect, useState } from 'react';
const Drawer = createDrawerNavigator();

const jsonAssetsPath = './assets/games/data.json';


const mapPng ={
  "snake.png":require('./assets/games/snake.png'),
  "zoom-earth.jpg":require('./assets/games/zoom-earth.jpg'),
  "webcam-toy.jpg":require('./assets/games/webcam-toy.jpg'),
  "strobe-illusion.png":require('./assets/games/strobe-illusion.png'),
}

function GirlsLike() {
  const[jsonData,setJsonData] = useState(null);
   useEffect(()=>{
       async function readLocalData(){
          const response = await fetch(jsonAssetsPath);
          const json = await response.json();
          console.log("use eff------1111------->"+json);
          setJsonData(json.data);
       }
       readLocalData();
  },[]);
  const renderItem = ({item})=>(
    <View  style={styles.item}>
        <Image source={mapPng[item.img]} style={styles.image}   />
        <Button title={item.name} style={styles.button} onPress={()=>{
          window.open(item.url);
         } }/>
    </View>
  );
  return (
    <View style={styles.container}>
     <FlatList 
          numColumns={2}
          data={jsonData} 
          renderItem={renderItem}
          keyExtractor={item=>item.id}
          
        />
       
    </View>
  );
}

function CarsDriver() {
  return (
    <View style={styles.container}>
      <View>
          <Button title="Driver" />
      </View>
       
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
        <Drawer.Navigator  initialRouteName="Grils">
          <Drawer.Screen name="Grils" component={GirlsLike} />
          <Drawer.Screen name="CarsDriver" component={CarsDriver} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  image: {
   
    resizeMode: "cover",
    justifyContent: "center",
    width: 200,
    height: 200,
   
  },
  button:{
    width: 100,
    height: 50,
    marginTop: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '50%',
    height: '50%',
  },
});


export default App;