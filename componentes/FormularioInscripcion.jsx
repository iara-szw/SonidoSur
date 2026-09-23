import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import CampoFormulario from './CampoFormulario.jsx';

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_SOLO_NUMEROS = /^[0-9]+$/;
const OPCIONES_ENTRADA = [
  { valor: 'general', etiqueta: 'General' },
  { valor: 'vip', etiqueta: 'VIP' },
];

export default function FormularioInscripcion({ onInscribirse }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    const cargarUltimoEmail = async () => {
      try {
        const emailGuardado = await AsyncStorage.getItem('sonidosur:last-email');
        if (emailGuardado) {
          setValue('email', emailGuardado);
        }
      } catch (error) {
        console.log('Error al cargar el último email:', error);
      }
    };

    cargarUltimoEmail();
  }, [setValue]);

  const valores = watch();
  const faltanCamposObligatorios =
    !valores.nombreCompleto?.trim() ||
    !valores.email?.trim() ||
    !valores.edad ||
    !valores.tipoEntrada;
  const hayErrores = Object.keys(errors).length > 0;
  const botonDeshabilitado = faltanCamposObligatorios || hayErrores || isSubmitting;

  const onSubmit = (datos) => {
    const emailNormalizado = (datos.email || '').trim();
    setIsSubmitting(true);

    setTimeout(async () => {
      try {
        if (emailNormalizado) {
          await AsyncStorage.setItem('sonidosur:last-email', emailNormalizado);
        }
      } catch (error) {
        console.log('Error al guardar el último email:', error);
      }

      onInscribirse({
        ...datos,
        email: emailNormalizado,
        nombreCompleto: datos.nombreCompleto.trim(),
      });

      setIsSubmitting(false);
    }, 1000);
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
          placeholder="Ej: Juana Lopez"
          rules={{
            required: 'Ingresá tu nombre completo',
            minLength: { value: 3, message: 'Ingresá un nombre de mínimo 3 caracteres' },
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
            required: 'Ingresá un email completo',
            pattern: { value: REGEX_EMAIL, message: 'Ingresá un email válido' },
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
            required: 'Ingresa tu edad',
            min: { value: 12, message: 'La edad tiene que estar entre 12 y 99 años' },
            max: { value: 99, message: 'La edad tiene que estar entre 12 y 99 años' },
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
            maxLength: { value: 15, message: 'Máximo 15 dígitos' },
            minLength: { value: 10, message: 'Mínimo 10 dígitos' },
          }}
          error={errors.telefono}
        />

        <TouchableOpacity
          style={[styles.botonEnviar, botonDeshabilitado && styles.botonDeshabilitado]}
          onPress={handleSubmit(onSubmit)}
          disabled={botonDeshabilitado}
          activeOpacity={0.85}
        >
          <View style={styles.botonContenido}>
            {isSubmitting && <ActivityIndicator size="small" color="#fff" style={styles.spinner} />}
            <Text style={styles.textoBotonEnviar}>
              {isSubmitting ? 'Inscribiendote!' : 'Confirmar inscripción'}
            </Text>
          </View>
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
  botonContenido: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginRight: 8,
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