import React, { useState, useEffect, useRef } from "react";
import { disassemble } from "es-hangul";
import "./styles/main.scss";
import { useNavigate } from "react-router-dom";

const Contents = [
  "지금 당장 떠나면 아무도 다치지 않는다. 그러지 않으면 너희는 모두 죽어. 탐정 놀이도 이젠 끝이다. 오지 말아야 할 곳에 발을 들였군. 현실로 돌아가면 잊지 말고 전해라. 스텔라론 헌터가 너희들의 마지막을 배웅했다는 것을. 기어투 점화 소각 기폭 소탕 시작. 액션 원 집행 섬멸 시작. 액션 투 집행 목표 고정 즉시 처단. 프로토콜 통과 초토화 작전 집행. 깨어났군, 한참이나 기다렸다. 우린 전에 만난 적이 있지. 스텔라론 헌터 샘이다. 일찍이 네 앞에 나타나 진실을 전하고 싶었어. 하지만 예상보다 방해물이 많더군. 열한 차례 시도했지만 전부 실패로 끝났지. 그러는 사이에 나도 모르게 이 세계와 긴밀히 연결되어 각본의 구속에서 벗어날 수 없게 됐다. 엘리오의 말대로 우리는 이 꿈의 땅에서 잊을 수 없는 수확을 얻게 될 테지. 나에겐 그와 카프카처럼 사람의 마음을 꿰뚫어보는 통찰력도 은랑이나 블레이드처럼 특출난 능력도 없다. 내가 잘하는 것들 대부분은 불쌍히 여길 필요 없는 악당에게만 적용되지. 그러니 내가 사용할 수 있는 수단도 단 하나뿐이다. 네게 보여주기 위한 거야, 내 전부를.",
  "언제부터인가, 폰타인에서 이런 예언이 떠돌기 시작했어. 폰타인 사람은 모두 죄를 안고 태어난다. 정의의 나라인 폰타인이 아무리 심판해도 없앨 수 없는 죄를. 언젠가 폰타인의 해수면이 상승해 죄를 짊어진 자들은 모두 서서히 수면 아래 잠길 것이다. 결국 모든 이는 바다에 용해될 것이며, 오직 물의 신만이 신좌에 남아 눈물을 흘리리라. 그때 비로소 폰타인 사람의 죄도 씻겨나가게 될 것이다.",
  "녀석은 계속 아버지였다. 아버지로써 수많은 걸 감싸안으며 가족을 위해 최선을 다했다. 그리고 끝내 나를 감싸주었다. 나를 자신의 아들로써, 아버지로써 감싸주었다. 목숨까지 바치며. 당연한 일을 한 것처럼. 그렇게 죽었다. 이상한 이야기다. 루데우스 그레이렛은 아들이 아니었는데, 파울로 그레이렛은 아버지였다.",
  "나는 사실, 남자를 여자로서 좋아한다는 걸 몰라. 그래서 스바루가 그렇게 나를 좋아한다고 말해주는데도 스바루가 바라는 답도, 그렇지 않은 답도 해줄 수 없어. 그게 엄청 심한 짓이고 스바루를 상처입히며 곤란하게 하는 것도 알아. 하지만, 아직 남을 좋아하게 된다는 걸 모르는 나지만, 분명히 언젠가 누군가를 좋아하게 될 거야. 누군가를 분명히 여자로서 사랑할 거야. 그리고 그리됐을 때, 누구를 좋아하게 될지는 이미 결심했어. 그러니까 나는 당신 것이 되지 않아.",
  "전쟁은 이미 시작됐어. 지난 전쟁의 연속이지. 신들은 자신의 권능에 닿을 수 있다고 인간들을 부추기려 욕망에 일곱 빛깔을 입혔어. 그러나 현세의 바닥엔 불타는 잔해가 묻혀있지. 찬탈자를 향한 경고야. 높은 하늘 위의 신좌는 널 위해 남겨둔 자리가 아니다. 하지만 찬탈자여, 여기서 멈추지 마라. 아무도 방관할 수만은 없으니. 보아라."
];

const ContentsInfo = [
  {
    Author: "붕괴: 스타레일(샘(반디))",
    Title: "그 긴거",
  },
  {
    Author: "원신(리니)",
    Title: "폰타인의 예언",
  },
  {
    Author: "무직전생(루데우스 그레이렛)",
    Title: "파울로가 죽고난 후"
  },
  {
    Author: "리제로(에밀리아)",
    Title: "레굴루스와의 결혼식 중"
  },
  {
    Author: "원신(데인슬레이프)",
    Title: "발자취:티바트편 중"
  }
];

