import type { 
  UCheckboxInputModel,
  UDatetimeInputModel,
  UEmailInputModel,
  UFileInputModel,
  UNumberInputModel,
  UPasswordInputModel,
  URangeInputModel,
  USelectInputModel,
  UTelInputModel,
  UTextInputModel,
  UTextareaInputModel,
  UUrlInputModel
} from '../components/input';
import type { 
  UObjectInputModel, 
  URestURLInputModel,
} from '../components/input-extension';
import type { 
  UEditorInputModel,
} from '../components/input-advanced';

export type PropertyMetaType = (
  'text' | 'textarea' | 'number' | 'checkbox' | 
  'password' | 'tel' | 'email' | 'url' | 'datetime' |
  'file' | 'range' | 'select' | 
  'object' | 'rest-url' | 
  'editor'
);

export type PropertyMetaData = (
  ({ type: 'text' } & UTextInputModel) | 
  ({ type: 'textarea' } & UTextareaInputModel) |
  ({ type: 'number' } & UNumberInputModel) | 
  ({ type: 'checkbox' } & UCheckboxInputModel) | 
  ({ type: 'password' } & UPasswordInputModel) |
  ({ type: 'tel' } & UTelInputModel) |
  ({ type: 'email' } & UEmailInputModel) |
  ({ type: 'url' } & UUrlInputModel) |
  ({ type: 'datetime' } & UDatetimeInputModel) |
  ({ type: 'file' } & UFileInputModel) | 
  ({ type: 'range' } & URangeInputModel) |
  ({ type: 'select' } & USelectInputModel) | 
  ({ type: 'object' } & UObjectInputModel) | 
  ({ type: 'rest-url' } & URestURLInputModel) | 
  ({ type: 'editor' } & UEditorInputModel)
);