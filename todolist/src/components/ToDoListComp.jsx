import { useState } from "react";
import '../css/todolistcomp.css';


/** 전역변수 */
let globalId = 1;



const ToDoListComp = (props) => {
    /** 로그인 */
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const inputId = (e) => {setUserId(e.target.value)}
    const inputPassword = (e) => {setPassword(e.target.value)}
    const clickLogin = () => {
        const newUser =
            {
                userId: userId,
                password: password,
                login: true
            }
        setUser(newUser);
        setUserId("");
        setPassword("");
    }



    /** 투두리스트 */
    // 시간 출력
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const today = `${year}년${month}월${day}일`

    // 투두리스트
    const [todoLists, setTodoLists] = useState([
        {id:0, checked:false, content:"과제하기", date:`${year}년${month}월${day-1}일`}
    ]);

    // 버튼의 상태값을 저장할 공간 (버튼의 상태 값 : all/today)
    const [buttonState, setButtonState] = useState("all");

    // 투두리스트 input:text 값을 저장할 공간
    const [todoText, setTodoText] = useState("");

    
    const todoTextChange = (e) => {setTodoText(e.target.value)};

    const addTodo = () => {
        const newTodoLists = todoLists.concat(
            {
                id: globalId++,
                checked: false,
                content: todoText,
                date: today
            }
        );
        setTodoLists(newTodoLists);
        setTodoText("");
    };
    
    const total = todoLists.length;

    const clickCheck = (todolist) => {
        const newTodoLists = todoLists.map(
            (t) => {
                if (todolist.id != t.id) {
                    return t;
                } else {
                    return {
                        ...t,
                        checked: !t.checked
                    }
                }
            }
        )
        setTodoLists(newTodoLists);

    }

    const deleteTodo = (id) => {
        const newTodoLists = todoLists.filter(
            (t) => t.id !== id
        );
        setTodoLists(newTodoLists);
    }

    const All = () => {
        setButtonState("all");
    }

    const Today = () => {
        setButtonState("today");
    }

    const showList = () => {
        let allList = Array.from(todoLists);
        let todayList = Array.from(todoLists);
        if (buttonState == "all") {
            return allList
            
        } else {
            return (
                todayList.filter(
                    (todolist)=> todolist.date === today 
                )
            )
        }
    }

    /*
    const showAll = () => {
        let allList = Array.from(todoLists);
        return (
            allList.filter(
                (todolist) => todolist.id >= 0
            )
        );
    }

    const showToday = () => {
        let todayList = Array.from(todoLists);
        return (
            todayList.filter(
                (todolist)=> todolist.date === today 
            )
        );
    }
    */


    return (
        <div id="body">
            {/** 로그인 */}
            <div
                id="login"
                className= { 
                    user.login ? "hidden" : "show"
                    + " login"
                }
            >
                <input 
                    type="text" 
                    placeholder="Id"
                    onChange={inputId}
                    value={userId}
                    className="login_input"
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    onChange={inputPassword}
                    value={password}
                    className="login_input"
                />
                <button
                    onClick={clickLogin}
                    className="login_btn"
                >
                    Login
                </button>
            </div>
            {/** 투두리스트 */}
            <div
                id="todolist"
                className= { user.login ? "show" : "hidden"}
            >
                <div
                    className="todolist_wrap"
                >
                    <h1
                        className="greeting"
                    >
                        Hello <br />
                        {user.userId}!
                    </h1>
                    <p
                        className="restoftask"
                    >
                        You have <span className="highlight">{total} new task</span> today
                    </p>
                    <div
                        className="alltodaybtn_wrap"
                    >
                        <button
                            onClick={All}
                            className="alltodaybtn"
                        >
                            All
                        </button>
                        <button
                            onClick={Today}
                            className="alltodaybtn"
                        >
                            Today
                        </button>
                    </div>
                    
                    <ul
                        className="todolist_ul"
                    >
                        {
                            showList().map( (todolist) =>
                                <li
                                    key={todolist.id}
                                    className="todolist_li"
                                >
                                    <div
                                        className="content_wrap"
                                    >
                                        <input 
                                            type="checkbox" 
                                            checked={todolist.checked}
                                            readOnly
                                            onClick={ () => {clickCheck(todolist)} }
                                            className="checkbox"
                                        />
                                        <span className="date">{todolist.date}</span>
                                        <span className="content">{todolist.content}</span>
                                        <button
                                            onClick={ () => {deleteTodo(todolist.id)} }
                                            className="deletebtn"
                                        >
                                            X
                                        </button>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                    <div 
                        className="addtodo-wrap"
                    >
                        <input 
                            type="text"
                            onChange={todoTextChange}
                            value={todoText}
                            placeholder="add todo"
                            className="addtodo"
                            required
                        />
                        <button
                            onClick={addTodo}
                            className="addtodo_btn"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default ToDoListComp;