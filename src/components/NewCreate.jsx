import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewCreate = ({ fetchThreads }) => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const CreateThread = () => {
    if (title === "") {
      alert("タイトルを入力してください");
      return;
    }

    fetch("https://railway.bulletinboard.techtrain.dev/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }) // 送るデータをJSON文字列に変換
    })
    .then(response => {
      if (response.ok) {
        fetchThreads(); // スレッド一覧を更新
        navigate("/"); // スレッド一覧ページへ移動
        alert("スレッドを作成しました！");

      } else {
        alert("スレッドの作成に失敗しました");
      }
    })
    .catch(error => {
      console.log("エラーが発生しました", error);
      alert("通信エラーが発生しました");
    })
  };

  return (
    <div>
      <h2>新しいスレッドを作成</h2>
      <input
        type="text"
        placeholder="スレッドのタイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={CreateThread} >
      {"作成"}
      </button>
    </div>
  );
};

export default NewCreate;
