import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [input1, setInput1] = useState([
    'Enter uid1234 Muzi',
    'Enter uid4567 Prodo',
    'Leave uid1234',
    'Enter uid1234 Prodo',
    'Change uid4567 Ryan',
  ]);
  const [answer1, setAnswer1] = useState();

  const solution1 = (record: any[] = []) => {
    const ENTER = 'Enter';
    const LEAVE = 'Leave';
    const CHANGE = 'Change';
    const checkUser = (id: string, name: string, answer: any[] = []) => {
      for (let idx in answer) {
        if (answer[idx].id === id) {
          let temp = answer[idx].msg.split(' ');
          temp[0] = name;
          answer[idx].msg = temp.join(' ');
        }
      }
      return answer;
    };
    let answer: any[] = [];

    for (let rec of record) {
      let temp = rec.split(' ');
      const STATE = temp[0];
      const ID = temp[1];
      const NAME = temp[2];

      if (STATE === ENTER) {
        answer.push({ id: ID, msg: `${NAME} came in.` });
        answer = checkUser(ID, NAME, answer);
      } else if (STATE === LEAVE) {
        let user = answer.find((a) => a.id === ID);
        answer.push({ id: ID, msg: `${user.msg.split(' ')[0]} has left.` });
      } else if (STATE === CHANGE) {
        answer = checkUser(ID, NAME, answer);
      }
    }
    answer = answer.map((a) => a.msg);
    setAnswer1(answer);
    return answer;
  };

  // useEffect(() => {
  //   solution1();
  // });

  return (
    <div className="App">
      <header className="App-header">
        <h1>FiveJack</h1>
      </header>
      <div>
        <h1>Question 1</h1>
        <h3>Input</h3>
        <pre>{JSON.stringify(input1)}</pre>
        <br />
        <button onClick={() => solution1(input1)}>Click to Answer</button>
        <br />
        <pre>{JSON.stringify(answer1)}</pre>
      </div>
    </div>
  );
};

export default App;
