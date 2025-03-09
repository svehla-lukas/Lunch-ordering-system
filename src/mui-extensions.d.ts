import '@mui/material/Paper'
import '@mui/material/Link'

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    codeBox: true
  }
}

// not function :(
// declare module '@mui/material/Link' {
//   interface LinkPropsVariantOverrides {
//     drawer: true
//   }
// }

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body1Bold: true
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body1Bold: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    body1Bold?: React.CSSProperties
  }
}
