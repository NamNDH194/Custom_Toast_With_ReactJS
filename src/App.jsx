import "./App.css";
import ToastMessages from "./component/toast_messages/index.jsx";
function App() {
  return (
    <>
      <ToastMessages
        status={"infor"}
        title={"Infor hehe"}
        content={"Hehe Infor !"}
        autoClose={1}
      />

      <ToastMessages
        status={"success"}
        title={"Success hehe"}
        content={"Hehe Success !"}
        autoClose={1}
      />

      <ToastMessages
        status={"error"}
        title={"Error huhu"}
        content={"Huhu Error !"}
        autoClose={1}
      />
    </>
  );
}

export default App;
