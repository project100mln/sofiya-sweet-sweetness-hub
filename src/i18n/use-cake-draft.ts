import { useContext } from "react";
import { CakeDraftContext, type CakeDraftContextValue } from "@/i18n/cake-draft-context";

export function useCakeDraft(): CakeDraftContextValue {
  const value = useContext(CakeDraftContext);
  if (!value) throw new Error("useCakeDraft must be used inside CakeDraftProvider");
  return value;
}
