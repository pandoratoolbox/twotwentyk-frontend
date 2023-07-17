import React, { useEffect, useRef, useState } from "react";
import {
  CheckboxWrapper,
  ClearAll,
  OptionGroup,
  OptionItem,
  SelectAction,
  SelectBoxContainer,
  SelectBoxTextWrapper,
  SelectBoxWrapper,
  SelectOptionsWrapper,
} from "./styles";
import { IconArrowDown } from "../Icons";
import { SelectBoxProps } from "../../types";
import { Button } from "../Button";
import { ToastContainer, toast } from "react-toastify";
import { keyboard, keyboardImplementationWrapper } from "@testing-library/user-event/dist/keyboard";

export const SelectBox: React.FC<SelectBoxProps> = ({
  placeholder,
  label,
  value,
  options,
  border,
  isFilter,
  onClick,
  onChange,
  newData,
}) => {
  const optionRef = useRef<any>(null);
  const [isOption, setIsOption] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setIsOption(false);
        // setSelectedOptions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = async (value: string) => {
    onClick && onClick("Collections", [value]);
    // onChange && onChange(value);
    setIsOption(false);
  };

  const handleFilterClick = async (filterType: string) => {
      onClick && onClick(filterType, selectedOptions);

      setIsOption(false);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedOptions((prevOptions) => [...prevOptions, value]);
    } else {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option !== value)
      );
    }
  };

  return (
    <SelectBoxWrapper ref={optionRef}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {label && <p>{label}</p>}
      <SelectBoxContainer
        border={border ? "true" : undefined}
        onClick={() => setIsOption((prev) => !prev)}
      >
        <SelectBoxTextWrapper>
          {value ? (
            <>
              {options && options.filter((f) => f.value === value)[0].image && (
                <img
                  src={options.filter((f) => f.value === value)[0].image}
                  alt=""
                />
              )}{" "}
              {options && options.filter((f) => f.value === value)[0].label}
            </>
          ) : (
            <span>{placeholder}</span>
          )}
        </SelectBoxTextWrapper>
        <IconArrowDown />
      </SelectBoxContainer>
      <SelectOptionsWrapper open={isOption}>
        {isFilter ? (
          <>
            <OptionGroup>
              {newData &&
                Array.from<[any, any]>(newData).map(([key, value]) => (
                  <OptionItem htmlFor={value.name ? value.name + key : value + key} key={key}>
                    <span>{value.name ? value.name : value}</span>
                    <CheckboxWrapper>
                      <input
                        id={value.name ? value.name + key : value + key}
                        type="checkbox"
                        value={key as string}
                        checked={selectedOptions.includes(key as string)}
                        onChange={(e) => handleCheckboxChange(e, key as string)}
                      />
                      <label htmlFor={value.name ? value.name + key : value + key}></label>
                    </CheckboxWrapper>
                  </OptionItem>
                ))}
            </OptionGroup>
            <SelectAction>
              <ClearAll
                onClick={() => {
                  setSelectedOptions([]);
                }}
              >
                Clear All
              </ClearAll>
              <Button
                className="filter-apply-button"
                onClick={() => handleFilterClick(placeholder as string)}
              >
                Apply Selection
              </Button>
            </SelectAction>
          </>
        ) : (
          <OptionGroup>
            {options &&
              options.map((item, key) => (
                <OptionItem
                  key={key}
                  onClick={() => handleOptionClick(item.value)}
                >
                  <div>
                    {item.image ? <img src={item.image} alt="" /> : ""}
                    {item.label}
                  </div>
                </OptionItem>
              ))}
          </OptionGroup>
        )}
      </SelectOptionsWrapper>
    </SelectBoxWrapper>
  );
};
