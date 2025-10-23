import React from 'react';
import { StructuredText as DatoCMSStructuredText } from 'react-datocms';

const StructuredText = (props) => {
  return React.createElement(DatoCMSStructuredText, props);
};

// No intentamos asignar renderRule ya que no existe en el paquete correcto
// StructuredText.renderRule = renderRule;

export default StructuredText;
