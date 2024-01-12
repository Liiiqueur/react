import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {//컨포넌트
  console.log('props', props, props.title);
  return <header> 
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault(); //a태그의 기본동작을 방지함으로써 클릭 시 리로드 방지
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props) {
  const lis = []
  for(let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key = {t.id}><a id={t.id} href={'/read/'+t.id} onClick={event=>{
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a></li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function App() {
  //const _mode = useState('WELCOME');
  //const mode = _mode[0];
  //const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const topics = [
    {id:1, title:'가천대학교 스마트보안전공', body:'제3대 학생회 부학생회장'},
    {id:2, title:'KISIA', body:'팀 프로젝트 우수상 및 교육 과정 수료'},
    {id:3, title:'화이트햇 스쿨', body:'수료'}
  ]
  let content = null;
  if(mode === 'WELCOME') {
    content = <Article title="Welcome" body="WelCome, My 포트폴리오"></Article>
  } else if(mode === 'READ') {
    let title, body = null;
    for(let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
      content = <Article title={title} body={body}></Article>
  }
  return (
    <div>
        <Header title="Liqueur" onChangeMode={()=>{
          setMode('WELCOME');
          }}></Header>
        <Nav topics={topics} onChangeMode={(_id)=>{
          setMode('READ');
          setId(_id);
        }}></Nav>
        {content}
    </div>
  );
}

export default App;
