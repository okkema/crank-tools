import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { Button, Snackbar } from "@mui/material"

type AlertAction = {
  text: string
  onClick: () => void
}

type Alert = {
  message: string
  action?: AlertAction
}

type AlertConfig = {
  push: (alert: Alert) => void
  clear: () => void
}

const AlertContext = createContext<AlertConfig | undefined>(undefined)

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (!context) throw new Error("useAlert must used be within AlertProvider")
  return context
}

export type AlertProviderProps = {
  children: JSX.Element
  config?: Partial<AlertConfig>
  timeout?: number
}

const AlertProvider = ({
  children,
  config,
  timeout = 3000,
}: AlertProviderProps) => {
  const [queue, setQueue] = useState<Alert[]>([])
  const [current, setCurrent] = useState<Alert>()

  const push = useCallback((alert: Alert) => {
    setQueue((queue) => [...queue, alert])
  }, [])

  const clear = () => {
    setCurrent(undefined)
  }

  useEffect(() => {
    const alert = queue.shift()
    if (!alert) return
    setCurrent(alert)
    setTimeout(() => {
      setCurrent(undefined)
    }, timeout)
  }, [queue, timeout])

  const action = current?.action ? (
    <Button onClick={current.action.onClick}>{current.action.text}</Button>
  ) : undefined

  return (
    <AlertContext.Provider value={{ ...config, push, clear }}>
      {children}
      <Snackbar open={!!current} message={current?.message} action={action} />
    </AlertContext.Provider>
  )
}

export default AlertProvider
