import { APIRequestContext } from "@playwright/test";

// This file defines an APIContext interface for creating API contexts.
// It uses Playwright's APIRequestContext for handling API requests.
// The interface declares a method createContext that returns a Promise resolving to an APIRequestContext.


//? За допомогою цього метода, ми зможемо  створювати потрібні нам контексти 

export interface APIContext {
  createContext(): Promise<APIRequestContext>;
}