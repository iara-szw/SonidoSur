import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import FormularioInscripcion from '../componentes/FormularioInscripcion';
import TicketConfirmacion from '../componentes/TicketConfirmacion';
import Footer from '../componentes/Footer';

export default function InscripcionScreen({ datosInscripcion, setDatosInscripcion }) {
  const [datosConfirmados, setDatosConfirmados] = useState(datosInscripcion ?? null);

  useEffect(() => {
    if (datosInscripcion) {
      setDatosConfirmados(datosInscripcion);
    }
  }, [datosInscripcion]);

  const manejarInscribirse = (datos) => {
    setDatosConfirmados(datos);
    setDatosInscripcion(datos);
  };

  const manejarVolver = () => {
    setDatosConfirmados(null);
    setDatosInscripcion(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {datosConfirmados ? (
        <TicketConfirmacion
          datos={datosConfirmados}
          onVolver={manejarVolver}
        />
      ) : (
        <FormularioInscripcion onInscribirse={manejarInscribirse} />
      )}
      <Footer />
    </View>
  );
}