// src/global.d.ts or src/types/custom.d.ts

import { DbStructQueries, DbStructureResult } from "./designerApi";

interface HostFunctions {
    getDBStructure?: (data: DbStructQueries) => Promise<DbStructureResult>;
  }
  
  // Extend the Window interface
  declare global {
    interface Window {
      hostFunctions?: HostFunctions;
    }
  }

  

export {};