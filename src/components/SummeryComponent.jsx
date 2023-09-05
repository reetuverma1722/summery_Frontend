import React, { useEffect ,useRef} from 'react'
import { Tooltip } from "antd"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import useFileUpload from 'react-use-file-upload';
const SummeryComponent = ({ summery, setSummery, summeryLength,loading }) => {
    const [story, setStory] = useState();
    const [storyLength, setStoryLength] = useState(0);
    const downloadTxtFile = () => {
       
        const textContent = story;
    
       
        const file = new Blob([textContent], { type: 'text/plain' });
    
       
        const element = document.createElement('a');
        element.href = URL.createObjectURL(file);
        element.download = 'downloaded-text.txt';
    
      
        document.body.appendChild(element); 
        element.click();
      };
    
      const handleTextareaChange = (e) => {
        const newText = e.target.value;
        setStory(newText);
        setStoryLength(newText.split(' ').filter((word) => word !== '').length);
      };
      const handleCopyToClipboard = () => {
        if (story && story.length > 0) {
          navigator.clipboard.writeText(story)
            .then(() => {
              toast.success('Text copied to clipboard');
            })
            .catch((error) => {
              console.error('Error copying text to clipboard:', error);
              toast.error('Error copying text to clipboard');
            });
        } else {
          console.error('Cannot copy empty or undefined text to clipboard');
          toast.error('Cannot copy empty or undefined text to clipboard');
        }
      };
      
      
      const {
        files,
        fileNames,
        fileTypes,
        totalSize,
        totalSizeInBytes,
        handleDragDropEvent,
        clearAllFiles,
        createFormData,
        setFiles,
        removeFile,
      } = useFileUpload();
    
      const inputRef = useRef();
    
     
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
        setSummery("")
        resetTranscript()
    }

    useEffect(() => {
        setSummery(transcript)
    }, [transcript])



    return (<>
         
      <textarea
        onChange={handleTextareaChange}
        value={summery}
        spellCheck="true"
        placeholder="Describe your paragraph or text, and AI will help you summarize it."
      />
      <div className="bar">
        <p>{summeryLength} Words</p>
        <div className="fun">
          <div>


          <div>
      

      

     
    </div>

        

          </div>
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
            <CopyToClipboard text={story}>
              <span onClick={handleCopyToClipboard}>
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
            <span onClick={handleReset}>
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

export default SummeryComponent