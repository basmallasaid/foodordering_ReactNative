import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

export default function ProductDetails() {
   const {params}= useRoute()
  return (
    <View style={{margin:20,padding:20 ,gap:10}}>
      <Text>ProductDetails </Text>
      <Image source={{ uri: params.image }} style={{ width: 200, height: 200 }} />
      <Text>{params.name}</Text>
      <Text>{params.category}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})