export default function pause (miliseconds:number) : Promise<void> {
  return new Promise(resolve => setTimeout(resolve, miliseconds))
}
