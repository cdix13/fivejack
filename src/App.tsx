import React, { useState } from 'react';

const App: React.FC = () => {
  // for question 1
  const input1 = [
    'Enter uid1234 Muzi',
    'Enter uid4567 Prodo',
    'Leave uid1234',
    'Enter uid1234 Prodo',
    'Change uid4567 Ryan',
  ];
  const [answer1, setAnswer1] = useState();

  // for question 1
  const n = 5;
  const users = [2, 1, 2, 6, 2, 4, 3, 3];
  const [answer2, setAnswer2] = useState();

  // for question 3
  const input3 = [
    ['100', 'ryan', 'music', '2'],
    ['200', 'apeach', 'math', '2'],
    ['300', 'tube', 'computer', '3'],
    ['400', 'con', 'computer', '4'],
    ['500', 'muzi', 'music', '3'],
    ['600', 'apeach', 'music', '2'],
  ];
  const [answer3, setAnswer3] = useState();

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

  const solution2 = (n = 0, users: number[] = []) => {
    let stage = 1;
    let answer: any[] = [];
    while (stage <= n) {
      let fail = users.filter((u) => u === stage).length;
      let player = users.filter((u) => u >= stage).length;
      let rate = fail / player;
      answer.push({ stage, rate });

      stage += 1;
    }
    answer.sort((a, b) => b.rate - a.rate);
    answer = answer.map((a) => a.stage);
    setAnswer2(answer);
    return answer;
  };

  const solution3 = (relation: any[] = []) => {
    const cols = relation[0].length;
    let curr = 0;
    let max = 1;
    let temp2: any[] = [];
    let answer = 0;
    while (curr < cols) {
      let temp = [];
      for (let idx in relation) {
        temp.push(relation[idx][curr]);
      }

      if (new Set(temp).size === relation.length) {
        answer += 1;
      } else if (max <= 2) {
        if (temp2.length > 0) {
          // temp.push([temp2[idx], relation[idx][curr]]);
          let combine = temp.map((t, idx) => {
            return [temp2[idx], t];
          });
          let dataUnique = combine.reduce(function(out, item) {
            return out.concat(
              out.filter(function(comp) {
                return item.toString() == comp.toString();
              }).length
                ? []
                : [item],
            );
          }, []);

          if (dataUnique.length === relation.length) {
            answer += 1;
            max = 1;
          } else {
            temp2 = temp;
          }
        } else {
          temp2 = temp;
          max += 1;
        }
      } else {
        max = 1;
        temp2 = [];
      }
      curr += 1;
    }
    setAnswer3(answer);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>FiveJack</h1>
      </header>
      <div
        style={{
          border: '3px solid black',
          marginBottom: '50px',
          padding: '20px',
        }}
      >
        <h1>Question 1</h1>
        <h3>Input</h3>
        <pre>{JSON.stringify(input1)}</pre>
        <br />
        <button onClick={() => solution1(input1)}>Click to Answer</button>
        <br />
        <h3>Answer</h3>
        <pre>{JSON.stringify(answer1)}</pre>
      </div>
      <div
        style={{
          border: '3px solid black',
          marginBottom: '50px',
          padding: '20px',
        }}
      >
        <h1>Question 2</h1>
        <h3>Input</h3>
        <h5>N: {n}</h5>
        <h5>
          Users:
          <pre>{JSON.stringify(users)}</pre>
        </h5>
        <br />
        <button onClick={() => solution2(n, users)}>Click to Answer</button>
        <br />
        <h3>Answer</h3>
        <pre>{JSON.stringify(answer2)}</pre>
      </div>
      <div
        style={{
          border: '3px solid black',
          marginBottom: '50px',
          padding: '20px',
        }}
      >
        <h1>Question 3</h1>
        <h3>Input</h3>
        <pre>{JSON.stringify(input3)}</pre>
        <br />
        <button onClick={() => solution3(input3)}>Click to Answer</button>
        <br />
        <h3>Answer</h3>
        <pre>{JSON.stringify(answer3)}</pre>
      </div>
    </div>
  );
};

export default App;
