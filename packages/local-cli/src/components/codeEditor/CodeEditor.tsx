import './CoseEditor.css';
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };
  const onFormatClick = () => {
    // get current value from the editor
    const uformatted = editorRef.current.getModel().getValue();
    // format that value
    const formatted = prettier
      .format(uformatted, {
        parser: 'babel',
        plugins: [parser],
        singleQuote: true,
        useTabs: false,
        semi: true,
        bracketSpacing: true,
      })
      .replace(/\n$/, '');

    // set the formatted value vack in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={onFormatClick}>
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        language="javascript"
        height="100%"
        theme="vs-dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          automaticLayout: true,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          readOnly: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