const Main = () => {
  const [conTexts, setConTexts] = useState([]);
  const [curseq, setCurseq] = useState(0);//글귀 문장 번호
  const [seq, setSeq] = useState(0);//글귀 번호
  const [Time, setTime] = useState(0);
  const [actTime, setActTime] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [conUiClass, setconUiClass] = useState("main-consequence hidden");
  const [ACC,setACC] = useState(0);
  const [TextAmount,setTextAmount] = useState(0);
  const [selectOpen,setselectOpen] = useState(false);
  const [settingOpen,setsettingOpen] = useState(false);
  const select = useRef(null);
  const curPage = useNavigate();
  
  useEffect(()=>{
    let timer;
    if(actTime){
      timer = setInterval(()=>{
        setTime((prev) => prev+1);
      },1000);
    } else{
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  },[actTime])

  useEffect(() => {
    const splitText = ConvertText(Contents[seq]);
    console.log(splitText);
    setConTexts(splitText);
    setInputValue(""); 
    setACC(0);
    setselectOpen(false);
    setsettingOpen(false);
    setCurseq(0);
    let value = localStorage.getItem("seq");
    if(value === null) {value = 0;}
    setSeq(value);
    setTextAmount(0);
    select.current.value = value;
  }, [seq]);

  const PreventEvent = (event) => {
    event.preventDefault();
  }

  const CalcPercent = (target,value) => {
    return parseInt(100*(value/target));
  }

  const ConvertText = (text) => {
    return text.split(".");
  };

  const HandleSelectChange = (event) => {
    const value = event.target.value;
    setSeq(value);
    localStorage.setItem("seq",value);
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const PreventCodes = (event) => {
   const key = event.key;
   if(key === "Enter" ){
    if (event.nativeEvent.isComposing) return;
    event.preventDefault();
    if(inputValue != "" && curseq < conTexts.length){
      let targetText = conTexts[curseq];
      console.log(targetText);
      let minus = 0;
      if(targetText[0] === " "){targetText = targetText.slice(1);}
      for(let i = 0;i<targetText.length;i++){
        if(targetText[i] != inputValue[i]){
          minus = minus+1;
        }
      }
      setACC(ACC-minus);
      setTextAmount(TextAmount + targetText.length);
      if(curseq === conTexts.length-2 ){
        setconUiClass("main-consequence");
        setActTime(false);  
      }
        setCurseq(curseq+1);
        setInputValue("");
      }
    }
  }

  const renderHighlightedText = () => {
    let targetText = conTexts[curseq] || "";
    if(targetText[0] === " "){targetText = targetText.slice(1);}
    let highlighted = [];
    let isCom = false;
    for (let i = 0; i < targetText.length; i++) {
      const char = targetText[i];
      const userChar = inputValue[i] || "";
      const charDes = disassemble(targetText[i]);
      const userCharDes = disassemble(inputValue[i] || "");
      let isPartialMatch;
      if(i === targetText.length-1 || userCharDes.length <= charDes.length){
        isPartialMatch = (charDes.includes(userCharDes) && charDes[userCharDes.length-1] === userCharDes[userCharDes.length-1])|| userChar === "";
      }
      else if(userCharDes.length > charDes.length){
        isPartialMatch = (userCharDes.includes(charDes) && disassemble(targetText[i+1])[0]=== userCharDes[userCharDes.length-1]) || userChar === ""// 다음 글자 갖고와서 비교해보는 거임, 구조상 자음 2개는 못겹치니까 이것만 하면 될듯
      }
      const isPartialMatchComplete = targetText[i] === inputValue[i] || inputValue[i] === "";
      if(targetText === inputValue) isCom = true;
      highlighted.push(
        <span
          key={i}
          style={{
            fontWeight: isPartialMatchComplete ? "bold" : "normal",
            color: isCom ? "greenyellow" : isPartialMatch ? "black" : "red",
          }}
        >
          {char}
        </span>
      );
    }
    return highlighted;
  };

  return (
    <div className="main" onDragStart={PreventEvent}>
      <div className="nav">
        <div className="nav-left">
          <span>typing-rax</span>
        </div>
        <div className="nav-right">
          <span onClick={() => {setselectOpen(true); !conUiClass.includes("hidden") ? setconUiClass("main-consequence hidden") : setconUiClass(conUiClass)}}>글귀 선택</span>
          <span onClick={() => {curPage(0)}}>다시하기</span>
        </div>
      </div>
      <div className={selectOpen ? "main-select" : "main-select hidden"}>
        <span onClick={() => {setselectOpen(false)}}><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></span>
        <span>글귀 선택</span>
        <select onChange={HandleSelectChange} ref={select}>
          <option value="0">{ContentsInfo[0].Title}</option>
          <option value="1">{ContentsInfo[1].Title}</option>
          <option value="2">{ContentsInfo[2].Title}</option>
          <option value="3">{ContentsInfo[3].Title}</option>
          <option value="4">{ContentsInfo[4].Title}</option>
        </select>
      </div>
      <div className="main-typing">
        <div className="main-timer">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-clock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 7v5l3 3" /></svg>
          Timer : {parseInt(Time/60)}분 {Time%60}초
        </div>
        <div className={conUiClass}>
          <div onClick={() => {setconUiClass("main-consequence hidden")}}><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></div>
          <span className="main-con-item">typing-rax consequence</span>
          <span className="main-con-item">Name: Guest <span>Input Conunt: {TextAmount}</span></span>
          <span className="main-con-item">CPM: {parseInt(TextAmount/(Time/60))}<span>WPM: {parseInt(Contents[seq].split(" ").filter((pre) => pre !== " ").length/(Time/60))}</span> <span>ACC: {CalcPercent(TextAmount , TextAmount+ACC)}%</span></span>
        </div>
        
        <div></div> 
        <div className="backText-container">
          <span className="backText">
            {renderHighlightedText()}
          </span>
          <textarea
            placeholder="여기에 타이핑"
            value={inputValue}
            onKeyDown={PreventCodes}
            onClick={() => {setActTime(true)}}
            onCopy={PreventEvent}
            onPaste={PreventEvent}
            onSelect={PreventEvent}
            onChange={handleInputChange}
            draggable={false}
            required
            rows={1}
          ></textarea>
        </div>
      </div>

      <div className="main-info">
        <span>Title: {ContentsInfo[seq].Title}</span>
        <br />
        <span>Author: {ContentsInfo[seq].Author}</span>
      </div>
    </div>
  );
};

export default Main;

//react => typescript => redux => styleCompoments => next.js 까지 ㄱ