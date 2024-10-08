import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";
import { auth } from "./firebase";

function App() {
  const [isAuth, setIsAuth] = useState(!!auth.currentUser);
  const [room, setRoom] = useState(null);

  // Kullanıcının yetkisi yoksa: login
  if (!isAuth) {
    return <LoginPage setIsAuth={setIsAuth} />;
  }

  console.log(room);

  // Kullanıcının yetkisi varsa: oda seçme
  return (
    <div className="container">
      {room ? (
        // Oda seçildiyse sohbet sayfası
        <ChatPage room={room} setRoom={setRoom} />
      ) : (
        // Oda seçilmediyse: oda seçme sayfası
        <RoomPage setRoom={setRoom} setIsAuth={setIsAuth} />
      )}
    </div>
  );
}

export default App;
