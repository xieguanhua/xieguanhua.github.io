// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'

export default {
  ...Theme,
  transformHead({ assets }) {
    // // adjust the regex accordingly to match your font
    // const myFontFile = assets.find(file => /font-name\.\w+\.woff2/)
    // if (myFontFile) {
    //   return [
    //     [
    //       'link',
    //       {
    //         rel: 'preload',
    //         href: myFontFile,
    //         as: 'font',
    //         type: 'font/woff2',
    //         crossorigin: ''
    //       }
    //     ]
    //   ]
    // }
  },
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
