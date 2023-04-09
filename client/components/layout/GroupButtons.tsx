import { FC } from "react";

const GroupButtons: FC = () => {
  return (
    <div>
      <button 
          className="btn-transparent"
          type="button"
      >
        Войти
      </button>
      <button 
          className="btn-caramel ml-6"
          type="button"
      >
        Регистрация
      </button>
    </div>
  );
}
export default GroupButtons;