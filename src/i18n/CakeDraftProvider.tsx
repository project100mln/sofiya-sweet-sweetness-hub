import { useMemo, useState, type ReactNode } from "react";
import {
  CakeDraftContext,
  type CakeDraftContextValue,
  type CakeDraftData,
} from "@/i18n/cake-draft-context";

export function CakeDraftProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CakeDraftData>({});
  const [sent, setSent] = useState(false);
  const value = useMemo<CakeDraftContextValue>(
    () => ({
      step,
      setStep,
      data,
      setData,
      sent,
      setSent,
      reset: () => {
        setStep(0);
        setData({});
        setSent(false);
      },
    }),
    [data, sent, step],
  );
  return <CakeDraftContext.Provider value={value}>{children}</CakeDraftContext.Provider>;
}
