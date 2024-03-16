import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'

export default function ProductItem({item}) {
  return (
    <Pressable>
      <Image 
        resizeMode='contain'
        source={{ uri: item?.image }}
        style={{ width: 150, height: 150}}
      />

      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>{item?.title}</Text>
    
      <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item?.price}</Text>
        <Text style={{ color: 'gray', fontWeight: 'bold' }}>{item?.rating?.rate} ratings</Text>
      </View>

      <Pressable style={{ backgroundColor: '#FFC72C', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginTop: 10 }}>
        <Text>Add to Cart</Text>
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({})