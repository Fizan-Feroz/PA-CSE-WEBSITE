import { createContext, useContext } from 'react';

export const DepartmentDataContext = createContext(null);

export function useDepartmentData() {
  const context = useContext(DepartmentDataContext);
  if (!context) {
    throw new Error('useDepartmentData must be used within a DepartmentDataProvider');
  }
  return context;
}
