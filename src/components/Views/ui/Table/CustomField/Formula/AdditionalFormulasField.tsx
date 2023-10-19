import React, { useState, useEffect } from 'react';
import { Parser as FormulaParser } from 'hot-formula-parser';
import { IFormula, FORMULAS } from './formulas';
import { CiWarning } from 'react-icons/ci';
import { IField } from '../../../../../../features/list/list.interfaces';
import Number from '../../../../../../assets/branding/Number';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { findSelectedItemsInFormula } from './findSelectedItemsInFormula';
import { TbMathFunction } from 'react-icons/tb';

interface AdditionalFormulasFieldProps {
  currentFieldColumns: IField[];
  taskCustomFields: ICustomField[];
  prevFormula: string;
  handleSave: (str: string, result: string) => void;
  handleClose: () => void;
}

function AdditionalFormulasField({
  currentFieldColumns,
  taskCustomFields,
  prevFormula,
  handleSave,
  handleClose
}: AdditionalFormulasFieldProps) {
  const [activeFormula, setActiveFormula] = useState<IFormula>();
  const [inputText, setInputText] = useState<string>(prevFormula);
  const [isError, setError] = useState(false);
  const [currentInputText, setCurrentInputText] = useState<string>('');
  const [currentResult, setCurrentResult] = useState<string>('');

  const parser = new FormulaParser();

  useEffect(() => {
    if (inputText.length) {
      const parseText = parser.parse(transformFormula(inputText).strWithCurrentValues);
      if (parseText.error) {
        setError(true);
      } else {
        setError(false);
        setCurrentInputText(transformFormula(inputText).strWithCurrentIds);
        setCurrentResult(parseText.result as string);
      }
    } else {
      setError(false);
    }
  }, [inputText]);

  const transformFormula = (str: string) => {
    const selectedItems = findSelectedItemsInFormula(str, currentFieldColumns, taskCustomFields);
    if (selectedItems) {
      // replace base values in formula
      const newString = str.replaceAll('true', 'TRUE').replaceAll('false', 'FALSE');

      let strWithCurrentValues = newString;
      let strWithCurrentIds = newString;
      // replace variables in formula
      selectedItems.forEach((item) => {
        strWithCurrentValues = strWithCurrentValues.replaceAll(`field("${item.name}")`, item.value);
        strWithCurrentIds = strWithCurrentIds.replaceAll(`field("${item.name}")`, `"${item.id}"`);
      });
      return { strWithCurrentValues, strWithCurrentIds };
    }
    return { strWithCurrentValues: '', strWithCurrentIds: '' };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputText(value);
  };

  const transformFieldToFormula = (field: IField) => {
    return {
      id: field.id,
      name: field.name,
      description: `Returns the ${field.name} field value for each task`,
      syntax: `field("${field.name}")`,
      example: `field("${field.name}") = 42`
    };
  };

  const renderItemIcon = (field: IField) => {
    switch (field.type) {
      case 'number':
        return <Number />;
      case 'formula':
        return <TbMathFunction />;
    }
  };

  return (
    <div className="h-full" style={{ width: '480px', height: '370px', overflow: 'hidden' }}>
      <div className="flex items-center border-b-2 px-2">
        {isError ? <CiWarning size={30} color="red" /> : null}
        <input
          className={`w-full text-xs px-1 base-input border-0 focus:border-0 placeholder:italic ${
            isError ? 'text-alsoit-danger' : ''
          }`}
          type="text"
          value={inputText}
          onChange={(e) => handleChange(e)}
          placeholder="Type a formula"
        />
        <button
          style={{ width: '79px' }}
          className={`${isError ? 'bg-alsoit-danger' : 'bg-alsoit-blue-100'} text-white rounded h-6`}
          onClick={() => handleSave(currentResult, currentInputText)}
          disabled={isError || !inputText}
        >
          Calculate
        </button>
      </div>
      <div className="flex">
        <div className="border-r-2 w-full">
          <div style={{ overflowY: 'scroll', maxHeight: '300px' }}>
            {currentFieldColumns.length ? (
              <>
                <p className="text-xs px-2 py-3">Variables</p>
                {currentFieldColumns.map((field) => (
                  <div
                    key={field.id}
                    className="px-1"
                    onMouseOver={() => setActiveFormula(transformFieldToFormula(field))}
                    onClick={() =>
                      setInputText(!inputText ? `field("${field.name}")` : `${inputText}field("${field.name}")`)
                    }
                  >
                    <div
                      className={`flex p-1 rounded cursor-pointer ${
                        activeFormula?.id === field.id ? 'bg-alsoit-purple-50' : ''
                      }`}
                    >
                      <span className="flex justify-center align-center mx-1 w-5 h-5">{renderItemIcon(field)}</span>
                      {field.name}
                    </div>
                  </div>
                ))}
              </>
            ) : null}
            <p className="text-xs px-2 py-3">Formulas</p>
            {FORMULAS.map((formula) => (
              <div
                key={formula.id}
                className="px-1"
                onMouseOver={() => setActiveFormula(formula)}
                onClick={() => setInputText(!inputText ? `${formula.id}(` : `${inputText}${formula.id}(`)}
              >
                <div
                  className={`p-1 rounded cursor-pointer ${
                    activeFormula?.id === formula.id ? 'bg-alsoit-purple-50' : ''
                  }`}
                >
                  {formula.name}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t-2">
            <button>
              <div className="flex items-center pr-2">
                <label
                  className="switch"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleClose();
                  }}
                >
                  <input className="inputShow" type="checkbox" checked={true} />
                  <div className="slider checked" />
                </label>
                <span className="ml-2 text-xs whitespace-nowrap">Advanced Editor</span>
              </div>
            </button>
          </div>
        </div>
        <div className="px-4 py-5" style={{ minWidth: '312px', background: '#fafbfc' }}>
          {activeFormula ? (
            <div>
              <h2 className="mb-3 text-base">{activeFormula.name}</h2>
              <p className="text-xs">{activeFormula.description}</p>
              <h6 className="mt-4 mb-1 text-xs">SYNTAX</h6>
              <input className="w-full text-xs px-1 base-input" type="text" value={activeFormula.syntax} readOnly />
              <h6 className="mt-4 mb-1 text-xs">EXAMPLE</h6>
              <input className="w-full text-xs px-1 base-input" type="text" value={activeFormula.example} readOnly />
              {activeFormula?.expectedResult ? (
                <>
                  <h6 className="mt-4 mb-1 text-xs">EXPECTED RESULT</h6>
                  <input
                    className="w-full text-xs px-1 base-input"
                    type="text"
                    value={activeFormula.expectedResult}
                    readOnly
                  />
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AdditionalFormulasField;
