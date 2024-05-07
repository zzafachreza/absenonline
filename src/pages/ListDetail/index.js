import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import axios from 'axios';
import { fonts, windowWidth } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
export default function ListDetail({ navigation, route }) {
  const item = route.params;
  console.log(item)
  const webURL = 'https://absen.okeadmin.com/transaksi/'
  console.log(`${webURL}map/${item.id_absen}`)
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>

      <WebView source={{ uri: `${webURL}map/${item.id_absen}` }} style={{ height: 300 }} />

      <View style={{
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
        bottom: 10,
        position: 'absolute',
        width: windowWidth / 1.2,
        alignSelf: 'center'

      }}>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text
            style={{
              flex: 1,
              fontSize: windowWidth / 30,
              color: colors.primary,
              fontFamily: fonts.secondary[600],
            }}>
            {item.tanggal}
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              color: colors.black,
              fontFamily: fonts.secondary[600],
            }}>
            {item.tanggal_pulang}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderTopWidth: 1,
            borderTopColor: colors.tertiary,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              // flex: 1,
            }}>
            <Text
              style={{
                fontSize: windowWidth / 30,
                fontFamily: fonts.secondary[600],
                color: colors.success,
              }}>
              MASUK
            </Text>
            <Image source={{
              uri: 'https://absen.okeadmin.com/absen/' + item.foto_masuk
            }} style={{
              height: 100,
              marginVertical: 5,
              borderRadius: 5,
              width: 80,
            }} />
            <Text
              style={{
                fontSize: windowWidth / 30,
                textAlign: 'center',
                color: colors.success,
              }}>
              {item.jam_masuk}
            </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text
              style={{
                fontSize: windowWidth / 30,
                textAlign: 'center',
                backgroundColor: colors.zavalabs2,
                color: colors.white,
                paddingHorizontal: 10,
              }}>
              LAMA KERJA
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 30,
                textAlign: 'center',
                color: colors.black,
              }}>
              {item.durasi}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',

              // flex: 1,
            }}>
            <Text
              style={{
                fontSize: windowWidth / 30,
                fontFamily: fonts.secondary[600],
                color: colors.danger,
              }}>
              PULANG
            </Text>
            <Image source={{
              uri: 'https://absen.okeadmin.com/absen/' + item.foto_pulang
            }} style={{
              height: 100,
              marginVertical: 5,
              borderRadius: 5,
              width: 80,
            }} />
            <Text
              style={{
                fontSize: windowWidth / 30,
                textAlign: 'center',
                color: colors.danger,
              }}>
              {item.jam_pulang}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.primary,

    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    height: 80,
    margin: 5,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    textAlign: 'center',
  },
  date: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    textAlign: 'center',
  },
});
