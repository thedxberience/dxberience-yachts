export function currencyFormat(num: number) {
    return num?.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}


// Types for the result object with discriminated union
type Success<T> = {
    data: T;
    error: null;
  };
  
  type Failure<E> = {
    data: null;
    error: E;
  };
  
  type Result<T, E = Error> = Success<T> | Failure<E>;
  
  // Main wrapper function
  export async function tryCatch<T, E = Error>(
    promise: Promise<T>, errorType?: new (...args: any[]) => E
  ): Promise<Result<T, E>> {
    try {
      const data = await promise;
      return { data, error: null };
    } catch (error) {
        // Check if errorType is provided and cast the error accordingly
        if (errorType && error instanceof Error) {
            const typedError = new errorType(error.message);
            return { data: null, error: typedError as E };
        }
      return { data: null, error: error as E };
    }
  }