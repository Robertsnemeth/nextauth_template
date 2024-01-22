import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex gap-2 justify-center p-5 border-t border-primary">
            <FaFacebookF size="30" className="text-primary hover:text-primary-foreground cursor-pointer transition-colors delay-15"/>
            <FaInstagram size="30" className="text-primary hover:text-primary-foreground cursor-pointer transition-colors delay-15"/>
            <FaXTwitter size="30" className="text-primary hover:text-primary-foreground cursor-pointer transition-colors delay-15"/>
            <FaGithub size="30" className="text-primary hover:text-primary-foreground cursor-pointer transition-colors delay-15"/>
    </footer>
  )
}

export default Footer