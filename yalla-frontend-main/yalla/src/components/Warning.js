import { useState, useEffect } from 'react'
    
const Warning = ({setUnsucc}) => {
  const [show, setShow] = useState(true)

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
      setUnsucc(0)
    }, 6000)

    return () => {
      clearTimeout(timeId)
    }
  });

  // If show is false the component will return null and stop here
  if (!show) {
    return null;
  }

  // If show is true this will be returned
  return (
    <div className={`alert alert-danger`}>
        Too many unsuccessful attempts (Try again in 30 seconds)
    </div>
  )
}

export default Warning;