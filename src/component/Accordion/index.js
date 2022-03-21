import { FlatList, LayoutAnimation, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import {AccordionStyled, ArrowIcon, Child, Parent, ParentItem} from './styled';
import { styles } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { SET_OPENED_FILE } from "../../state/modules/openedFile/types";
import { getJoke } from "../../api";
import { SET_LIST_JOKE } from "../../state/modules/listCategory/types";

const Accordion = ({ category, refreshing,...rest}) => {
  const selectedCategory = useSelector(state => state.OpenedFile)
  const listCategory = useSelector(state => state.ListCategory)
  const dispatch = useDispatch()

  const toggleExpand = (newCategory, goTop = false) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (selectedCategory.data === newCategory && !goTop) {
      dispatch({type: SET_OPENED_FILE, payload: ''})
      return
    }
    dispatch({type: SET_OPENED_FILE, payload: newCategory})
  };

  const getJokeAPI = async (amount, addNew = false) => {
    try {
      const res = await getJoke(amount, category.item.category)
      dispatch({type: SET_LIST_JOKE, payload: {
        category: category.item.category,
          jokes: addNew ? [...category.item.jokes, res] : res.jokes,
          addCount: !addNew ? 2 : category.item.addCount - 1}})
    } catch (e){
      console.log(e.message)
    }
  }

  useEffect(() => {
    getJokeAPI(2)
  }, [])

  useEffect(() => {
    if (refreshing) {
      dispatch({type: SET_OPENED_FILE, payload: ''})
      getJokeAPI(2)
    }
  }, [refreshing])

  return (
    <AccordionStyled {...rest}>
      <Parent>
        <ParentItem>
          <View >
            <Text style={styles.textStyle}>{category.index + 1}. {category.item.category}</Text>
          </View>
        </ParentItem>
        <TouchableOpacity
          disabled={category.index === 0}
          style={{marginRight: 16}}
          onPress={() => toggleExpand(listCategory?.data[0].category, true)}>
          <Text
            style={{
              ...styles.textStyle ,
              color: '#00fdff',
              fontWeight: 'bold'
            }}>
            {category.index === 0 ?'TOP': 'Go to TOP' }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: 24, height: 24}}
          onPress={() => toggleExpand(category.item.category)}>
          <ArrowIcon
            source={
              selectedCategory?.data === category.item.category
                ? require('../../assets/png/arrow-up/arrow-up.png')
                : require('../../assets/png/arrow-down/arrow-down.png')
            }
          />
        </TouchableOpacity>
      </Parent>
      {selectedCategory?.data === category.item.category &&
        <FlatList
          data={category.item.jokes}
          renderItem={(joke) => (
            <Child style={styles.accordionChild}>
              <Text style={styles.textStyle}>{joke.item.joke}</Text>
            </Child>
          )}
          keyExtractor={(joke) => joke}
          ListEmptyComponent={() => (
            <Text
              style={{
                ...styles.textStyle ,
                color: '#00fdff',
                textAlign: 'center',
                marginBottom: 16
              }}>
              No Joke
            </Text>
          )}
          ListFooterComponent={() => (
            category.item.addCount > 0 && category.item.jokes?.length > 0?
            <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => {getJokeAPI(1, true)}}>
              <Text
                style={{
                  ...styles.textStyle ,
                  color: '#00fdff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: 16
                }}>
                Add New Joke
              </Text>
            </TouchableOpacity> : <></>
          )}
        />
      }
    </AccordionStyled>
  );
};

export default Accordion;
