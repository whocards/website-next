export const parseError = (error: unknown): string => {
  let message = 'An error occurred'

  console.log(error)

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = error.message as string
  } else {
    message = String(error)
  }

  return message
}
