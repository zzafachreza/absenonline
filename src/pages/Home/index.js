import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { storeData, getData } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Home({ navigation }) {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');
  const [tipe, setTipe] = useState('');
  const [company, setCompany] = useState({});

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    // alert(obj.notification);
    // console.log('list transaksi', obj.notification);
    getData('user').then(res => {
      setUser(res);
      // console.log(res);
      // alert('email' + res.email + ' dan password ' + res.password);

    });
  });

  useEffect(() => {
    getData('company').then(res => {
      setCompany(res);
    });

    getData('tipe').then(res => {
      setTipe(res);
    });

    getData('user').then(res => {
      console.log(res);
      setUser(res);


      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
      });
    });

    axios
      .post('https://absen.okeadmin.com/api/update_token.php', {
        id_member: user.id,
        token: token,
      })
      .then(res => {
        console.log('update token', res);
      });
  }, []);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const DataKategori = ({
    icon,
    nama,
    nama2,
    onPress,
    warna = colors.primary,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: warna,
          padding: 5,
          borderRadius: 10,
          width: windowWidth / 2.5,
          height: windowHeight / 5,
          elevation: 5,
          justifyContent: 'center',
        }}>
        <View>
          <Icon
            type="ionicon"
            name={icon}
            color={colors.white}
            size={windowWidth / 5}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 30,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            {nama}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 30,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            {nama2}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      // source={require('../../assets/back.jpeg')}
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>

      <ScrollView>
        {/* bagian untuk point dan redeem */}

        <View
          style={{
            height: windowHeight / 9,
            padding: 10,
            marginBottom: 10,
            backgroundColor: colors.primary,
            flexDirection: 'row',
            // borderBottomLeftRadius: 10,
            // borderBottomRightRadius: 10,
          }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ paddingLeft: 10 }}>
              <Text
                style={{
                  fontSize: windowWidth / 32,
                  color: colors.white,
                  fontFamily: fonts.secondary[400],
                }}>
                Selamat datang,
              </Text>
              <Text
                style={{
                  fontSize: windowWidth / 32,
                  color: colors.white,
                  fontFamily: fonts.secondary[600],
                }}>
                {user.nama_lengkap}
              </Text>
              <Text
                style={{
                  fontSize: windowWidth / 32,
                  color: colors.white,
                  fontFamily: fonts.secondary[600],
                }}>
                {user.divisi} - {user.jabatan}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/logo.png')}
              style={{ width: 40, resizeMode: 'contain' }}
            />
          </View>
        </View>

        <MyCarouser />

        {/* <MyDashboard tipe={tipe} /> */}

        <View
          style={{
            padding: 10,
            marginTop: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 0,
            }}>
            <DataKategori
              warna={colors.primary}
              onPress={() => navigation.navigate('Akses', {
                jenis: 'KANTOR'
              })}
              icon="camera-outline"
              nama="ABSEN"
              nama2="ONLINE"
            />
            <DataKategori
              warna="#25DBDB"
              onPress={() => navigation.navigate('SuratIzin')}
              icon="warning-outline"
              nama="PENGAJUAN"
              nama2="IZIN / SAKIT"
            />
          </View>
          {/*  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <DataKategori
              warna="#FDC24F"
              onPress={() => navigation.navigate('ListData')}
              icon="book-outline"
              nama="HISTORY"
              nama2="ABSENSI"
            />
            <DataKategori
              warna="#E00F0F"
              onPress={() => navigation.navigate('ListData2')}
              icon="list-outline"
              nama="HISTORY"
              nama2="IZIN / SAKIT"
            />
          </View>

          {/*  */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})