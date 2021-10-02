import { useState } from "react";
import DarkTheme from "./DarkTheme";

//Note we need to check the environment - localStorage is not available on the server
//typeOf localStorage is 'undefined' on server, 'object' in browser, so we can check here
const loadDarkMode = () => {
  if (typeof localStorage === 'undefined') return false
  const value = localStorage.getItem('darkMode')
  return (value === null) ? false : JSON.parse(value)
}

const ThemeSwitch = () => {

  const [darkMode, setDarkMode] = useState(loadDarkMode)

  const handleClick = () => {
    localStorage.setItem('darkMode', JSON.stringify(!darkMode))
    setDarkMode(!darkMode)
  }

  const text = darkMode ? 'Light Mode' : 'Dark Mode'

  /*'suppressHydrationWarning' overrides the browser warning that comes from the button text possibly being different on the server and in the browser*/
  return (
    <>
      <button onClick={handleClick} suppressHydrationWarning>{text}</button>
      <style jsx>{`
        button {
          background: none;
          border: none;
          color: inherit;
        }
        button:hover {
          cursor: pointer;
        }
      `}</style>
      {darkMode && <DarkTheme/>}
    </>
    
  )
}

export default ThemeSwitch