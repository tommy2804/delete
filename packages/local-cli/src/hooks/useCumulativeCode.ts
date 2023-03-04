import { useTypedSelector } from './useTypedSelector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    // use var instead of const to avoid error when reassigning show
    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = (value) => {
          const root = document.querySelector('#root');
          if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
              _ReactDOM.render(value, root);
            }
            else {
              root.innerHTML = JSON.stringify(value);
            }
          } else {
            root.innerHTML = value;
          }
        };
        `;

    const showFuncNoop = 'var show = () => {};';

    const cumlativeCode = [];

    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumlativeCode.push(showFunc);
        } else {
          cumlativeCode.push(showFuncNoop);
        }
        cumlativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumlativeCode;
  }).join('\n');
};
