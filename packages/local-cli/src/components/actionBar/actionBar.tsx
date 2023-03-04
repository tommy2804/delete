import { useActions } from '../../hooks/useActions';
import CustomButton from '../custom/customButton';
import './actionBar.css';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <CustomButton icon="fa-arrow-up" onClick={() => moveCell(id, 'up')} />
      <CustomButton icon="fa-arrow-down" onClick={() => moveCell(id, 'down')} />
      <CustomButton icon="fa-times" onClick={() => deleteCell(id)} />
    </div>
  );
};

export default ActionBar;
