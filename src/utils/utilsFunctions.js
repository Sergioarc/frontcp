import map from 'lodash/map';
import forEach from 'lodash/forEach';
import uniq from 'lodash/uniq';

export const processResponse = (data) => {
  const colonias = [];
  const estados = [];
  const municipios = [];
  map(data, (obj) => {
    forEach(obj, (value, key) => {
      if (key === 'colonia'){
        colonias.push(value);
      }
      if (key === 'estado'){
        estados.push(value);
      }
      if (key === 'municipio'){
        municipios.push(value);
      }
    });
  });
  return {
    colonias: uniq(colonias),
    estados: uniq(estados),
    municipios: uniq(municipios),
  };
};

export const processResponse2 = async (token, data) => {
  return 'hola';
}
