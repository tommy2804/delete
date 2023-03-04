import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import './TextEditor.css';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Cell } from '../../state';
import { useActions } from '../../hooks/useActions';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const clickRef = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (clickRef.current && event.target && clickRef.current.contains(event.target as Node)) {
        console.log('element clicked is inside an element');
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={clickRef}>
        <MDEditor value={cell.content} onChange={(val) => updateCell(cell.id, val || '')} />
      </div>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
