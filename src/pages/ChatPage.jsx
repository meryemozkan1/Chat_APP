import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useEffect, useRef, useState } from "react";
import Message from "../Components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  const lastMsg = useRef();

  // Form gönderildiğinde
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mesajın ekleneceği koleksiyonun referansını al
    const messagesCol = collection(db, "messages");

    // Koleksiyona döküman ekle
    await addDoc(messagesCol, {
      room,
      text: e.target[0].value,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    //Son mesaja kaydır
    lastMsg.current.scrollIntoView({ behavior: "smooth" });
    // Formu sıfırla
    e.target.reset();
  };
  console.log(lastMsg);

  // Mevcut odada gönderilen mesajları anlık olarak al
  useEffect(() => {
    // Abone olunacak koleksiyonun referansını al ve filtrele
    const messagesCol = collection(db, "messages");

    // Sorgu ayarları yap
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc") // 'createdAt' olarak düzeltildi
    );

    // onSnapshot ile anlık olarak koleksiyondaki değişimleri izler
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let tempMsg = [];
      // Dökümanların içindeki veriye eriş ve geçici diziye aktar
      snapshot.docs.forEach((doc) => tempMsg.push(doc.data()));

      // State'i güncelle
      setMessages(tempMsg);
    });

    // Aboneliği temizlemek için return ile unsubscribe fonksiyonunu döndürün
    return () => unsubscribe();
  }, [room]); // 'room'u bağımlılık olarak ekliyoruz

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı oda</button>
      </header>
      <main>
        {!messages.length ? (
          <p>Sohbete ilk mesajı gönderin</p>
        ) : (
          messages.map((data, i) => <Message data={data} key={i} />)
        )}
        <div ref={lastMsg} />
      </main>
      <form onSubmit={handleSubmit}>
        <input placeholder="Mesajınızı yazınız.." type="text" required />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
