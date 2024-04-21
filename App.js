import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions,Button,FlatList,Image, TouchableHighlight, Platform, Linking} from 'react-native';
 
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import { useEffect, useState } from 'react';
const Drawer = createDrawerNavigator();

//todo gif
//数据

function GirlsLike() {
  const[jsonData,setJsonData] = useState(null);
   useEffect(()=>{
       async function readLocalData(){
          const response = await fetch("https://2345games.top/publicRes/games/data.json");
          const json = await response.json();
          console.log(JSON.stringify(json.data.girls));
          setJsonData(json.data.girls);
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
  console.log("use eff------2222------->"+currentMargin.marginStart);
  console.log("use eff------3333------->"+Platform.OS);
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
function ZhengtuDriver() {
  return (
    <View style={styles.container}>
      <View>
          <Button title="ZhengtuDriver" />
      </View>
       
    </View>
  );
}
function App() {
  return (
    <NavigationContainer>
        <Drawer.Navigator  initialRouteName="Grils">
          <Drawer.Screen name="女生专属" component={GirlsLike} />
          <Drawer.Screen name="赛车" component={CarsDriver} />
          <Drawer.Screen name="国战" component={ZhengtuDriver} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}
const WEB_MARGIN = 50;
const marginConfig= {
    web:{
      marginStart: WEB_MARGIN,
      marginEnd: WEB_MARGIN,
    },
 default:{
      marginStart: 0,
      marginEnd: 0,
}
};

const currentMargin = marginConfig[Platform.OS] || marginConfig.default;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexWrap: 'wrap',
 
    marginStart: currentMargin.marginStart,
    marginEnd: currentMargin.marginEnd,
    
  },
  
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    width: 177,
    height: 133,
    borderRadius: 30,
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
  },
  button:{
    width: 200,
    height: 50,
    marginTop: 10,
  },
  item: {
 
   
  },
  listViewStyle:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
     
  }
  
});

export default App;