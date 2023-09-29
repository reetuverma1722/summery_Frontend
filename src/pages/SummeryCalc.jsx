import React, { useEffect, useState, useRef } from 'react'
import axios from "axios";
import { Tooltip } from "antd"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SummeryComponent from '../components/SummeryComponent';
import logo from "../assets/logo.jpg"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import TranslationComponent from '../components/TranslationComponent';

import useFileUpload from 'react-use-file-upload';
import Paragraph from 'antd/es/skeleton/Paragraph';
const SummeryCalc = () => {
  const [story, setStory] = useState("");
  const [storyLength, setStoryLength] = useState(0);
  const [summery, setSummery] = useState();
  const [summeryLength, setSummeryLength] = useState(0);
  const [summery1, setSummery1] = useState();
  const [summeryLength1, setSummeryLength1] = useState(0);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [bullet, setBullet] = useState([])



  const handleTextareaChange = (e) => {
    const newText = e.target.value;
    setStory(newText);
    setStoryLength(newText.split(' ').filter((word) => word !== '').length);
  };


  const handleParagraph = () => {
    setActive(false)
    setSummery(summery);
  }

  const handleBullet = () => {
    setActive(true)
    const arrayOfStrings = summery.split('. ');
    setBullet(arrayOfStrings);

  }
  const {
    fileNames,
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

  const handleClick = async () => {
    try {
      setLoading(true)
      const result = await axios.post("https://flask-app2-rg15.onrender.com/send_data2", { data: story })
      console.log(result?.data)
      if (result?.data) {
        setSummery(result?.data?.summery[0]?.summary_text)
      }
    } catch (error) {
      console.log(error)
    } finally {
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
        <img src={logo} alt="logo" />
      </div>
      <div className="top">
        <h4>Generative AI Summarization</h4>
      </div>
      <div className="flex-col output_options_main ">
        <div className="mode_for_desktop">


          <div className="output_options">
            <label
              htmlFor="summary_title"
              className={!active ? "summary_title active" : "summary_title"}
              data-option="1"
              onClick={handleParagraph}
            >
              Summary
            </label>
            <label
              htmlFor="show-bullets"
              className={active ? "summary_title active" : "summary_title"}
              data-option="2"
              onClick={handleBullet}

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
                    <Tooltip placement="top" title="Upload File"><span placement='top' onClick={() => inputRef.current.click()}> <i className='bx bxs-cloud-upload'></i></span></Tooltip>
                    <input
                      ref={inputRef}
                      type="file"
                      title='Upload File'
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
                  <span className='s-btn' onClick={() => { story === "" ? "" : toast("Story Copied") }}>
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

            </div>
          </div>
        </div>
        <div className="right">
          <SummeryComponent
            summery={summery}
            summeryLength={summeryLength}
            setSummery={setSummery}
            loading={loading}
            setSummery1={setSummery1}
            summery1={summery1}
            bullet={bullet}
            active={!active}

          />
        </div>
      </div>
      <button type="submit" className={loading ? "builder-btn2" : "builder-btn"} id="appDesBuild" disabled={loading || story === ""}
        onClick={handleClick}>{loading ? "Loading...." : "Summarize"}</button>
      <br></br>
      <br></br>
      <center><p style={{ padding: "0.5rem 0" }}>Developed by Summarizer Team</p></center>
    </section>
  )
}

export default SummeryCalc;