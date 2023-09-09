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
import { SelectBoxProps, SelectOptionProps } from "../../types";
import { Button } from "../Button";
import {
  getFilterCardType,
  getFilterRarities,
  getFilterStatus,
  getFilterCollection,
  getFilterCategory,
  getFilterPackType,
  getFilterTriggerType,
} from "../../actions/filtering";
import { ToastContainer, toast } from "react-toastify";
import { useInventoryNFTsContext } from "../../context";

export const SelectOption: React.FC<SelectBoxProps> = ({
  placeholder,
  label,
  options,
  border,
  isFilter,
  onChange,
  onSelect,
  clear,
}) => {
  const optionRef = useRef<any>(null);
  const [isOption, setIsOption] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Array<{
      label: string;
      value: number;
    }>
  >([]);
  const { setInventoryNftsContext } = useInventoryNFTsContext();
  const [value, setValue] = useState<SelectOptionProps | null>(null);

  const handleSelect = (v: SelectOptionProps) => {
    if (onSelect) {
      onSelect(v);
    }

    setValue(v);
    setIsOption(false);
  };

  useEffect(() => {
    setValue(null);
  }, [clear]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setIsOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <SelectBoxWrapper ref={optionRef} className={placeholder === "Identity Matches" ? "IMSelect" : undefined}>
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
        className={placeholder === "Identity Matches" ? "IMSelect" : undefined}
      >
        <SelectBoxTextWrapper>
          {value ? (
            <>
              {options &&
                options.filter((f) => f.value === value.value)[0].image && (
                  <img
                    src={
                      options.filter((f) => f.value === value.value)[0].image
                    }
                    alt=""
                  />
                )}{" "}
              {options &&
                options.filter((f) => f.value === value.value)[0].label}
            </>
          ) : (
            <span>{placeholder}</span>
          )}
        </SelectBoxTextWrapper>
        <IconArrowDown />
      </SelectBoxContainer>
      <SelectOptionsWrapper open={isOption} className={placeholder === "Identity Matches" ? "IMSelect" : undefined}>
        <OptionGroup>
          {options &&
            options.map((value, key) => (
              <OptionItem key={key} onClick={() => handleSelect(value)} className={placeholder === "Identity Matches" ? "IMSelect" : undefined}>
                <div>
                  {value.image ? <img src={value.image} alt="" /> : ""}
                  {value.label}
                </div>
              </OptionItem>
            ))}
        </OptionGroup>
      </SelectOptionsWrapper>
    </SelectBoxWrapper>
  );
};
