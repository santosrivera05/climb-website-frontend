
const Footer = () => {

    return (
      
        <footer className="bg-[#233EA1] flex items-center justify-between px-8 py-4 staatliches text-white">

        <div className="hidden md:block flex-1 text-center">
          <p className="text-5xl">Questions? Inquiries?</p>
          <p className="text-3xl">Contact Info</p>
        </div>

        <div className="hidden md:block">
          <img
            src="../../img/dyno-logo.png"
            alt="Dyno Logo"
            className="w-60 h-60 rounded-full"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="flex-1 text-center mt-4">
          <p className="text-5xl">Socials</p>
            
            <div className="flex justify-center gap-4 mt-4">
              <a href="https://www.instagram.com/depaulclimbing/" target="_blank" rel="noopener noreferrer">
                <img
                src="../../img/insta-logo.png"
                alt="Instagram"
                className="w-16 h-16 md:w-24 md:h-24 inline-block"
                />
              </a>
              <a href="https://linktr.ee/depaulclimbing" target="_blank" rel="noopener noreferrer">
                <img 
                src="../../img/linktree-icon.png"
                alt="Linktree"
                className="w-16 h-16 md:w-24 md:h-24 inline-block"
                />
              </a>

              <a href="https://dehub.depaul.edu/climbingclub/home/" target="_blank" rel="noopener noreferrer">
                <img 
                src="../../img/dehub-icon.png"
                alt="DeHub"
                className="w-16 h-16 md:w-24 md:h-24 inline-block"
                />
              </a>
              
            </div>
        </div>

      </footer>
    
  )
}

export default Footer;