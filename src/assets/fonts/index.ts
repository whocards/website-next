import localFont from 'next/font/local'

export const golosFont = localFont({
  variable: '--font-golos',
  display: 'swap',
  src: './golos_text.woff2',
})

export const aptlyFont = localFont({
  variable: '--font-aptly',
  display: 'swap',
  src: [
    {
      path: './aptly_regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: './aptly_medium.woff2',
      weight: 'bold',
      style: 'normal',
    },
  ],
})

export const chineseFont = localFont({
  variable: '--font-noto-sans-chinese',
  display: 'swap',
  src: [
    {
      path: './noto-sans-chinese_regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: './noto-sans-chinese_bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
  ],
})

export const hebrewFont = localFont({
  variable: '--font-noto-sans-hebrew',
  display: 'swap',
  src: [
    {
      path: './noto-sans-hebrew_regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: './noto-sans-hebrew_bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
  ],
})

export const japaneseFont = localFont({
  variable: '--font-noto-sans-japanese',
  display: 'swap',
  src: [
    {
      path: './noto-sans-japanese_regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: './noto-sans-japanese_bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
  ],
})
