import React, { useEffect, useState,useRef } from 'react'
import axios from "axios";
import { Tooltip } from "antd"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SummeryComponent from '../components/SummeryComponent';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import TranslationComponent from '../components/TranslationComponent';

import useFileUpload from 'react-use-file-upload';
const SummeryCalc = () => {
    const [story, setStory] = useState();
    const [storyLength, setStoryLength] = useState(0);
    const [summery, setSummery] = useState();
    const [summeryLength, setSummeryLength] = useState(0);
    const [summery1, setSummery1] = useState();
    const [summeryLength1, setSummeryLength1] = useState(0);
    const [loading,setLoading] = useState(false);
    
    const downloadTxtFile = () => {
        const textContent = story;
    
    
        const file = new Blob([textContent], { type: 'text/plain' });
    
        
        const element = document.createElement('a');
        element.href = URL.createObjectURL(file);
        element.download = 'downloaded-text.txt';
    

        document.body.appendChild(element); 
        element.click();
      };
      const handleOptionChange = (option) => {
        // Option 1: Summary
        if (option === 1) {
          // Implement logic for handling summary option
          console.log('Option 1: Summary selected');
          // Perform the necessary actions for this option
        }
      
        // Option 2: Bullets
        if (option === 2) {
          // Implement logic for handling bullets option
          console.log('Option 2: Bullets selected');
          // Perform the necessary actions for this option
        }
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
          console.error('Input Field is empty  cannot copied');
          toast.error('Input Field is empty  cannot copied');
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
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = createFormData();
    
        try {
          axios.post('https://some-api.com', formData, {
            'content-type': 'multipart/form-data',
          });
        } catch (error) {
          console.error('Failed to submit files.');
        }
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


    const handleClick = async () => {
        try {
            setLoading(true)
            const result = await axios.post("https://flask-app2-rg15.onrender.com/send_data",{story})
            console.log(result?.data)
            if(result?.data){
                setSummery(result?.data?.summery)
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }


    const handleSpeak = () => {
        if (story) {
            const speechSynthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(story);
            speechSynthesis.speak(utterance);
        }
    }
    const handleReset = () => {
        setStory("")
        resetTranscript()
    }


    useEffect(() => {
        setStoryLength(story?.length)

    }, [story])

    useEffect(() => {

        setSummeryLength(summery?.length)
    }, [summery])


    useEffect(() => {
        setStory(transcript)
    }, [transcript])

console.log(summery)

    return (
        <section className='summery'>
        <div className="navbar-logo">
                   <img src="https://as2.ftcdn.net/v2/jpg/01/67/05/53/1000_F_167055392_O2ezl6LRHajlo3zcgSvXOoJ8BO80UVVi.jpg" alt="logo" />
                </div>
            <div className="top">
                <h4>Generative AI Summarization</h4>
            </div>
            <div className="flex-col output_options_main ">
                        <div className="mode_for_desktop">


                            <div className="output_options">
      <label
        htmlFor="summary_title"
        className={`summary_title`}
        data-option="1"
        onClick={() => handleOptionChange(1)}
      >
        Summary
      </label>
      <label
        htmlFor="show-bullets"
        className={`show-bullets `}
        data-option="2"
        onClick={() => handleOptionChange(2)}

      >
        Bullets
      </label>
    </div>
                       
                       
                        </div>
                    </div>
            <div className="wrap">

           
            <div className="left">
      <textarea
        onChange={handleTextareaChange}
        value={story}
        spellCheck="true" 
        placeholder="Describe your paragraph or text, and AI will help you summarize it."
      />
      <div className="bar">
        <p>{storyLength} Words</p>
        <div className="fun">
          <div>

          <div>
      

      <div className="form-container">
        {/* Display the files to be uploaded */}
        <div>
          <ul>
            {fileNames.map((name) => (
              <li key={name}>
                <span>{name}</span>

                <span onClick={() => removeFile(name)}>
                <i className='bx bx-message-square-x'></i>
                </span>
              </li>
            ))}
          </ul>

         
        </div>

        {/* Provide a drop zone and an alternative button inside it to upload files. */}
        <div
         
          onDragEnter={handleDragDropEvent}
          onDragOver={handleDragDropEvent}
          onDrop={(e) => {
            handleDragDropEvent(e);
            setFiles(e, 'a');
          }}
        >
          <p>Drag and drop files here</p>

          <button onClick={() => inputRef.current.click()}> <i className='bx bxs-cloud-upload'></i>Browse File</button>

          {/* Hide the crappy looking default HTML input */}
          <input
            ref={inputRef}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => {
              setFiles(e, 'a');
              inputRef.current.value = null;
            }}
          />
        </div>
      </div>

     
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
    </div>
                <div className="right">
                    <SummeryComponent
                        summery={summery}
                        summeryLength={summeryLength}
                        setSummery={setSummery}
                        loading={loading}

                    />

                </div>
            </div>
            <button type="submit" value="Build Now" className="builder-btn" id="appDesBuild"  
            onClick={handleClick}>{loading ? "Loading....":"Summarize"}</button>
            <br></br>
            <br></br>

            <center><p style={{padding:"0.5rem 0"}}>Developed by Summarizer Team</p></center>
         
           

        </section>
    )
}

export default SummeryCalc;