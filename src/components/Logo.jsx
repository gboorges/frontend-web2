import { TbCalendarSmile as LogoLL } from "react-icons/tb"
import './Logo.css'

export default function Logo() {
    return (
      <div style={styles.container}>
          <LogoLL className="text-white text-3xl margintop" />
          <h1><span style={styles.if}>Lembra</span>La</h1>
      </div>
    )
  }
  
  const styles = {
      container: {
          display: "flex", 
          color: '#FDFFFC',
          gap: 14,
          fontSize: 28,
          justifyContent: 'center',
          alignItens: "center"
      },
      if: {
          color: '#FDFFFC'
      }
  }