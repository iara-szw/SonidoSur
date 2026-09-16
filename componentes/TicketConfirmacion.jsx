import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ETIQUETAS_ENTRADA = {
  general: 'General',
  vip: 'VIP',
};

export default function TicketConfirmacion({ datos, onVolver }) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.ticket}>
        <Text style={styles.encabezado}>Sonido Sur</Text>
        <Text style={styles.subEncabezado}>Inscripción confirmada</Text>

        <View style={styles.separador} />

        <Fila etiqueta="Nombre" valor={datos.nombreCompleto} />
        <Fila etiqueta="Email" valor={datos.email} />
        <Fila etiqueta="Edad" valor={datos.edad} />
        <Fila etiqueta="Entrada" valor={ETIQUETAS_ENTRADA[datos.tipoEntrada]} />
        {!!datos.telefono && <Fila etiqueta="Teléfono" valor={datos.telefono} />}
      </View>

      <TouchableOpacity style={styles.boton} onPress={onVolver} activeOpacity={0.85}>
        <Text style={styles.textoBoton}>Inscribir a otra persona</Text>
      </TouchableOpacity>
    </View>
  );
}

function Fila({ etiqueta, valor }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  ticket: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 28,
  },
  encabezado: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  subEncabezado: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
  separador: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderStyle: 'dashed',
    marginVertical: 18,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  etiqueta: {
    fontSize: 14,
    color: '#6b7280',
  },
  valor: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  boton: {
    borderWidth: 1,
    borderColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  textoBoton: {
    color: '#4f46e5',
    fontSize: 15,
    fontWeight: '700',
  },
});