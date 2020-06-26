import { useRef } from 'react'

export default type => {
   const renders = useRef(0)
   // eslint-disable-next-line
   console.log(`${type} renders: `, renders.current++)
}
