import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableNativeFeedbackComponent, View ,Image} from 'react-native';
import { Button } from 'react-native-web';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import { useEffect, useState } from 'react';
const Drawer = createDrawerNavigator();

const jsonAssetsPath = ('./assets/games/data.json');
//JSON.stringify(jsonData)
function useAssetJson(){
   const[jsonData,setJsonData] = useState("");
   useEffect(()=>{
       async function getJsonData(){
          const response = await fetch(jsonAssetsPath);
          const json = await response.json();
          setJsonData(JSON.stringify(json));
       }
       getJsonData();
  },[]);
  return jsonData;
}

function GirlsLike() {
  const jsonData2 = useAssetJson();
  console.log( (jsonData2));
  JSON.parse(JSON.stringify(jsonData2),(key,value)=>{
    console.log(key,value);
  });
  return (
    <View style={styles.container}>
      <View>
        <FileList 
          data={jsonData} 
          renderItem={({item})=>(
            <View style={styles.image}>
                <Image source={require('./assets/games/snake.png')}  />
                <Button title="Click me" />
            </View>
          )
      }
        />
         
      </View>
       
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
        <Drawer.Navigator >
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSearch: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: 100,
    height: 100,
  },
});


export default App;