import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';

export default function Footer() {
  const navigation = useNavigation();
  const pantallaActual = useNavigationState((estado) => estado.routes[estado.index].name);

  return (
    <View style={styles.contenedor}>
      <View style={styles.enlaces}>
        <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
          <Text style={[styles.enlace, pantallaActual === 'Inicio' && styles.enlaceActivo]}>
            Inicio
          </Text>
        </TouchableOpacity>

        <Text style={styles.separador}>·</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Inscripcion')}>
          <Text style={[styles.enlace, pantallaActual === 'Inscripcion' && styles.enlaceActivo]}>
            Inscripción
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.texto}>🎵 Sonido Sur · 2026</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  enlaces: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  enlace: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    paddingHorizontal: 8,
  },
  enlaceActivo: {
    color: '#4f46e5',
  },
  separador: {
    color: '#d1d5db',
  },
  texto: {
    fontSize: 12,
    color: '#9ca3af',
  },
});