import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import React from 'react'
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'
import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Detail() {
  const navigation = useNavigation()
  const message = 'Olá APAD , Estou entrando em contato pois minha cadelinha sofreu um acindente, podem me ajudar?'
  function navigateBack() {
    navigation.goBack()
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: 'Herói do caso: Cadelinha atropelada',
      recipients: ['baroquedo1997@gmail.com'],
      body: message
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone="+5511959782238"&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.IncidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.Incidentvalue}>APAD</Text>

        <Text style={styles.IncidentProperty}>CASO:</Text>
        <Text style={styles.Incidentvalue}>Cadelinha atropelada</Text>

        <Text style={styles.IncidentProperty}>VALOR:</Text>
        <Text style={styles.Incidentvalue}>R$ 120,00</Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia</Text>
        <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>
        <Text style={styles.heroDescription}> Entre em contato</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={sendWhatsapp} style={styles.action}>
            <Text style={styles.actionText}> WhatsApp </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={sendMail} style={styles.action}>
            <Text style={styles.actionText}> E-mail </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
