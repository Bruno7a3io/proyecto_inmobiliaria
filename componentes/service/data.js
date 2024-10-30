import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value, key) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
     console.log('----------------error storeData-------------');
     console.log(e);
     console.log('------------------------------------------');
    }
  };
  
  const storeObj = async (value, key) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log('----------------error storeObj-------------');
      console.log(e);
      console.log('------------------------------------------');
      // saving error
    }
  };
  
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
      return value;
     /* console.log('----------------get getData-------------');
      console.log(value);
      console.log('------------------------------------------');
        // value previously stored*/
      }
    } catch (e) {
      console.log('----------------error getData-------------');
      console.log(e);
      console.log('------------------------------------------');
    }
  };
  
  const getObj = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('----------------error getObj-------------');
      console.log(e);
      console.log('------------------------------------------');
      // error reading value
    }
  };
  
export{
    storeData, storeObj, getData, getObj
};