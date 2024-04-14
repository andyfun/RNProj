import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { Button,FlatList,Image, TouchableHighlight } from 'react-native-web';
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
  "hexxagon.png":require('./assets/games/hexxagon.png'),

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
    <TouchableHighlight onPress={()=>{
      window.open(item.url);
    }}
    underlayColor={'rgba(255,255,255,0.5)'}
    style={styles.item}
    >
    <Image
            source={mapPng[item.img]} 
            style={styles.image}
            resizeMethod="resize"
        />
    </TouchableHighlight>
  );
  return (
    <View style={styles.container}>
     <FlatList 
          data={jsonData} 
          renderItem={renderItem}
          keyExtractor={item=>item.id}
          contentContainerStyle={styles.listViewStyle}
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
    flexWrap: 'wrap',
  },
  
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    width: 200,
    height: 200,
    borderRadius: 20,
   
  },
  button:{
    width: 200,
    height: 50,
    marginTop: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  listViewStyle:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
  
});

export default App;