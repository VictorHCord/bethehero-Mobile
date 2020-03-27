import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import styles from './styles'

export default function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [Total, setTotal] = useState(0)

  const navigation = useNavigation()

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident })
  }

  useEffect(() => {
    async function loadIncidents() {
      const response = await api.get('incidents')

      setIncidents(response.data)
      setTotal(response.headers['x-total-count'])
    }
    loadIncidents()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{Total} casos.</Text>
        </Text>
      </View>
      <Text style={styles.title}> Bem-vindo </Text>
      <Text style={styles.description}> Escolha um dos casos abaixo e salve o dia. </Text>
      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <View style={styles.Incidents}>
            <Text style={styles.IncidentProperty}>ONG:</Text>
            <Text style={styles.Incidentvalue}>{incident.name}</Text>

            <Text style={styles.IncidentProperty}>CASO:</Text>
            <Text style={styles.Incidentvalue}>{incident.title}</Text>

            <Text style={styles.IncidentProperty}>VALOR:</Text>
            <Text style={styles.Incidentvalue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
              <Text style={styles.detailsButtonText}> Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}
