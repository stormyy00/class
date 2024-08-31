import { XCircle } from "lucide-react";

type props = {
  label: string;
  object: Record<string, any>;
  setObject: (updatedObject: Record<string, any>) => void;
  clear?: boolean;
  value?: string;
  showLabel?: boolean;
  maxLength?: number;
  placeholder?: string;
  onChangeFn?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearFn?: () => void;
  classes?: string;
};

const Input = ({
  object,
  setObject,
  clear,
  label,
  value = object[label],
  showLabel = true,
  maxLength,
  placeholder,
  onChangeFn = (e) => setObject({ ...object, [label]: e.target.value }),
  clearFn = () => setObject({ ...object, [label]: "" }),
  classes,
}: props) => {
  return (
    <div className={`flex items-center ${classes}`}>
      {showLabel && <p className="my-0 mr-2 text-lg font-extrabold">{label}</p>}

      <div className="my-1 flex w-full items-center rounded-md bg-gray-200">
        <input
          data-cy={`${label}-input`}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          type="text"
          className="font-poppins w-full bg-transparent px-2 py-1 text-base outline-none"
          onChange={onChangeFn}
        />
        {clear && (
          <XCircle
            className="text-hackathon-gray-300 hover:text-hackathon-gray-200 mr-2 text-xl hover:cursor-pointer"
            onClick={clearFn}
            data-cy={`${label}-clear-input`}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
