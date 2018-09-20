// @flow

export const colors = {
  STANDARD: 'rgba(0, 0, 0, 1.0)',
  LAB_PRIMARY: 'rgba(0, 173, 239, 1.0)', // #00adef
  LAB_SECONDARY: 'rgba(26, 37, 72, 1.0)', // #1a2548
  YES_BUTTON: 'rgba(87, 167, 0, 1.0)', // #57A700
  NO_BUTTON: 'rgba(255, 0, 0, 1.0)', // #FF0000
  DISABLED_BUTTON: 'rgba(211, 211, 211, 1.0)', // #D3D3D3
};

export const changeOpacity = (color: String, newOpacity: String) => {
  return color.slice(0, -4) + newOpacity + ')';
};
