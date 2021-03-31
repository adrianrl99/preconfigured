import {
  ThemeProvider as Provider,
  createMuiTheme,
  responsiveFontSizes,
  useMediaQuery,
  CssBaseline,
} from '@material-ui/core'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface IThemeProviderProps {
  children: JSX.Element | JSX.Element[]
}

export interface IThemeContext {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
}

const defaultTheme: IThemeContext = {
  theme: 'light',
  setTheme: () => null,
}

export const ThemeContext = createContext(defaultTheme)

export default function MUIThemeProvider({ children }: IThemeProviderProps): JSX.Element {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true })

  const getTheme = useCallback((fallback?: string) => {
    if (typeof window === 'undefined') return undefined
    let theme: string | undefined
    try {
      theme = localStorage.getItem('theme') || undefined
    } catch (e) {
      // ...
    }
    if (typeof theme === 'undefined') theme = prefersDarkMode ? 'dark' : 'light'

    return theme || fallback
  }, [])

  const [theme, setTheme] = useState(getTheme(defaultTheme.theme))
  const muiTheme = useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme({
          palette: {
            type: theme === 'dark' ? 'dark' : 'light',
          },
          overrides: {
            MuiTableCell: {
              footer: {
                borderBottom: 'none',
              },
            },
          },
        }),
      ),
    [theme],
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Provider theme={muiTheme}>
        <CssBaseline />
        {children}
      </Provider>
    </ThemeContext.Provider>
  )
}
