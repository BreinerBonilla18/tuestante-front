import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { internalRequests } from '../data/internalRequests';
import { lockers as initialLockers } from '../data/lockers';
import { portalUsers } from '../data/portalUsers';
import type { InternalRequest, Locker, LockerStatus, PortalUser, RequestStatus } from '../types/portal';
import { todayIso } from '../utils/dates';

interface PortalSessionValue {
  user: PortalUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  requests: InternalRequest[];
  addRequest: (request: Omit<InternalRequest, 'id' | 'createdAt' | 'status' | 'employeeId' | 'employeeName'>) => void;
  setRequestStatus: (id: string, status: RequestStatus) => void;
  lockers: Locker[];
  updateLocker: (id: string, assigneeName: string | null, status: LockerStatus) => void;
}

const PortalSessionContext = createContext<PortalSessionValue | null>(null);

export function PortalSessionProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [requests, setRequests] = useState<InternalRequest[]>(internalRequests);
  const [lockers, setLockers] = useState<Locker[]>(initialLockers);

  const login = useCallback((email: string, password: string) => {
    const match = portalUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (match) setUser(match);
    return Boolean(match);
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const addRequest = useCallback<PortalSessionValue['addRequest']>(
    (request) => {
      if (!user) return;
      setRequests((prev) => [
      {
        ...request,
        id: `SOL-${1052 + prev.length}`,
        createdAt: todayIso(),
        status: 'pendiente',
        employeeId: user.employeeId,
        employeeName: user.name
      },
      ...prev]
      );
    },
    [user]
  );

  const setRequestStatus = useCallback((id: string, status: RequestStatus) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
  }, []);

  const updateLocker = useCallback((id: string, assigneeName: string | null, status: LockerStatus) => {
    setLockers((prev) => prev.map((l) => l.id === id ? { ...l, assigneeName, status } : l));
  }, []);

  const value = useMemo(
    () => ({ user, login, logout, requests, addRequest, setRequestStatus, lockers, updateLocker }),
    [user, login, logout, requests, addRequest, setRequestStatus, lockers, updateLocker]
  );

  return <PortalSessionContext.Provider value={value}>{children}</PortalSessionContext.Provider>;
}

export function usePortalSession(): PortalSessionValue {
  const ctx = useContext(PortalSessionContext);
  if (!ctx) throw new Error('usePortalSession debe usarse dentro de PortalSessionProvider');
  return ctx;
}