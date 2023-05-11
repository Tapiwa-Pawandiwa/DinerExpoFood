import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppTextInput from '../AppTextInput'
import { useState } from 'react'

const SearchBar = ({searchFunction}) => {
    const [searchTerm,setSearchTerm] = useState('')
    const handleSearch = () => {
        searchFunction(searchTerm)
    }

  return (
    <View>  
      <AppTextInput
        leftIcon="magnify"
        placeholder="Search"
        placeholderTextColor="#6e6869"
        value={searchTerm}
        onChangeText={ setSearchTerm}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  )
}

export default SearchBar;

const styles = StyleSheet.create({
    searchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 10
    },
    
})
