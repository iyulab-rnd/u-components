import type { 
  UCheckboxInputModel,
  UFileInputModel,
  UNumberInputModel,
  URangeInputModel,
  USelectInputModel,
  UTextInputModel,
  UTextareaInputModel
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
  'file' | 'range' | 'select' | 
  'object' | 'rest-url' | 
  'editor'
);

export type PropertyMetaData = (
  ({ type: 'text' } & UTextInputModel) | 
  ({ type: 'textarea' } & UTextareaInputModel) |
  ({ type: 'number' } & UNumberInputModel) | 
  ({ type: 'checkbox' } & UCheckboxInputModel) | 
  ({ type: 'file' } & UFileInputModel) | 
  ({ type: 'range' } & URangeInputModel) |
  ({ type: 'select' } & USelectInputModel) | 
  ({ type: 'object' } & UObjectInputModel) | 
  ({ type: 'rest-url' } & URestURLInputModel) | 
  ({ type: 'editor' } & UEditorInputModel)
);