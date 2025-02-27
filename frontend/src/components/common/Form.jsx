import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const Form = ({ formControlls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) => {

  function renderInputsByComponentType(controlItem) {
    const { name, componentType, placeholder, type, options, label } = controlItem;
    const value = formData[name] || '';

    switch (componentType) {
      case 'input':
        return (
          <Input
            name={name}
            placeholder={placeholder}
            id={name}
            type={type}
            value={value}
            onChange={(e) => setFormData({
              ...formData,
              [name]: e.target.value,
            })}
          />
        );

      case 'select':
        return (
          <Select
            onValueChange={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                [name]: value,
              }))
            }
            value={formData[name] || ''}
          >
            <SelectTrigger className="max-w-full">
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'textarea':
        return (
          <Textarea
            name={name}
            placeholder={placeholder}
            id={name}
            value={value}
            onChange={(e) => setFormData({
              ...formData,
              [name]: e.target.value,
            })}
          />
        );

      default:
        return (
          <Input
            name={name}
            placeholder={placeholder}
            id={name}
            type={type}
            value={value}
            onChange={(e) => setFormData({
              ...formData,
              [name]: e.target.value,
            })}
          />
        );
    }
  }


  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControlls.map(controlItem => (
          <div key={controlItem.name} className="grid max-w-full gap-1.5">
            <Label className="mb-1">
              {controlItem.label}
            </Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button 
      disabled={isBtnDisabled} 
      type="submit" 
      className={`rounded-xl mt-8 max-w-full ${buttonText === 'Edit' ? 'bg-green-400' : 'bg-blue-400'} font-semibold`} >
        {buttonText || 'Submit'}
      </Button>
    </form>
  );
};

export default Form;
