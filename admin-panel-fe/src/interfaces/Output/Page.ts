export interface NewPageQuestion {
  text: string;
  column: string;
}

export interface NewPage {
  name: string;
  table?: string;
  questions: NewPageQuestion[];
  leafs: string[];
}
