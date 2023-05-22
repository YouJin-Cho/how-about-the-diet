import { createContext, useEffect, useState } from "react"
import { ThemeContextType, ThemeProps } from "../Service/type"

// context 생성
export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {}
})

const Theme = (props:ThemeProps) => {

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const localTheme = localStorage.getItem('theme')
    return localTheme ? JSON.parse(localTheme) : true
  })

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default Theme