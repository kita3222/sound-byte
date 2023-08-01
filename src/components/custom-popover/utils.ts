// ----------------------------------------------------------------------

export function getPosition(arrow: string) {
  let props;

  switch (arrow) {
    case 'top-left':
      props = {
        style: { ml: -0.75 },
        anchorOrigin: { vertical: 'bottom' },
        transformOrigin: { vertical: 'top' },
      };
      break;
    case 'top-center':
      props = {
        style: {},
        anchorOrigin: { vertical: 'bottom' },
        transformOrigin: { vertical: 'top' },
      };
      break;
    case 'top-right':
      props = {
        style: { ml: 0.75 },
        anchorOrigin: { vertical: 'bottom' },
        transformOrigin: { vertical: 'top' },
      };
      break;
    case 'bottom-left':
      props = {
        style: { ml: -0.75 },
        anchorOrigin: { vertical: 'top' },
        transformOrigin: { vertical: 'bottom' },
      };
      break;
    case 'bottom-center':
      props = {
        style: {},
        anchorOrigin: { vertical: 'top' },
        transformOrigin: { vertical: 'bottom' },
      };
      break;
    case 'bottom-right':
      props = {
        style: { ml: 0.75 },
        anchorOrigin: { vertical: 'top' },
        transformOrigin: { vertical: 'bottom' },
      };
      break;
    case 'left-top':
      props = {
        style: { mt: -0.75 },
        anchorOrigin: { vertical: 'top' },
        transformOrigin: { vertical: 'top' },
      };
      break;
    case 'left-center':
      props = {
        anchorOrigin: { vertical: 'center' },
        transformOrigin: { vertical: 'center' },
      };
      break;
    case 'left-bottom':
      props = {
        style: { mt: 0.75 },
        anchorOrigin: { vertical: 'bottom' },
        transformOrigin: { vertical: 'bottom' },
      };
      break;
    case 'right-top':
      props = {
        style: { mt: -0.75 },
        anchorOrigin: { vertical: 'top' },
        transformOrigin: { vertical: 'top' },
      };
      break;
    case 'right-center':
      props = {
        anchorOrigin: { vertical: 'center' },
        transformOrigin: { vertical: 'center' },
      };
      break;
    case 'right-bottom':
      props = {
        style: { mt: 0.75 },
        anchorOrigin: { vertical: 'bottom' },
        transformOrigin: { vertical: 'bottom' },
      };
      break;

    // top-right
    default:
      props = {
        style: { ml: 0.75 },
        anchorOrigin: { vertical: 'bottom' },
        transformOrigin: { vertical: 'top' },
      };
  }

  return props;
}
