import React, { useState } from "react";
import "./App.css";
import "./곰돌이 푸.png";

function Custombutton({ work, handleshift }) {
  if (work.isDone === false) {
    return (
      <button
        className="todo-complete-button"
        onClick={() => {
          handleshift(work.id);
        }}
      >
        완료
      </button>
    );
  } else {
    return (
      <button
        className="todo-cancle-button"
        onClick={() => {
          handleshift(work.id);
        }}
      >
        취소
      </button>
    );
  }
}

function Todos({ work, handleRemove, handleshift }) {
  return (
    <div className="todo-container">
      <div className="todo-title">{work.title}</div>
      <div className="todo-body">{work.body}</div>
      <div className="button-set">
        <button
          className="todo-delete-button"
          onClick={() => {
            handleRemove(work.id);
          }}
        >
          삭제하기
        </button>
        <button
          className="todo-complete-button"
          onClick={() => {
            handleshift(work.id);
          }}
        >
          완료
        </button>
      </div>
    </div>
  );
}

function App() {
  const [works, setWorks] = useState([
    { id: 1, title: "입문주차", body: "props이해하기", isDone: false },
    { id: 2, title: "숙련주차", body: "리덕스이해하기", isDone: false },
    { id: 3, title: "심화주차", body: "리덕스툴킷 이해하기", isDone: false },
  ]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addUserHandler = () => {
    const newWork = {
      id: works.length + 1,
      title: title,
      body: body,
      isDone: false,
    };
    setWorks([...works, newWork]);
  };
  const removeWorkHandler = (id) => {
    const newWorkList = works.filter((work) => work.id !== id);
    setWorks(newWorkList);
  };
  const shiftWorkHandler = (id) => {
    const findIndex = works.findIndex((work) => work.id === id);
    let copyWorks = [...works];
    if (findIndex !== -1) {
      if (copyWorks[findIndex].isDone === false) {
        copyWorks[findIndex] = { ...copyWorks[findIndex], isDone: true };
      } else {
        copyWorks[findIndex] = { ...copyWorks[findIndex], isDone: false };
      }
    }
    setWorks([...copyWorks]);
  };

  return (
    <div className="layout">
      <div className="title">
        <div>My Todo List</div>
        <div>React</div>
      </div>
      <div>
        <img
          src={require("./곰돌이 푸.png")}
          width="1200"
          height="300"
          alt="testA"
        />
      </div>
      <div className="input-div">
        <div className="input-bar">
          <div className="input-title">제목</div>
          <input
            id="title-input"
            type="text"
            value={title}
            className="input-space"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="input-title">내용</div>
          <input
            id="body-input"
            type="text"
            value={body}
            className="input-space"
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
          <button className="add-button" onClick={addUserHandler}>
            추가하기
          </button>
        </div>
      </div>
      <div className="list-container">
        <div className="under-title">Working.. 🔥</div>
        <div className="list-wrapper">
          {works
            .filter((work) => {
              return work.isDone === false;
            })
            .map((work) => {
              return (
                <Todos
                  work={work}
                  key={work.id}
                  handleRemove={removeWorkHandler}
                  handleshift={shiftWorkHandler}
                />
              );
            })}
        </div>
        <div className="under-title">Done..! 🎉</div>
        <div className="list-wrapper">
          {works
            .filter((work) => {
              return work.isDone === true;
            })
            .map((work) => {
              return (
                <Todos
                  work={work}
                  key={work.id}
                  handleRemove={removeWorkHandler}
                  handleshift={shiftWorkHandler}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
