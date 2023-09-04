import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Tooltip } from "antd"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SummeryComponent from '../components/SummeryComponent';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import TranslationComponent from '../components/TranslationComponent';

const SummeryCalc = () => {
    const [story, setStory] = useState();
    const [storyLength, setStoryLength] = useState(0);
    const [summery, setSummery] = useState();
    const [summeryLength, setSummeryLength] = useState(0);
    const [summery1, setSummery1] = useState();
    const [summeryLength1, setSummeryLength1] = useState(0);
    const [loading,setLoading] = useState(false);
    
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
            <div className="wrap">
                <div className="left">
                    <textarea onChange={(e) => setStory(e.target.value)}
                        value={story} spellCheck="true"
                        placeholder='Describe your paragraph or text and  AI will help you summarize it.' />
                    <div className="bar">
                        <p>{storyLength} Words</p>
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
                                <CopyToClipboard text={story}>
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

            <center><p style={{padding:"0.5rem 0"}}>Developed by Summerizer Team</p></center>
         
            {/* <div className='select'>
                  <select  className='custom-select' style={{height:"24px",width:"100%",maxWidth:"200px"}}>
<option value="af">Afrikaans</option>
<option value="sq">Albanian</option>
<option value="am">Amharic</option>
<option value="ar">Arabic</option>
<option value="hy">Armenian</option>
<option value="az">Azerbaijani</option>
<option value="eu">Basque</option>
<option value="be">Belarusian</option>
<option value="bn">Bengali</option>
<option value="bs">Bosnian</option>
<option value="bg">Bulgarian</option>
<option value="ca">Catalan</option>
<option value="ceb">Cebuano</option>
<option value="ny">Chichewa</option>
<option value="zh-CN">Chinese simp.</option>
<option value="zh-TW">Chinese trad.</option>
<option value="co">Corsican</option>
<option value="hr">Croatian</option>
<option value="cs">Czech</option>
<option value="da">Danish</option>
<option value="nl">Dutch</option>
<option value="en" selected="selected">English</option>
<option value="eo">Esperanto</option>
<option value="et">Estonian</option>
<option value="tl">Filipino</option>
<option value="fi">Finnish</option>
<option value="fr">French</option>
<option value="fy">Frisian</option>
<option value="gl">Galician</option>
<option value="ka">Georgian</option>
<option value="de">German</option>
<option value="el">Greek</option>
<option value="gu">Gujarati</option>
<option value="ht">Haitian Creole</option>
<option value="ha">Hausa</option>
<option value="haw">Hawaiian</option>
<option value="iw">Hebrew</option>
<option value="hi">Hindi</option>
<option value="hmn">Hmong</option>
<option value="hu">Hungarian</option>
<option value="is">Icelandic</option>
<option value="ig">Igbo</option>
<option value="id">Indonesian</option>
<option value="ga">Irish</option>
<option value="it">Italian</option>
<option value="ja">Japanese</option>
<option value="jw">Javanese</option>
<option value="kn">Kannada</option>
<option value="kk">Kazakh</option>
<option value="km">Khmer</option>
<option value="ko">Korean</option>
<option value="ku">Kurdish (Kurmanji)</option>
<option value="ky">Kyrgyz</option>
<option value="lo">Lao</option>
<option value="la">Latin</option>
<option value="lv">Latvian</option>
<option value="lt">Lithuanian</option>
<option value="lb">Luxembourgish</option>
<option value="mk">Macedonian</option>
<option value="mg">Malagasy</option>
<option value="ms">Malay</option>
<option value="ml">Malayalam</option>
<option value="mt">Maltese</option>
<option value="mi">Maori</option>
<option value="mr">Marathi</option>
<option value="mn">Mongolian</option>
<option value="my">Myanmar (Burmese)</option>
<option value="ne">Nepali</option>
<option value="no">Norwegian</option>
<option value="ps">Pashto</option>
<option value="fa">Persian</option>
<option value="pl">Polish</option>
<option value="pt">Portuguese</option>
<option value="pa">Punjabi</option>
<option value="ro">Romanian</option>
<option value="ru">Russian</option>
<option value="sm">Samoan</option>
<option value="gd">Scots Gaelic</option>
<option value="sr">Serbian</option>
<option value="st">Sesotho</option>
<option value="sn">Shona</option>
<option value="sd">Sindhi</option>
<option value="si">Sinhala</option>
<option value="sk">Slovak</option>
<option value="sl">Slovenian</option>
<option value="so">Somali</option>
<option value="es">Spanish</option>
<option value="su">Sundanese</option>
<option value="sw">Swahili</option>
<option value="sv">Swedish</option>
<option value="tg">Tajik</option>
<option value="ta">Tamil</option>
<option value="te">Telugu</option>
<option value="th">Thai</option>
<option value="tr">Turkish</option>
<option value="uk">Ukrainian</option>
<option value="ur">Urdu</option>
<option value="uz">Uzbek</option>
<option value="vi">Vietnamese</option>
<option value="cy">Welsh</option>
<option value="xh">Xhosa</option>
<option value="yi">Yiddish</option>
<option value="yo">Yoruba</option>
<option value="zu">Zulu</option>
</select>
                  </div>
                  <button type="submit" value="Build Now" className="builder-btn" id="appDesBuild" disabled="disabled">Translate</button>




               <div className="translate">
                   
<TranslationComponent summery={summery1}
                        summeryLength={summeryLength1}
                        setSummery={setSummery1}/>
                </div>   */}

        </section>
    )
}

export default SummeryCalc