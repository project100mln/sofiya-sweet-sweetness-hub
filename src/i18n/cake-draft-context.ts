import { createContext, type Dispatch, type SetStateAction } from "react";

export type CakeDraftData = Record<string, string>;

export interface CakeDraftContextValue {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  data: CakeDraftData;
  setData: Dispatch<SetStateAction<CakeDraftData>>;
  sent: boolean;
  setSent: Dispatch<SetStateAction<boolean>>;
  reset: () => void;
}

export const CakeDraftContext = createContext<CakeDraftContextValue | null>(null);
