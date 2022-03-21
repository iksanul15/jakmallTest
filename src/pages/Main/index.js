import { getCategory } from "../../api";
import { FlatList, RefreshControl, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import Accordion from "../../component/Accordion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_LIST_CATEGORY } from "../../state/modules/listCategory/types";

const Main = () => {
  const categories = useSelector(state => state.ListCategory)
  const dispatch = useDispatch()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getCategoryAPI = async () => {
    try {
      const res = await getCategory()
      dispatch({type: SET_LIST_CATEGORY, payload: res.categories.map(category => {
            return {
              category: category,
              jokes: [],
              addCount: 2
            }
          }
        )
      })
    } catch (e) {
      console.log(e.message)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect( () => {
    getCategoryAPI()
  }, [])

  const onRefresh = () => {
    setIsRefreshing(true)
    getCategoryAPI()
  }

  return (
    <SafeAreaView style={{backgroundColor: '#020202', flex: 1}}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor="#00fdff"
            colors={['#00fdff']}
            onRefresh={onRefresh}
            refreshing={isRefreshing}/>
        }
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: '#020202'}}>
        <View
          style={{
            backgroundColor: '#020202',
            flex: 1
          }}>
          <FlatList
            data={categories?.data}
            renderItem={( category) => (
              <Accordion
                category={category}
                refreshing={isRefreshing}
              />
            )}
            keyExtractor={(category) => category}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Main;
