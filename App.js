import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,Button,Alert, Text, View,FlatList,Dimensions, ToastAndroid,SafeAreaView,ScrollView,RefreshControl} from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  const initialData = [];
  const [refreshing, setRefreshing] = React.useState(false);
  const [listData, setListData] = React.useState(initialData);
  
//Refresh function
const onRefresh = React.useCallback(async () => {
  setRefreshing(true);
  // if (listData.length < 10) {
    try {
      //for testing
      const apiURL = "https://run.mocky.io/v3/fe9a5297-1d79-4e1b-a70a-9fe085e43b03"; //mock api call for testing
      let response = await fetch(
        apiURL
      ); 

      // API call
      // const API_KEY = '';
      // const apiURL =  'https://odds.p.rapidapi.com/v4/sports/baseball_mlb/scores';
      // const options = {
      //   method: 'GET',
      //   headers: {
      //     'X-RapidAPI-Key': '',
      //     'X-RapidAPI-Host': 'odds.p.rapidapi.com'
      //   }
      // };
      // let response = await fetch(
      //   apiURL,options
      // ); //real api call

      let responseJson = await response.json();
      console.log(responseJson);
      setListData(responseJson);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      setRefreshing(false);
    }
}, [refreshing]);

//Fonts
const [loaded] = useFonts({
  Nexa: require('./assets/fonts/Nexa-Trial-Book.ttf'),
});

if (!loaded) {
  return null;
}
function getDate(item){
  var d = new Date(item.commence_time);
  return d.toLocaleString()
}
//On the screen
return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>scores</Text>

    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={listData}
      renderItem={({ item }) => (
        <Text style={styles.item}>
          {"\n"}
          {getDate(item)}
          {"\n"}
          {item.home_team}
          {": "}
          {item.scores ? item.scores[0].score : null}
          {"\n"}
          {item.away_team}
          {": "}
          {item.scores ? item.scores[1].score : null}
        </Text>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white"/>
      }
    />
  </SafeAreaView>
);
  
}

//Stylesheet
const styles = StyleSheet.create({
  container:{
    backgroundColor: "#0d0b04",
    // backgroundColor:'white',
    flex:1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginHorizontal: 10,
    color: "white",
    fontFamily:'Nexa',
    // fontWeight:'bold'
  },
  title: {
    textAlign:'center',
    fontSize:30,
    fontFamily: 'Nexa',
    color: "white",
    fontWeight:'bold'
  }
});
