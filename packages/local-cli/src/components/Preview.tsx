import { useRef, useEffect } from 'react';
import './preview.css';
interface PreviewProps {
  code: string;
  error: string;
}

const html = `
<html>
<head>
<style>html {background-color: white;}</style>
  <meta charset="UTF-8">
</head>
<body>
  <div id="root"></div>
  <script>
  const handleError = (err)=> {
    const root= document.querySelector('#root');
    root.innerHTML = '<div style="color: red;"><h4>you ran an Error</h4>' + err + '</div>'
    console.error(err);
  }
  window.addEventListener('error',(event)=>{
    // prevents the console log default of the browser
    event.preventDefault(); 
    handleError(event.error);
  })

  window.addEventListener('message', (event)=> {
    try{
    eval(event.data)
    }catch(err){
      handleError(err)
    }
  })
  </script>
</body>

</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe ref={iframe} title="preview" sandbox="allow-scripts" srcDoc={html} />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
