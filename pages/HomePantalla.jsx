import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Footer from '../componentes/Footer'
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Sonido Sur</Text>
      <Text style={styles.subtitulo}>Festival de musica</Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Inscripcion')}
        activeOpacity={0.85}
      >
        <Text style={styles.textoBoton}>Inscribirse</Text>
      </TouchableOpacity>
      <Footer></Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f9fafb',
  },
  titulo: {
    fontSize: 36,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 48,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});