import { defineConfig } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetWind from '@unocss/preset-wind'
import axios from 'axios'

export default defineConfig({
  presets: [presetWebFonts({
    provider: 'google',
    customFetch: (url: string) => axios.get(url).then(it => it.data),
    fonts: {
      mono: ["Fira Code", '"JetBrains Mono"', 'monospace'],
    }
  },),
    presetWind()
  ],
})