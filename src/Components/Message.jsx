import { auth } from "../firebase";

const Message = ({ data }) => {
  const isCurrentUser = auth.currentUser?.uid === data?.author?.id;

  if (isCurrentUser) {
    return <p className="msg-user">{data?.text}</p>;
  }

  return (
    <div className="msg-other">
      <div className="user-info">
        <img
          src={data?.author?.photo || "default-photo-url"}
          alt="profil pic"
        />
        <span>{data?.author?.name || "Bilinmeyen"}</span>
      </div>

      <p className="msg-text">{data?.text}</p>
    </div>
  );
};

export default Message;
