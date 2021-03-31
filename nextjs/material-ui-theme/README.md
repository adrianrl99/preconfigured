# Preconfigured theme provider

## How to use

### \_app.tsx

```jsx
import { AppInitialProps } from 'next/app'
import { ComponentType, useEffect } from 'react'
import MUIThemeProvider from 'plugins/Theme'

interface IApp {
  Component: ComponentType<AppInitialProps>
  pageProps: AppInitialProps
}

export default function PortfolioApp({ Component, pageProps }: IApp): JSX.Element {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <MUIThemeProvider>
        <Component {...pageProps} key={router.route} />
      </MUIThemeProvider>
    </>
  )
}

```

### Component.tsx

```jsx
import { Button } from "@material-ui/core";
import { ThemeContext } from "path/to/Theme";
import { useContext } from "react";

export default function Component(): JSX.Element {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log(theme); // this returns dark or light
  return (
    <>
      <Button onClick={() => setTheme("light")}>Light Mode</Button>
      <Button onClick={() => setTheme("dark")}>Dark Mode</Button>
    </>
  );
}
```
