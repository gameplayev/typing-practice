import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles/main.scss";
import { getChoseong } from "es-hangul";

const Contents = [
  "지금 당장 떠나면 아무도 다치지 않는다. 그러지 않으면 너희는 모두 죽어. 탐정 놀이도 이젠 끝이다. 오지 말아야 할 곳에 발을 들였군. 현실로 돌아가면 잊지 말고 전해라. 스텔라론 헌터가 너희들의 마지막을 배웅했다는 것을. 기어투 점화 소각 기폭 소탕 시작. 액션 원 집행 섬멸 시작. 액션 투 집행 목표 고정 즉시 처단. 프로토콜 통과 초토화 작전 집행. 깨어났군, 한참이나 기다렸다. 우린 전에 만난 적이 있지. 스텔라론 헌터 샘이다. 일찍이 네 앞에 나타나 진실을 전하고 싶었어. 하지만 예상보다 방해물이 많더군. 열한 차례 시도했지만 전부 실패로 끝났지. 그러는 사이에 나도 모르게 이 세계와 긴밀히 연결되어 각본의 구속에서 벗어날 수 없게 됐다. 엘리오의 말대로 우리는 이 꿈의 땅에서 잊을 수 없는 수확을 얻게 될 테지. 나에겐 그와 카프카처럼 사람의 마음을 꿰뚫어보는 통찰력도 은랑이나 블레이드처럼 특출난 능력도 없다. 내가 잘하는 것들 대부분은 불쌍히 여길 필요 없는 악당에게만 적용되지. 그러니 내가 사용할 수 있는 수단도 단 하나뿐이다. 네게 보여주기 위한 거야, 내 전부를.",
];
const ContentsInfo = {
    Author: "붕괴: 스타레일(샘(반디))",
    Title: "그 긴거"
};


const BackText = (Text) => {
  const inverted = Text.split(" ");
  return inverted;
};

const KeyPressed = (event) => {
  console.log("Key Pressed:", event.keyCode);
};

const Main = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(null); 
  const TextContainer = useRef(null);

  const FindFirst = (index) => {
    if(highlightedIndex === null){
        setHighlightedIndex(0);
    }
    else if (index < highlightedIndex) {
      setHighlightedIndex(index);
    }
  };
  
  const AddBackText = ({ Text }) => {
    return Text.map((char, index) => (
      <span
        key={index}
        className={`backText ${highlightedIndex === index ? "backText-cur" : ""}`}
        onKeyDown={KeyPressed}
        onClick={() => FindFirst(index)}
        name={highlightedIndex === index ? "cur" : ""}
      >
        {char}
        <span>&nbsp;</span>
      </span>
    ));
  };
  

  return (
    <div className="main">
      <div className="nav">
        <div className="nav-left">
          <span>typing-rax</span>
        </div>
        <div className="nav-right">
          <span>글귀 선택</span>
          <span>
            <Link to="/setting">설정</Link>
          </span>
        </div>
      </div>
      <div className="main-typing">
        <div ref={TextContainer} className="backText-container">
          <AddBackText Text={BackText(Contents[0])} />
        </div>
      </div>
      <div>
      </div>
      <div className="main-info">
        <span>Title: {ContentsInfo.Title}</span>
        <br></br>
        <span>Author: {ContentsInfo.Author}</span>
      </div>
    </div>
  );
};

export default Main;
