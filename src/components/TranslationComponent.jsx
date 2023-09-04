import React, { useEffect } from 'react'
import { Tooltip } from "antd"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

const TranslationComponent = ({ summery1, setSummery, summeryLength1 }) => {

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
        if (summery1) {
            const speechSynthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(summery1);
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
        <textarea spellCheck="true"
            onChange={(e) => setSummery(e.target.value)}
            value={summery1} placeholder='Translated Summary....' />
        <div className="bar">
            <p>{summeryLength1} Words</p>
            <div className='fun'>
                <Tooltip placement="top" title="Mic" >
                    {!listening ?
                        <span onClick={SpeechRecognition.startListening}>
                            <i className='bx bx-microphone'></i></span> :
                        <span onClick={SpeechRecognition.stopListening}>
                            <i class='bx bx-microphone-off'></i></span>
                    }
                </Tooltip>
                <Tooltip placement="top" title="Clipboard" >
                    <CopyToClipboard text={summery1}>
                        <span onClick={() => toast.success("Copied")}><i className='bx bx-clipboard'></i></span>
                    </CopyToClipboard>
                </Tooltip>
                <Tooltip placement="top" title="Speak" >
                    <span onClick={handleSpeak}><i className='bx bx-speaker'></i></span>
                </Tooltip>
                <Tooltip placement="top" title="Reset" >
                    <span onClick={handleReset}><i className='bx bx-reset'></i></span>
                </Tooltip>
            </div>

        </div>
    </>
    )
}

export default TranslationComponent;