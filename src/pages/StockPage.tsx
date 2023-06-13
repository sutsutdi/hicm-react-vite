import { Button } from "@mui/material"

const handleFullScreen = () => {
  const element = document.documentElement

  element.requestFullscreen()
}

const StockPage = () => {
  return (
    <>
      <h1>LoginPage</h1>
      <Button onClick={handleFullScreen} size="small" color="primary">
        Login
      </Button>
    </>
  )
}
export default StockPage