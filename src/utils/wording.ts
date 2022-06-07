export default {
  required: (property: string) => `${property} is required`,
  minLength: (property: string, len: number) => `${property} min length is ${len}`,
  maxLength: (property: string, len: number) => `${property} max length is ${len}`,
}