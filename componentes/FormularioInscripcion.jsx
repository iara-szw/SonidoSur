import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet,} from 'react-native';
import { useForm } from 'react-hook-form';
import CampoFormulario from './CampoFormulario.jsx';

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_SOLO_NUMEROS = /^[0-9]+$/;
const OPCIONES_ENTRADA = [
  { valor: 'general', etiqueta: 'General' },
  { valor: 'vip', etiqueta: 'VIP' },
];
export default function FormularioInscripcion({ onInscribirse }) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombreCompleto: '',
      email: '',
      edad: '',
      tipoEntrada: '',
      telefono: '',
    },
    mode: 'onBlur',
  });

  const valores = watch();
  const faltanCamposObligatorios =
    !valores.nombreCompleto?.trim() ||
    !valores.email?.trim() ||
    !valores.edad ||
    !valores.tipoEntrada;
  const hayErrores = Object.keys(errors).length > 0;
  const botonDeshabilitado = faltanCamposObligatorios || hayErrores;

  const onSubmit = (datos) => {
    onInscribirse({ ...datos, nombreCompleto: datos.nombreCompleto.trim() });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>Sonido Sur</Text>
        <Text style={styles.subtitulo}>Formulario de inscripción</Text>

        <CampoFormulario
          control={control}
          name="nombreCompleto"
          label="Nombre completo"
          placeholder="Ej: Juana Pérez"
          rules={{
            validate: (valor) =>
              (valor && valor.trim().length >= 3) || 'Ingresá tu nombre completo',
          }}
          error={errors.nombreCompleto}
        />

        <CampoFormulario
          control={control}
          name="email"
          label="Email"
          placeholder="Ej: juanaL@gmail.com"
          keyboardType="email-address"
          rules={{
            validate: (valor) => (valor && REGEX_EMAIL.test(valor)) || 'Ingresá un email válido',
          }}
          error={errors.email}
        />

        <CampoFormulario
          control={control}
          name="edad"
          label="Edad"
          placeholder="Ej: 17"
          keyboardType="numeric"
          maxLength={3}
          rules={{
            validate: (valor) => {
              const numero = Number(valor);
              if (!valor || Number.isNaN(numero) || numero < 12 || numero > 99) {
                return 'La edad tiene que estar entre 12 y 99 años';
              }
              return true;
            },
          }}
          error={errors.edad}
        />

        <View style={styles.contenedorSelector}>
         <Text style={styles.label}>Tipo de entrada</Text>
             <View style={styles.filaBotones}>
              {OPCIONES_ENTRADA.map((opcion) => {
              const seleccionado = valores.tipoEntrada === opcion.valor;
             return (
              <TouchableOpacity
                key={opcion.valor}
                style={[styles.botonOpcion, seleccionado && styles.botonOpcionSeleccionado]}
                onPress={() => setValue('tipoEntrada', opcion.valor, { shouldValidate: true })}
                activeOpacity={0.8}
        >
          <Text style={[styles.textoOpcion, seleccionado && styles.textoOpcionSeleccionado]}>
            {opcion.etiqueta}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
  {errors.tipoEntrada && <Text style={styles.textoError}>{errors.tipoEntrada.message}</Text>}
</View>

        <CampoFormulario
          control={control}
          name="telefono"
          label="Teléfono (opcional)"
          placeholder="Ej: 1155555555"
          keyboardType="phone-pad"
          rules={{
            pattern: { value: REGEX_SOLO_NUMEROS, message: 'Solo se permiten números' },
          }}
          error={errors.telefono}
        />

        <TouchableOpacity
          style={[styles.botonEnviar, botonDeshabilitado && styles.botonDeshabilitado]}
          onPress={handleSubmit(onSubmit)}
          disabled={botonDeshabilitado}
        >
          <Text style={styles.textoBotonEnviar}>Confirmar inscripción</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenido: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitulo: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 24,
  },
  botonEnviar: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  botonDeshabilitado: {
    backgroundColor: '#c7c9f5',
  },
  textoBotonEnviar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  contenedorSelector: { marginBottom: 16 },
label: { fontSize: 14, fontWeight: '600', marginBottom: 6, color: '#1f2933' },
filaBotones: { flexDirection: 'row', gap: 10 },
botonOpcion: {
  flex: 1,
  borderWidth: 1,
  borderColor: '#d1d5db',
  borderRadius: 10,
  paddingVertical: 12,
  alignItems: 'center',
  backgroundColor: '#fff',
},
botonOpcionSeleccionado: { backgroundColor: '#4f46e5', borderColor: '#4f46e5' },
textoOpcion: { fontSize: 15, fontWeight: '600', color: '#374151' },
textoOpcionSeleccionado: { color: '#fff' },
textoError: { color: '#e11d48', fontSize: 12, marginTop: 4 },
});