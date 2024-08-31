import { BsCheckLg } from "react-icons/bs";
import { Checkbox as Check } from "./ui/checkbox";
// import {checkbox} from "@/types/index"
type checkbox = {
      toggle: boolean;
      text: string;
      color?: string;
      onClick?: () => {};
    };

const Checkbox: React.FC<checkbox>  = ({ toggle, onClick, text, color }) => {
  return (
    <div
      className="flex w-fit items-center hover:cursor-pointer"
      onClick={onClick}
    >
      <Check
        checked={toggle}
        onChange={onClick}
        className={`mr-2 h-4 w-4 rounded-sm ${
          toggle
            ? `${color ? color : "bg-blue-100"}`
            : "bg-gray-100"
        }`}
        data-cy="checkbox-bg"
      />
      {text && (
        <p className="my-0 pt-0" data-cy="checkbox-text">
          {text}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
