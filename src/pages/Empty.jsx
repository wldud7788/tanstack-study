import { Link } from "react-router-dom";

const Empty = () => {
  return (
    <div>
      <Link to={"/"}>
        <button>메인페이지로</button>
      </Link>
    </div>
  );
};

export default Empty;
