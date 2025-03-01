import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewThread() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://railway.bulletinboard.techtrain.dev/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("スレッドの作成に失敗しました");
      }

      // スレッド一覧に戻る
      navigate("/");
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  return (
    <div>
      <h2>スレッド新規作成</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="スレッドのタイトル"
          required
        />
        <button type="submit">作成</button>
      </form>
    </div>
  );
}

export default NewThread;