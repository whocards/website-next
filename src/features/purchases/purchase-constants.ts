export const categories = ['SuperSpreader', 'Community', 'Friends', 'Gift One'] as const

export type Category = (typeof categories)[number]
