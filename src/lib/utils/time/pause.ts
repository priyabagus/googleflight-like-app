/**
 * Utility to pause the execution in specific miliseconds.
 * @param miliseconds
 * @returns
 */
export default function pause (miliseconds:number) : Promise<void> {
  return new Promise(resolve => setTimeout(resolve, miliseconds))
}
