import { useSyncExternalStore } from 'react';
import { todayInLagos } from './dates';

const subscribe = () => () => {};

/**
 * Today's date in Lagos, for deciding what's upcoming. A static page can be
 * days old by the time someone opens it, so the build-time date is only
 * used for the prerendered HTML (keeping hydration consistent); the browser
 * then re-renders with the real date.
 */
export function useTodayInLagos(buildDay: string) {
  return useSyncExternalStore(subscribe, () => todayInLagos(), () => buildDay);
}
