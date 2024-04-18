import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions,Button,FlatList,Image, TouchableHighlight, Platform, Linking} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import { useEffect, useState } from 'react';
const Drawer = createDrawerNavigator();

function GirlsLike() {
  const[jsonData,setJsonData] = useState(null);
   useEffect(()=>{
       async function readLocalData(){
          const response = await fetch("https://2345games.top/publicRes/games/data.json");
          const json = await response.json();
          console.log(JSON.stringify(json.data));
          setJsonData(json.data);
       }
       readLocalData();
  },[]);
  const renderItem = ({item})=>(
    <TouchableHighlight onPress={()=>{
      if(Platform.OS=='android' || Platform.OS=='ios'){
      //  Linking.openURL(item.url);
        
      }
      Linking.openURL(item.url);
      //window.open(item.url);
    }}
      underlayColor={'rgba(255,255,255,0.5)'}
      style={styles.item}
    >
    <Image
            source={{uri:item.img}} 
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
    marginStart:Platform.OS === 'android'|| Platform.OS === 'ios'? 0:200,
    marginEnd:Platform.OS === 'android'|| Platform.OS === 'ios'? 0:200,
  },
  
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    width: 100,
    height: 100,
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