import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const Form = ({ formControlls, formData, setFormData, onSubmit, buttonText }) => {
  
  function renderInputsByComponentType(controlItem) {
    const { name, componentType, placeholder, type, options } = controlItem;
    const value = formData[name] || ''; // Safeguard against undefined value

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
          <Select onValueChange={(value) => setFormData({
            ...formData,
            [name]: value
          })} value={value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options && options.length > 0 && options.map(option => (
                <SelectItem key={option.id || option.label}>
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
          <div key={controlItem.name} className="grid w-full gap-1.5">
            <Label className="mb-1">
              {controlItem.label}
            </Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || 'Submit'}
      </Button>
    </form>
  );
};

export default Form;
