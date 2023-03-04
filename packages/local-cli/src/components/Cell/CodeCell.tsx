import { useEffect } from 'react';
import { Cell } from '../../state';
import CodeEditor from '../codeEditor/CodeEditor';
import Preview from '../Preview';
import Resizable from '../Resizable';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './codeCell.css';
import { useCumulativeCode } from '../../hooks/useCumulativeCode';

interface CodeCellProps {
  cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);
    return () => clearTimeout(timer);
  }, [cumulativeCode, cell.id, createBundle]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => updateCell(cell.id, value)}
            initialValue={cell.content}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading ...
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
