import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'

const Footer = ({target="blank"}) => {
  return (
    <div className='flex justify-center'>
      <Link href={"https://github.com/stormyy00"} target={target}><Github className='text-3xl'/></Link>
      <Link href={"https://www.linkedin.com/in/jonathan--trujillo/"} target={target}><Linkedin className='"text-3xl' /></Link>
    </div>
  )
}

export default Footer
