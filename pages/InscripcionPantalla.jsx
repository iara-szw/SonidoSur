import React, { useState } from 'react';
import { View } from 'react-native';
import FormularioInscripcion from '../componentes/FormularioInscripcion';
import TicketConfirmacion from '../componentes/TicketConfirmacion';
import Footer from '../componentes/Footer'

export default function InscripcionScreen() {
  const [datosConfirmados, setDatosConfirmados] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      {datosConfirmados ? (
        <TicketConfirmacion
          datos={datosConfirmados}
          onVolver={() => setDatosConfirmados(null)}
        />
      ) : (
        <FormularioInscripcion onInscribirse={setDatosConfirmados} />
      )}
            <Footer></Footer>
    </View>
  );
}