import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to = -1, className = "", label = "Go Back" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof to === "number") {
      navigate(to);
    } else {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200/50 transition-colors text-base-content/70 hover:text-base-content ${className}`}
      title={label}
    >
      <ArrowLeft className="size-5" />
      <span className="hidden sm:inline text-sm font-medium">{label}</span>
    </button>
  );
};

export default BackButton;
