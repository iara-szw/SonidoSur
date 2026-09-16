import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
export default function CampoFormulario({
  control,
  name,
  label,
  placeholder,
  rules = {},
  keyboardType = 'default',
  secureTextEntry = false,
  maxLength,
  error,
}) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder={placeholder}
            placeholderTextColor="#9aa0a6"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
          />
        )}
      />
      {error && <Text style={styles.textoError}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1f2933',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#111827',
  },
  inputError: {
    borderColor: '#e11d48',
  },
  textoError: {
    color: '#e11d48',
    fontSize: 12,
    marginTop: 4,
  },
});