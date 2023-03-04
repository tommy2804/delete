import { useTypedSelector } from '../../hooks/useTypedSelector';
import CellListItem from './CellListItem';
import AddCell from '../addCell/addCell';
import { Fragment, useEffect } from 'react';
import './cellList.css';
import { useActions } from '../../hooks/useActions';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });
  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, [fetchCells]);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));
  return (
    <div className="cell-list">
      <AddCell prevCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </div>
  );
};
export default CellList;
