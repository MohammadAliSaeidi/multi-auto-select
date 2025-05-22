export type OptionValue = string | number;

export type Option = {
  value: OptionValue;
  label: string;
  isSelected?: boolean;
}

export type MultiAutoSelectPropsBase<T> = {
  defaultValue?: OptionValue[];
  valueKey: Extract<keyof T, OptionValue>;
  labelKey: Extract<keyof T, string>;
  isLoading?: boolean;
}