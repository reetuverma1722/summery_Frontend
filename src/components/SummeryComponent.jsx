import React, { useEffect, useRef } from 'react'
import { Tooltip } from "antd"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
const SummeryComponent = ({ summery, setSummery, summeryLength, loading, bullet, active }) => {

  const downloadTxtFile = () => {
    const textContent = summery;
    if (summery === "") {
      return
    }
    const file = new Blob([textContent], { type: 'text/plain' });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = 'Summery.txt';
    document.body.appendChild(element);
    element.click();
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleSpeak = () => {
    if (summery) {
      const speechSynthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(summery);
      speechSynthesis.speak(utterance);
    }
  }

  const handleReset = () => {
    if (summery === "") return
    if (window.confirm("Are you sure you want reset ?"))
      setSummery("")
    resetTranscript()
  }

  useEffect(() => {
    setSummery(transcript)
  }, [transcript])


  return (<>

    {active ? (
      <textarea
        onChange={(e) => setSummery(e.target.value)}
        value={summery}
        spellCheck="true"
        placeholder="Summarize Text Here..."
      />
    ) : (
      <div className='textbox'>
        {summery
          .split('\.')
          .filter((line) => line.trim() !== '')
          .map((line, i) => (
            <li className="bullets-items" key={i}>{line}</li>
          ))}
      </div>
    )}



    <div className="bar">
      <p>{summeryLength} Words</p>
      <div className="fun">
        <Tooltip placement="top" title="Mic">
          {!listening ? (
            <span onClick={SpeechRecognition.startListening}>
              <i className="bx bx-microphone"></i>
            </span>
          ) : (
            <span onClick={SpeechRecognition.stopListening}>
              <i className="bx bx-microphone-off"></i>
            </span>
          )}
        </Tooltip>
        <Tooltip placement="top" title="Clipboard">
          <CopyToClipboard text={summery}>
            <span className='s-btn' onClick={() => { summery === "" ? "" : toast("Summary Copied") }}>
              <i className="bx bx-clipboard"></i>
            </span>
          </CopyToClipboard>
        </Tooltip>
        <Tooltip placement="top" title="Speak">
          <span onClick={handleSpeak}>
            <i className="bx bx-speaker"></i>
          </span>
        </Tooltip>
        <Tooltip placement="top" title="Reset">
          <span onClick={handleReset} >
            <i className="bx bx-reset"></i>
          </span>
        </Tooltip>
        <Tooltip placement="top" title="Download">
          <span onClick={downloadTxtFile}>
            <i className="bx bx-down-arrow-alt"></i>
          </span>
        </Tooltip>
      </div>
    </div>

  </>
  )
}

export default SummeryComponent;